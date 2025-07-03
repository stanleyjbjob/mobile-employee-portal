using Microsoft.EntityFrameworkCore;
using EmployeePortal.Infrastructure.Data;
using EmployeePortal.Domain.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Entity Framework
builder.Services.AddDbContext<EmployeePortalDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngularApp");

// Sample API endpoints
app.MapGet("/api/health", () => new { Status = "Healthy", Timestamp = DateTime.UtcNow })
    .WithName("Health")
    .WithOpenApi();

app.MapGet("/api/users", async (EmployeePortalDbContext context) =>
{
    return await context.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role).ToListAsync();
})
.WithName("GetUsers")
.WithOpenApi();

app.MapPost("/api/users", async (User user, EmployeePortalDbContext context) =>
{
    user.CreatedAt = DateTime.UtcNow;
    user.UpdatedAt = DateTime.UtcNow;
    context.Users.Add(user);
    await context.SaveChangesAsync();
    return Results.Created($"/api/users/{user.Id}", user);
})
.WithName("CreateUser")
.WithOpenApi();

app.Run();
