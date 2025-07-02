using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using BCrypt.Net;
using EmployeePortal.Core.Models;
using EmployeePortal.Core.Entities;
using EmployeePortal.Core.Interfaces;

namespace EmployeePortal.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<AuthResponse?> AuthenticateAsync(string email, string password)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return null;
            }

            var jwtToken = GenerateJwtToken(user);
            var refreshToken = GenerateRefreshToken();

            // Save refresh token
            user.RefreshTokens.Add(new RefreshToken
            {
                Token = refreshToken,
                Expires = DateTime.UtcNow.AddDays(7),
                CreatedAt = DateTime.UtcNow
            });

            user.LastLoginAt = DateTime.UtcNow;
            await _userRepository.UpdateAsync(user);

            return new AuthResponse
            {
                Token = jwtToken,
                RefreshToken = refreshToken,
                Expires = DateTime.UtcNow.AddMinutes(GetJwtExpireMinutes()),
                User = new UserInfo
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName
                }
            };
        }

        public async Task<AuthResponse?> RegisterAsync(string email, string password, string firstName, string lastName)
        {
            if (await _userRepository.EmailExistsAsync(email))
            {
                return null; // Email already exists
            }

            var user = new User
            {
                Email = email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
                FirstName = firstName,
                LastName = lastName,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _userRepository.AddAsync(user);

            return await AuthenticateAsync(email, password);
        }

        public async Task<AuthResponse?> RefreshTokenAsync(string refreshToken)
        {
            var user = await GetUserByRefreshTokenAsync(refreshToken);
            
            if (user == null)
            {
                return null;
            }

            var oldRefreshToken = user.RefreshTokens.Single(x => x.Token == refreshToken);
            
            if (!oldRefreshToken.IsActive)
            {
                return null;
            }

            // Generate new tokens
            var jwtToken = GenerateJwtToken(user);
            var newRefreshToken = GenerateRefreshToken();

            // Revoke old refresh token and save new one
            oldRefreshToken.RevokedAt = DateTime.UtcNow;
            oldRefreshToken.ReplacedByToken = newRefreshToken;

            user.RefreshTokens.Add(new RefreshToken
            {
                Token = newRefreshToken,
                Expires = DateTime.UtcNow.AddDays(7),
                CreatedAt = DateTime.UtcNow
            });

            await _userRepository.UpdateAsync(user);

            return new AuthResponse
            {
                Token = jwtToken,
                RefreshToken = newRefreshToken,
                Expires = DateTime.UtcNow.AddMinutes(GetJwtExpireMinutes()),
                User = new UserInfo
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName
                }
            };
        }

        public async Task<bool> RevokeTokenAsync(string token)
        {
            var user = await GetUserByRefreshTokenAsync(token);
            
            if (user == null)
            {
                return false;
            }

            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);
            
            if (!refreshToken.IsActive)
            {
                return false;
            }

            refreshToken.RevokedAt = DateTime.UtcNow;
            await _userRepository.UpdateAsync(user);

            return true;
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]!);
            
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("id", user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}")
                }),
                Expires = DateTime.UtcNow.AddMinutes(GetJwtExpireMinutes()),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string GenerateRefreshToken()
        {
            using var rng = RandomNumberGenerator.Create();
            var randomBytes = new byte[64];
            rng.GetBytes(randomBytes);
            return Convert.ToBase64String(randomBytes);
        }

        private async Task<User?> GetUserByRefreshTokenAsync(string token)
        {
            return await _userRepository.GetByRefreshTokenAsync(token);
        }

        private int GetJwtExpireMinutes()
        {
            return int.Parse(_configuration["Jwt:ExpireMinutes"] ?? "60");
        }
    }
}