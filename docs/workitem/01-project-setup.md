# 工作項目 01 - 專案初始化與環境建置

## 📋 基本資訊
- **工作項目編號**: WI-001
- **優先級**: 高
- **預估工作量**: 3-5 天
- **負責人員**: 專案經理 + 後端工程師
- **前置條件**: 無
- **階段**: 第一階段 (Week 1-2)

## 🎯 工作目標
建立完整的開發環境和專案基礎架構，確保所有開發人員能夠順利開始工作。

## 📝 詳細工作內容

### 後端專案初始化
- [ ] 建立 ASP.NET Core 8.0 Web API 專案
- [ ] 配置 Entity Framework Core
- [ ] 設定 JWT Bearer Token 驗證
- [ ] 配置 Swagger/OpenAPI 文件
- [ ] 建立基本的專案結構 (Controllers, Services, Repositories, Models)
- [ ] 設定 Dependency Injection 容器
- [ ] 配置 CORS 政策
- [ ] 建立 appsettings 配置檔

### 前端專案初始化
- [ ] 建立 Angular 最新版專案 (admin-portal)
- [ ] 安裝並配置 Angular Material 或 NG-ZORRO
- [ ] 設定 Angular Router 基本路由
- [ ] 配置 HTTP Client 和攔截器
- [ ] 建立基本的專案結構 (components, services, models, guards)
- [ ] 配置環境變數 (development/production)

### 開發環境建置
- [ ] 建立 Docker 容器配置
- [ ] 設定 docker-compose.yml 開發環境
- [ ] 配置資料庫連線 (開發用)
- [ ] 建立 Git 版本控制規範
- [ ] 設定 ESLint/Prettier 程式碼格式化
- [ ] 建立基本的專案說明文件

### 部署環境準備
- [ ] 建立 Dockerfile (後端)
- [ ] 建立 Dockerfile (前端)
- [ ] 配置 nginx 反向代理
- [ ] 準備雲端部署配置

## ✅ 完成標準
- [ ] 後端 API 專案可以成功執行並顯示 Swagger 文件
- [ ] 前端 Angular 專案可以成功執行並顯示預設頁面
- [ ] Docker 容器可以正常建置和執行
- [ ] 開發環境可以透過 docker-compose 一鍵啟動
- [ ] 所有必要的套件和相依性已安裝完成
- [ ] 基本的專案架構已建立完成

## 🔗 相關資源
- ASP.NET Core 8.0 官方文件
- Angular 官方文件
- Docker 官方文件
- Entity Framework Core 文件

## 📋 後續工作項目
- WI-002: 資料庫設計與建立
- WI-003: 使用者認證系統開發

## 📝 備註
- 確保所有配置都支援開發和生產環境
- 建立詳細的環境建置說明文件
- 確保團隊成員都能成功建置開發環境
