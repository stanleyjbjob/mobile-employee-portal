using System.ComponentModel.DataAnnotations;

namespace EmployeePortal.Core.Entities
{
    public class RefreshToken
    {
        public int Id { get; set; }

        [Required]
        public string Token { get; set; } = string.Empty;

        public DateTime Expires { get; set; }

        public bool IsExpired => DateTime.UtcNow >= Expires;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string? CreatedByIp { get; set; }

        public DateTime? RevokedAt { get; set; }

        public string? RevokedByIp { get; set; }

        public string? ReplacedByToken { get; set; }

        public bool IsActive => RevokedAt == null && !IsExpired;

        // Foreign key
        public int UserId { get; set; }
        public virtual User User { get; set; } = null!;
    }
}