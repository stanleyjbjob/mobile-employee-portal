# Mobile Employee Portal

A comprehensive mobile employee portal solution with a C# .NET Core Web API backend and React Native frontend.

## Architecture

### Backend (C# .NET Core Web API)
- **API Layer**: RESTful Web API with JWT authentication
- **Core Layer**: Domain entities and business logic interfaces
- **Infrastructure Layer**: Data access, services, and external integrations
- **Database**: SQL Server with Entity Framework Core

### Frontend (React Native with Expo)
- **Mobile App**: Cross-platform mobile application
- **Navigation**: React Navigation for screen navigation
- **State Management**: Context API for authentication and state
- **UI Components**: React Native Paper for Material Design

## Features

### Backend Features
- JWT-based authentication and authorization
- Employee management CRUD operations
- User management with role-based access
- RESTful API with Swagger documentation
- Entity Framework Core with SQL Server
- Logging and error handling
- CORS configuration for mobile apps

### Frontend Features
- User authentication (login/register)
- Dashboard with quick actions and statistics
- Employee listing with search functionality
- Profile management
- Material Design UI components
- Offline-ready architecture
- Cross-platform compatibility (iOS/Android)

## Getting Started

### Prerequisites
- .NET 8.0 SDK
- SQL Server or SQL Server LocalDB
- Node.js (v16 or later)
- Expo CLI
- Visual Studio or Visual Studio Code

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Restore NuGet packages:
   ```bash
   dotnet restore
   ```

3. Update the connection string in `appsettings.json`

4. Apply database migrations:
   ```bash
   dotnet ef database update -p EmployeePortal.Infrastructure -s EmployeePortal.API
   ```

5. Run the API:
   ```bash
   dotnet run --project EmployeePortal.API
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/mobile-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update the API base URL in `src/services/ApiService.ts`

4. Start the Expo development server:
   ```bash
   npm start
   ```

## Project Structure

```
├── backend/
│   ├── EmployeePortal.API/          # Web API layer
│   ├── EmployeePortal.Core/         # Domain entities and interfaces
│   ├── EmployeePortal.Infrastructure/  # Data access and services
│   └── EmployeePortal.sln           # Solution file
├── frontend/
│   └── mobile-app/                  # React Native mobile app
│       ├── src/
│       │   ├── components/          # Reusable UI components
│       │   ├── screens/             # Screen components
│       │   ├── navigation/          # Navigation configuration
│       │   ├── services/            # API and auth services
│       │   ├── types/               # TypeScript type definitions
│       │   └── utils/               # Utility functions and theme
│       ├── App.tsx                  # Main app component
│       ├── package.json             # Dependencies and scripts
│       └── app.json                 # Expo configuration
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh JWT token

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

## Technologies Used

### Backend
- .NET 8.0
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- JWT Authentication
- Swagger/OpenAPI
- Serilog

### Frontend
- React Native
- Expo
- TypeScript
- React Navigation
- React Native Paper
- React Hook Form
- Axios
- AsyncStorage

## Development

### Code Style
- Follow C# coding conventions for backend
- Use ESLint and Prettier for frontend code formatting
- Implement proper error handling and logging
- Write unit tests for business logic

### Security Considerations
- JWT tokens with refresh token mechanism
- Password hashing with BCrypt
- CORS configuration
- Input validation and sanitization
- SQL injection prevention with EF Core

## Deployment

### Backend Deployment
- Configure production connection strings
- Set up environment variables
- Deploy to Azure App Service or IIS
- Configure SSL certificates

### Frontend Deployment
- Build production bundle with Expo
- Deploy to App Store and Google Play Store
- Configure production API URLs
- Set up app signing and certificates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.