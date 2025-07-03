# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution file
COPY EmployeePortal.sln .

# Copy project files
COPY src/EmployeePortal.Api/EmployeePortal.Api/*.csproj src/EmployeePortal.Api/EmployeePortal.Api/
COPY src/EmployeePortal.Domain/EmployeePortal.Domain/*.csproj src/EmployeePortal.Domain/EmployeePortal.Domain/
COPY src/EmployeePortal.Infrastructure/EmployeePortal.Infrastructure/*.csproj src/EmployeePortal.Infrastructure/EmployeePortal.Infrastructure/

# Restore packages
RUN dotnet restore

# Copy source code
COPY . .

# Build the application
RUN dotnet build -c Release --no-restore

# Publish the application
RUN dotnet publish src/EmployeePortal.Api/EmployeePortal.Api/EmployeePortal.Api.csproj -c Release -o /app/publish --no-restore

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Create non-root user
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /app
USER appuser

# Copy published files
COPY --from=build /app/publish .

# Expose port
EXPOSE 8080

# Set environment variables
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/api/health || exit 1

# Start the application
ENTRYPOINT ["dotnet", "EmployeePortal.Api.dll"]