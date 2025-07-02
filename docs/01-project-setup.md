# 專案建置指南 (Project Setup Guide)

本文件提供完整的員工行動入口網站專案建置步驟，包含後端 API 與前端行動應用程式的環境設置。

## 前置需求 (Prerequisites)

### 系統需求
- **作業系統**: Windows 10/11, macOS 10.15+, 或 Linux (Ubuntu 18.04+)
- **記憶體**: 至少 8GB RAM
- **儲存空間**: 至少 5GB 可用空間

### 必要軟體
1. **.NET 8.0 SDK**
   - 下載: https://dotnet.microsoft.com/download/dotnet/8.0
   - 驗證安裝: `dotnet --version`

2. **Node.js 18+ 和 npm**
   - 下載: https://nodejs.org/ (建議使用 LTS 版本)
   - 驗證安裝: `node --version` 和 `npm --version`

3. **SQL Server 或 SQL Server LocalDB**
   - Windows: SQL Server Express LocalDB (通常隨 Visual Studio 安裝)
   - macOS/Linux: 使用 Docker 運行 SQL Server

4. **開發工具 (擇一)**
   - Visual Studio 2022 (Windows)
   - Visual Studio Code (跨平台)
   - JetBrains Rider (跨平台)

5. **行動開發工具**
   - Expo CLI: `npm install -g @expo/cli`
   - 可選: Android Studio (Android 開發)
   - 可選: Xcode (iOS 開發，僅 macOS)

## 專案架構概述

```
mobile-employee-portal/
├── backend/                     # .NET 8.0 Web API
│   ├── EmployeePortal.API/      # API 層
│   ├── EmployeePortal.Core/     # 核心業務邏輯
│   ├── EmployeePortal.Infrastructure/ # 資料存取層
│   └── EmployeePortal.sln       # 解決方案檔
├── frontend/                    # 前端應用
│   └── mobile-app/              # React Native + Expo
├── docs/                        # 專案文件
├── .env.example                 # 環境變數範例
└── docker-compose.yml           # Docker 配置
```

## 第一步：專案下載與設定

### 1.1 克隆專案
```bash
git clone https://github.com/stanleyjbjob/mobile-employee-portal.git
cd mobile-employee-portal
```

### 1.2 環境變數設定
```bash
# 複製環境變數範例檔案
cp .env.example .env

# 編輯 .env 檔案，設定適合的環境變數
# 包含資料庫連線字串、JWT 密鑰等
```

## 第二步：後端 API 建置

### 2.1 還原套件
```bash
cd backend
dotnet restore
```

### 2.2 資料庫設定

#### 使用 LocalDB (Windows)
```bash
# 更新資料庫連線字串 (在 appsettings.json 或 .env 中)
# 預設: Server=(localdb)\\mssqllocaldb;Database=EmployeePortalDb;Trusted_Connection=true;

# 執行資料庫遷移
dotnet ef database update -p EmployeePortal.Infrastructure -s EmployeePortal.API
```

#### 使用 Docker SQL Server (macOS/Linux)
```bash
# 啟動 SQL Server 容器
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong@Password123" \
   -p 1433:1433 --name sql-server \
   -d mcr.microsoft.com/mssql/server:2022-latest

# 更新連線字串
# Server=localhost,1433;Database=EmployeePortalDb;User Id=sa;Password=YourStrong@Password123;TrustServerCertificate=true;

# 執行資料庫遷移
dotnet ef database update -p EmployeePortal.Infrastructure -s EmployeePortal.API
```

### 2.3 建置與執行
```bash
# 建置專案
dotnet build

# 執行 API (開發模式)
dotnet run --project EmployeePortal.API

# API 將在 http://localhost:5000 運行
# Swagger 文件: http://localhost:5000/swagger
```

## 第三步：前端行動應用建置

### 3.1 安裝相依套件
```bash
cd frontend/mobile-app
npm install
```

### 3.2 安裝測試相依套件
```bash
# 安裝缺少的測試套件
npm install --save-dev @types/jest @testing-library/react-native @testing-library/jest-native
```

### 3.3 設定 API 連線
編輯 `src/services/ApiService.ts`，確認 API 基礎 URL：
```typescript
const API_BASE_URL = 'http://localhost:5000/api';
```

### 3.4 執行應用程式
```bash
# 啟動 Expo 開發伺服器
npm start

# 或針對特定平台
npm run android    # Android
npm run ios        # iOS
npm run web        # Web 瀏覽器
```

## 第四步：驗證安裝

### 4.1 後端驗證
- 訪問 http://localhost:5000/swagger 確認 API 文件載入
- 測試健康檢查端點
- 確認資料庫連線正常

### 4.2 前端驗證
```bash
# 執行型別檢查
npm run type-check

# 執行程式碼檢查
npm run lint

# 執行測試
npm test
```

### 4.3 整合測試
- 前端應用能夠連接後端 API
- 使用者註冊/登入功能正常
- 基本功能運作正常

## 常見問題解決

### Q1: 資料庫連線失敗
**解決方案**:
- 確認 SQL Server 服務正在運行
- 檢查連線字串設定
- 確認防火牆設定允許資料庫連線

### Q2: Expo 無法啟動
**解決方案**:
```bash
# 清除 npm 快取
npm cache clean --force

# 重新安裝套件
rm -rf node_modules package-lock.json
npm install

# 清除 Expo 快取
npx expo start --clear
```

### Q3: TypeScript 編譯錯誤
**解決方案**:
- 確認所有 @types/ 套件已安裝
- 檢查 tsconfig.json 設定
- 執行 `npm run type-check` 檢查具體錯誤

### Q4: JWT 驗證失敗
**解決方案**:
- 確認 JWT_SECRET 環境變數已設定
- 檢查 JWT 設定是否一致
- 確認時間同步（JWT 有過期時間）

## 開發工具建議

### Visual Studio Code 擴充套件
- C# for Visual Studio Code
- C# Dev Kit
- REST Client
- React Native Tools
- ES7+ React/Redux/React-Native snippets
- TypeScript Importer

### 除錯設定
- 後端：使用 Visual Studio 或 VS Code 的 .NET 除錯器
- 前端：使用 React Native Debugger 或瀏覽器開發者工具

## 部署準備

### 開發環境
- 使用 LocalDB 或 Docker SQL Server
- 本地執行前後端應用程式

### 測試環境
- 設定雲端資料庫（Azure SQL Database 或 AWS RDS）
- 部署到測試伺服器
- 設定 CI/CD 流程

### 生產環境
- 設定 HTTPS 憑證
- 資料庫備份策略
- 監控和日誌記錄
- 效能最佳化

## 下一步

完成基本設定後，建議：
1. 閱讀 `DEVELOPMENT.md` 了解開發流程
2. 查看 `docs/spec.md` 了解專案需求
3. 開始開發核心功能
4. 設定自動化測試
5. 準備部署流程

---

**注意**: 本指南基於專案當前狀態編寫，如遇到版本更新或環境差異，請參考官方文件或聯繫開發團隊。