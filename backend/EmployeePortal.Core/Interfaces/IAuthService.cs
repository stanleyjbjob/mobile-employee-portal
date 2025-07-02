using EmployeePortal.Core.Models;

namespace EmployeePortal.Core.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponse?> AuthenticateAsync(string email, string password);
        Task<AuthResponse?> RegisterAsync(string email, string password, string firstName, string lastName);
        Task<AuthResponse?> RefreshTokenAsync(string refreshToken);
        Task<bool> RevokeTokenAsync(string token);
    }
}