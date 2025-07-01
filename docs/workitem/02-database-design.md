# 工作項目 02 - 資料庫設計與建立

## 📋 基本資訊
- **工作項目編號**: WI-002
- **優先級**: 高
- **預估工作量**: 3-4 天
- **負責人員**: 後端工程師 + 資料庫管理員
- **前置條件**: WI-001 (專案初始化完成)
- **階段**: 第一階段 (Week 1-2)

## 🎯 工作目標
設計和建立完整的資料庫架構，支援員工行動入口網站的所有核心功能。

## 📝 詳細工作內容

### 資料庫設計
- [ ] 分析業務需求並設計 ER 圖
- [ ] 設計使用者和角色權限表結構
- [ ] 設計員工個人資訊表結構
- [ ] 設計薪資和扣繳憑單表結構
- [ ] 設計公告系統表結構
- [ ] 設計活動報名表結構
- [ ] 設計問卷調查表結構
- [ ] 設計系統日誌表結構

### Entity Framework 模型建立
- [ ] 建立 User 實體模型
- [ ] 建立 Employee 實體模型
- [ ] 建立 Salary 實體模型
- [ ] 建立 TaxStatement 實體模型
- [ ] 建立 Announcement 實體模型
- [ ] 建立 Activity 實體模型
- [ ] 建立 Survey 實體模型
- [ ] 建立 AuditLog 實體模型

### 資料庫配置
- [ ] 配置 DbContext 類別
- [ ] 使用 Fluent API 配置實體關係
- [ ] 設定資料驗證規則和限制
- [ ] 配置索引和效能優化
- [ ] 建立資料庫連線字串管理
- [ ] 設定資料庫初始化策略

### Migration 和種子資料
- [ ] 建立 Entity Framework Migrations
- [ ] 建立初始資料種子 (Seed Data)
- [ ] 建立測試資料產生器
- [ ] 配置開發環境資料庫初始化
- [ ] 建立資料庫備份和還原腳本

### 資料存取層 (Repository Pattern)
- [ ] 建立 IRepository 泛用介面
- [ ] 建立 BaseRepository 基底類別
- [ ] 建立各實體的 Repository 介面
- [ ] 實作各實體的 Repository 類別
- [ ] 建立 Unit of Work 模式
- [ ] 配置 Dependency Injection 註冊

## ✅ 完成標準
- [ ] 資料庫架構設計文件完成
- [ ] 所有實體模型建立完成並通過編譯
- [ ] Entity Framework Migrations 可以成功執行
- [ ] 開發環境資料庫可以成功建立
- [ ] 種子資料可以正確載入
- [ ] Repository 模式實作完成並可正常運作
- [ ] 所有資料存取功能通過單元測試

## 📊 資料表清單

### 核心資料表
1. **Users** - 使用者帳號
2. **Employees** - 員工基本資料
3. **Roles** - 角色定義
4. **UserRoles** - 使用者角色關聯
5. **Departments** - 部門資料

### 功能資料表
6. **Salaries** - 薪資資料
7. **TaxStatements** - 扣繳憑單
8. **Announcements** - 公告
9. **Activities** - 活動
10. **ActivityRegistrations** - 活動報名
11. **Surveys** - 問卷
12. **SurveyResponses** - 問卷回應

### 系統資料表
13. **AuditLogs** - 系統日誌
14. **SystemSettings** - 系統設定
15. **FileUploads** - 檔案上傳記錄

## 🔗 相關資源
- Entity Framework Core 文件
- SQL Server/PostgreSQL 文件
- Repository Pattern 設計模式
- DDD (Domain-Driven Design) 指南

## 📋 後續工作項目
- WI-003: 使用者認證系統開發
- WI-004: 基礎 API 控制器建立

## 📝 備註
- 確保資料表設計符合正規化原則
- 考慮未來擴展性和效能需求
- 建立完整的資料字典文件
- 確保資料安全性和隱私保護
