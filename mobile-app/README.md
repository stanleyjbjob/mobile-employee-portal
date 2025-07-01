# Employee Portal Mobile App

員工行動入口網站，提供響應式的移動優先體驗。

## 技術棧

- **框架**: React 18 + TypeScript
- **UI庫**: Material-UI / Ant Design
- **狀態管理**: Context API / Redux Toolkit
- **PWA**: Workbox
- **樣式**: CSS Modules / Styled Components

## 功能特色

### 📱 PWA 支援
- 離線功能
- 安裝到桌面
- 推送通知
- 快取策略

### 🔐 安全認證
- JWT Token 認證
- 生物識別登入
- 自動登出

### 💼 個人服務
- 薪資單查詢
- 個人資料維護
- 出勤記錄

### 📢 資訊中心
- 公司公告
- 活動資訊
- 問卷調查

### 🎯 互動功能
- 活動報名
- 意見回饋
- 即時通知

## 開發指南

### 環境需求
- Node.js 18+
- npm 或 yarn

### 本地開發

1. **安裝依賴**
```bash
npm install
```

2. **啟動開發服務器**
```bash
npm start
```

3. **開啟瀏覽器**
```
http://localhost:3000
```

### 建構與部署

```bash
# 建構生產版本
npm run build

# 執行測試
npm test

# Docker 建構
docker build -t employee-portal-mobile .
```

## PWA 功能

### Service Worker
- 自動產生並註冊
- 快取策略配置
- 離線功能支援

### 推送通知
- 支援 Web Push API
- 通知權限管理
- 訊息推送

### 安裝提示
- 自動檢測安裝條件
- 自訂安裝提示
- 跨平台支援

## 專案結構

```
mobile-app/
├── public/
│   ├── manifest.json     # PWA 設定
│   └── icons/            # 應用圖示
├── src/
│   ├── components/       # React 組件
│   ├── pages/            # 頁面組件
│   ├── hooks/            # 自訂 Hooks
│   ├── services/         # API 服務
│   ├── utils/            # 工具函數
│   └── types/            # TypeScript 型別
└── package.json
```

## 響應式設計

- Mobile First 設計原則
- 彈性網格系統
- 觸控友善介面
- 適配不同螢幕尺寸

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
