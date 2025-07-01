# Mobile Employee Portal

Comprehensive mobile employee management solution built with .NET Core backend and React Native frontend.

## Quick Start

### Prerequisites
- .NET 8.0 SDK
- Node.js 18+ and npm
- SQL Server or SQL Server LocalDB
- Expo CLI: `npm install -g @expo/cli`

### Backend Setup
```bash
cd backend
dotnet restore
dotnet ef database update -p EmployeePortal.Infrastructure -s EmployeePortal.API
dotnet run --project EmployeePortal.API
```

### Frontend Setup
```bash
cd frontend/mobile-app
npm install
npm start
```

### Environment Configuration
1. Copy `.env.example` to `.env`
2. Update configuration values for your environment
3. Configure database connection strings
4. Set JWT secrets for authentication

## Architecture

The project follows Clean Architecture principles:

- **API Layer**: RESTful endpoints with authentication
- **Core Layer**: Business entities and interfaces
- **Infrastructure Layer**: Data access and external services
- **Mobile App**: Cross-platform React Native application

## Features

- JWT Authentication with refresh tokens
- Employee CRUD operations
- Material Design UI
- Offline-capable mobile app
- Swagger API documentation
- Cross-platform mobile support

## Development

### Database Migrations
```bash
cd backend
dotnet ef migrations add InitialCreate -p EmployeePortal.Infrastructure -s EmployeePortal.API
dotnet ef database update -p EmployeePortal.Infrastructure -s EmployeePortal.API
```

### Testing
```bash
# Backend tests
cd backend && dotnet test

# Frontend tests
cd frontend/mobile-app && npm test
```

### Linting
```bash
# Frontend linting
cd frontend/mobile-app && npm run lint
```

## Deployment

### Backend
Deploy to Azure App Service, AWS, or any cloud provider supporting .NET 8.0

### Mobile App
Build and distribute through:
- Expo Application Services (EAS)
- App Store (iOS)
- Google Play Store (Android)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details