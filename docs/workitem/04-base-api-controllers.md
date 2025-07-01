# 工作項目 04 - 基礎 API 控制器建立

## 📋 基本資訊
- **工作項目編號**: WI-004
- **優先級**: 高
- **預估工作量**: 3-4 天
- **負責人員**: 後端工程師
- **前置條件**: WI-003 (認證系統完成)
- **階段**: 第一階段 (Week 3-4)

## 🎯 工作目標
建立所有核心功能的 API 控制器和服務層，實現 RESTful API 設計，並確保所有端點都具備適當的認證和授權。

## 📝 詳細工作內容

### 基礎架構建立
- [ ] 建立 BaseController 基底控制器
- [ ] 實作統一的 API 回應格式
- [ ] 建立全域例外處理中介軟體
- [ ] 實作 ProblemDetails 錯誤回應
- [ ] 建立 API 版本控制機制
- [ ] 配置 AutoMapper 物件對應
- [ ] 建立 DTO (Data Transfer Object) 類別

### 員工資料管理 API
- [ ] **EmployeesController**
  - `GET /api/employees/me` - 取得個人資料
  - `PUT /api/employees/me` - 更新個人資料
  - `GET /api/employees/{id}` - 取得指定員工資料 (管理員)
  - `GET /api/employees` - 取得員工清單 (管理員)
- [ ] 建立 EmployeeService 服務層
- [ ] 實作個人資料驗證邏輯
- [ ] 建立員工資料 DTO 類別

### 薪資資料管理 API
- [ ] **SalariesController**
  - `GET /api/salaries/my-payslips` - 取得個人薪資單清單
  - `GET /api/salaries/payslip/{id}` - 下載薪資單
  - `GET /api/salaries/tax-statements` - 取得扣繳憑單清單
  - `GET /api/salaries/tax-statement/{id}` - 下載扣繳憑單
- [ ] 建立 SalaryService 服務層
- [ ] 實作檔案下載功能
- [ ] 建立薪資資料 DTO 類別

### 公告系統 API
- [ ] **AnnouncementsController**
  - `GET /api/announcements` - 取得公告清單
  - `GET /api/announcements/{id}` - 取得公告詳細內容
  - `POST /api/announcements` - 新增公告 (管理員)
  - `PUT /api/announcements/{id}` - 更新公告 (管理員)
  - `DELETE /api/announcements/{id}` - 刪除公告 (管理員)
- [ ] 建立 AnnouncementService 服務層
- [ ] 實作公告搜尋和篩選功能
- [ ] 建立公告 DTO 類別

### 活動管理 API
- [ ] **ActivitiesController**
  - `GET /api/activities` - 取得活動清單
  - `GET /api/activities/{id}` - 取得活動詳細資訊
  - `POST /api/activities/{id}/register` - 活動報名
  - `DELETE /api/activities/{id}/register` - 取消報名
  - `GET /api/activities/my-registrations` - 取得個人報名記錄
- [ ] 建立 ActivityService 服務層
- [ ] 實作活動報名邏輯和限制
- [ ] 建立活動相關 DTO 類別

### 問卷調查 API
- [ ] **SurveysController**
  - `GET /api/surveys` - 取得可填寫問卷清單
  - `GET /api/surveys/{id}` - 取得問卷詳細內容
  - `POST /api/surveys/{id}/response` - 提交問卷回應
  - `GET /api/surveys/my-responses` - 取得個人問卷回應記錄
- [ ] 建立 SurveyService 服務層
- [ ] 實作問卷回應驗證邏輯
- [ ] 建立問卷相關 DTO 類別

## ✅ 完成標準
- [ ] 所有 API 端點正確實作並通過測試
- [ ] 所有控制器都具備適當的認證和授權
- [ ] API 回應格式統一且符合 RESTful 標準
- [ ] 錯誤處理機制完整且使用者友善
- [ ] Swagger 文件完整且正確
- [ ] 所有 DTO 類別建立完成
- [ ] 服務層邏輯正確實作
- [ ] 單元測試覆蓋率達到 80% 以上

## 📋 API 設計原則
- **RESTful 設計**: 遵循 REST 架構原則
- **統一回應格式**: 成功和錯誤回應都使用一致的格式
- **適當的 HTTP 狀態碼**: 正確使用 200, 201, 400, 401, 403, 404, 500 等
- **分頁支援**: 清單類 API 支援分頁和排序
- **篩選和搜尋**: 提供適當的查詢參數
- **版本控制**: 準備未來 API 版本升級

## 🔒 安全性實作
- [ ] 所有端點都需要認證 (除了公開端點)
- [ ] 實作角色權限檢查
- [ ] 輸入驗證和清理
- [ ] 防止 SQL 注入攻擊
- [ ] 實作 Rate Limiting
- [ ] 敏感資料遮罩處理

## 🧪 測試項目
- [ ] 控制器單元測試
- [ ] 服務層邏輯測試
- [ ] 整合測試
- [ ] API 端點測試
- [ ] 認證授權測試
- [ ] 錯誤處理測試
- [ ] 效能測試

## 📊 回應格式範例
```json
{
  "success": true,
  "data": {
    // 實際資料
  },
  "message": "操作成功",
  "timestamp": "2025-07-01T10:00:00Z"
}
```

錯誤回應:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "輸入資料驗證失敗",
    "details": []
  },
  "timestamp": "2025-07-01T10:00:00Z"
}
```

## 🔗 相關資源
- ASP.NET Core Web API 文件
- RESTful API 設計指南
- AutoMapper 文件
- Swagger/OpenAPI 規範

## 📋 後續工作項目
- WI-005: 前端基礎 UI 框架建立
- WI-006: 個人資訊查詢功能開發

## 📝 備註
- 確保所有 API 都有完整的 Swagger 註解
- 建立 API 使用範例和文件
- 考慮未來微服務拆分的可能性
- 實作適當的快取機制提升效能
