# 員工行動入口網站 (Employee Mobile Portal)

一個完整的員工行動入口網站專案，包含後端 API、前端管理介面以及行動端應用程式。

## 🏗️ 專案架構

```
employee-portal/
├── backend/                    # ASP.NET Core 8.0 後端 API
│   ├── src/
│   │   ├── EmployeePortal.Api/         # API 層 (Minimal APIs)
│   │   ├── EmployeePortal.Domain/      # 領域層 (DDD)
│   │   └── EmployeePortal.Infrastructure/  # 基礎設施層
│   ├── test/                   # 測試專案
│   └── Dockerfile
├── angular/                    # Angular 前端管理介面
│   ├── employee-portal-admin/  # Angular 專案
│   ├── Dockerfile
│   └── nginx.conf
├── mobile/                     # Flutter 行動端應用
│   ├── lib/
│   ├── android/
│   ├── ios/
│   └── pubspec.yaml
├── docs/                       # 專案文件
├── docker-compose.yml          # Docker 容器編排
└── README.md
```

## 🛠️ 技術堆疊

### 後端 (Backend)
- **框架**: ASP.NET Core 8.0 Minimal API
- **架構**: Domain-Driven Design (DDD)
- **資料庫**: Entity Framework Core + SQL Server
- **驗證**: JWT Bearer Token
- **文件**: Swagger/OpenAPI

### 前端 (Frontend)
- **框架**: Angular 18
- **UI 庫**: Angular Material (計劃中)
- **狀態管理**: RxJS
- **建置工具**: Angular CLI
- **部署**: Nginx

### 行動端 (Mobile)
- **框架**: Flutter
- **狀態管理**: Provider (計劃中)
- **HTTP 客戶端**: http package
- **本地儲存**: shared_preferences

### 基礎設施 (Infrastructure)
- **容器化**: Docker & Docker Compose
- **資料庫**: SQL Server 2022
- **反向代理**: Nginx
- **CI/CD**: GitHub Actions (計劃中)

## 🚀 快速開始

### 前置需求

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 20+](https://nodejs.org/)
- [Flutter SDK](https://flutter.dev/docs/get-started/install)
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)

### 使用 Docker 啟動 (建議)

1. **複製專案**
   ```bash
   git clone <repository-url>
   cd mobile-employee-portal
   ```

2. **啟動所有服務**
   ```bash
   docker-compose up -d
   ```

3. **存取應用程式**
   - 前端管理介面: http://localhost:4200
   - 後端 API: http://localhost:5000
   - API 文件 (Swagger): http://localhost:5000/swagger

### 本地開發環境

#### 1. 後端開發

```bash
cd backend

# 還原相依性
dotnet restore

# 執行資料庫遷移 (需先啟動 SQL Server)
dotnet ef database update --project src/EmployeePortal.Infrastructure/EmployeePortal.Infrastructure --startup-project src/EmployeePortal.Api/EmployeePortal.Api

# 啟動開發伺服器
dotnet run --project src/EmployeePortal.Api/EmployeePortal.Api
```

#### 2. 前端開發

```bash
cd angular/employee-portal-admin

# 安裝相依性
npm install

# 啟動開發伺服器
npm start

# 或使用 Angular CLI
ng serve
```

#### 3. 行動端開發

```bash
cd mobile

# 取得相依性
flutter pub get

# 執行在模擬器或實體裝置
flutter run
```

## 📊 資料庫結構

### 核心實體

- **Users**: 使用者基本資料
- **Roles**: 角色定義
- **UserRoles**: 使用者角色關聯

### 連線字串設定

更新 `backend/src/EmployeePortal.Api/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=EmployeePortal;Trusted_Connection=true;TrustServerCertificate=true"
  }
}
```

## 🔧 開發工具

### 建置專案

```bash
# 後端建置
cd backend
dotnet build

# 前端建置
cd angular/employee-portal-admin
npm run build

# 行動端建置
cd mobile
flutter build apk  # Android
flutter build ios  # iOS (需 macOS)
```

### 執行測試

```bash
# 後端測試
cd backend
dotnet test

# 前端測試
cd angular/employee-portal-admin
npm run test

# 行動端測試
cd mobile
flutter test
```

## 📱 功能特色

### 目前實作功能

- ✅ 基礎專案架構建置
- ✅ ASP.NET Core Minimal API 設定
- ✅ Angular 前端專案建置
- ✅ Flutter 行動端專案建置
- ✅ Docker 容器化設定
- ✅ Entity Framework Core 設定
- ✅ 基礎使用者實體定義

### 計劃中功能

- 🔄 JWT 身份驗證系統
- 🔄 使用者管理介面
- 🔄 個人資訊查詢功能
- 🔄 公告系統
- 🔄 活動報名系統
- 🔄 問卷調查系統
- 🔄 行動端完整 UI
- 🔄 後台管理功能

## 🔐 安全性考量

- HTTPS 加密傳輸
- JWT Token 身份驗證
- SQL 注入防護 (Entity Framework)
- XSS 防護
- CORS 設定
- Docker 安全性最佳實務

## 📋 API 端點

### 健康檢查
- `GET /api/health` - 系統健康狀態

### 使用者管理
- `GET /api/users` - 取得所有使用者
- `POST /api/users` - 建立新使用者

更多 API 文件請參考: http://localhost:5000/swagger

## 🤝 貢獻指南

1. Fork 專案
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權條款

本專案採用 MIT 授權條款。詳細資訊請參考 [LICENSE](LICENSE) 檔案。

## 📞 聯絡資訊

如有任何問題或建議，請聯繫專案維護者。

---

*本專案遵循 [工作項目 01_專案初始化與技術架構設計](docs/workitem/01_project_init.md) 的規格需求建置。*