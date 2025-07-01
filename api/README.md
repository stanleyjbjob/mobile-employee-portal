# Employee Portal API

ASP.NET Core Web API 後端服務，提供員工入口網站的所有API接口。

## 技術棧

- **框架**: ASP.NET Core 8.0
- **資料庫**: Entity Framework Core + PostgreSQL
- **認證**: JWT Bearer Token
- **快取**: Redis
- **容器化**: Docker

## 功能模組

### 🔐 身份認證
- JWT Token 認證
- 角色權限管理
- 密碼安全策略

### 👤 用戶管理
- 員工資料管理
- 個人資訊查詢
- 權限設定

### 📢 公告系統
- 公告發布與管理
- 分類與標籤
- 閱讀狀態追蹤

### 🎯 活動管理
- 活動發布
- 報名管理
- 狀態追蹤

### 📊 問卷系統
- 問卷建立與發布
- 回應收集
- 統計分析

## 開發指南

### 環境需求
- .NET 8.0 SDK
- PostgreSQL 15+
- Redis 7+

### 本地開發

1. **安裝依賴**
```bash
dotnet restore
```

2. **設定資料庫連線**
```bash
# 編輯 appsettings.Development.json
```

3. **執行資料庫遷移**
```bash
dotnet ef database update
```

4. **啟動開發服務器**
```bash
dotnet run
```

API 服務將在 `https://localhost:5001` 啟動

### API 文件

啟動服務後可訪問 Swagger 文檔：
- 開發環境: `https://localhost:5001/swagger`

### 建構與部署

```bash
# 建構
dotnet build -c Release

# 發布
dotnet publish -c Release -o ./publish

# Docker 建構
docker build -t employee-portal-api .
```

## 專案結構

```
api/
├── Controllers/        # API 控制器
├── Models/            # 資料模型
├── Services/          # 業務邏輯服務
├── Data/              # 資料存取層
├── Middleware/        # 中介軟體
└── Configuration/     # 設定檔案
```