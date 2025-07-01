# 員工行動入口網站 (Employee Mobile Portal)

一個現代化的員工行動入口網站，提供跨平台的員工服務。

## 專案架構

此專案採用微服務架構，包含三個主要組件：

### 📱 Mobile App (`/mobile-app`)
- **技術棧**: React + TypeScript + PWA
- **用途**: 員工移動端應用程式
- **功能**: 個人資訊查詢、公告瀏覽、活動報名、問卷調查

### 🖥️ Admin Portal (`/admin-portal`)
- **技術棧**: Angular + TypeScript
- **用途**: 管理者後台系統
- **功能**: 用戶管理、內容管理、數據分析、系統設定

### 🔌 API (`/api`)
- **技術棧**: ASP.NET Core Web API
- **用途**: 後端服務API
- **功能**: 身份驗證、數據處理、業務邏輯、第三方系統整合

## 快速開始

### 環境需求
- Node.js 18+
- .NET 8.0+
- Docker & Docker Compose

### 本地開發

1. **複製專案**
```bash
git clone <repository-url>
cd mobile-employee-portal
```

2. **啟動API服務**
```bash
cd api
dotnet restore
dotnet run
```

3. **啟動管理後台**
```bash
cd admin-portal
npm install
npm start
```

4. **啟動移動應用**
```bash
cd mobile-app
npm install
npm start
```

### Docker 部署

```bash
docker-compose up -d
```

## 專案文件

- [需求規格文件](docs/spec.md)
- [API文件](api/README.md)
- [前端開發指南](mobile-app/README.md)
- [後台開發指南](admin-portal/README.md)

## 開發團隊

參考 [docs/spec.md](docs/spec.md) 了解詳細的專案規劃和需求分析。

## 授權

MIT License