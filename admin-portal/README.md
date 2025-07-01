# Employee Portal Admin

管理者後台系統，用於管理員工入口網站的所有內容和用戶。

## 技術棧

- **框架**: Angular 17
- **語言**: TypeScript
- **UI庫**: Angular Material
- **狀態管理**: NgRx (可選)
- **樣式**: SCSS

## 功能模組

### 🏠 儀表板
- 系統概覽
- 統計數據
- 快速操作

### 👥 用戶管理
- 員工帳號管理
- 權限設定
- 角色分配

### 📢 內容管理
- 公告發布
- 活動管理
- 問卷建立

### 📊 數據分析
- 使用統計
- 報表生成
- 趨勢分析

### ⚙️ 系統設定
- 系統參數
- 通知設定
- 安全設定

## 開發指南

### 環境需求
- Node.js 18+
- Angular CLI 17+

### 本地開發

1. **安裝依賴**
```bash
npm install
```

2. **啟動開發服務器**
```bash
ng serve
```

3. **開啟瀏覽器**
```
http://localhost:4200
```

### 建構與部署

```bash
# 開發建構
ng build

# 生產建構
ng build --configuration production

# Docker 建構
docker build -t employee-portal-admin .
```

## 專案結構

```
admin-portal/
├── src/
│   ├── app/
│   │   ├── components/    # 共用組件
│   │   ├── pages/         # 頁面組件
│   │   ├── services/      # 服務
│   │   └── models/        # 資料模型
│   ├── assets/            # 靜態資源
│   └── environments/      # 環境設定
└── angular.json           # Angular 設定
```

## 開發規範

- 遵循 Angular Style Guide
- 使用 TypeScript strict mode
- 實作 OnPush 變更檢測策略
- 使用 Reactive Forms
