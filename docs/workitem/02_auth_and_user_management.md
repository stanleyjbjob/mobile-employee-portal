# 02_身份驗證與使用者管理模組

## 目標
實作安全的身份驗證（JWT）、權限管理與使用者基本資料維護，確保系統安全性與可擴展性。

## 作業內容
- 後端：
  - 實作 JWT Bearer Token 身份驗證（Minimal API）
  - 設計 User/Role/Permission 實體與資料表
  - 實作註冊、登入、權限驗證 API
  - 實作統一例外處理（ProblemDetails Middleware）
  - 撰寫單元測試（xUnit/Moq）
- 前端/行動端：
  - 實作登入/註冊/登出 UI 與表單驗證
  - JWT Token 儲存與自動附加於 API 請求
  - 權限導向的頁面存取控制
  - 錯誤提示與 loading 狀態處理

## 產出物
- 完整的身份驗證 API 與前後端整合
- 單元測試報告
- 使用者管理 UI

## 注意事項
- 密碼需加密儲存
- API 需有 Swagger 文件
- 前後端驗證規則需一致
