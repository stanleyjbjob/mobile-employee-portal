# 工作項目 13 - 部署準備與上線

## 📋 基本資訊
- **工作項目編號**: WI-013
- **優先級**: 高
- **預估工作量**: 3-4 天
- **負責人員**: DevOps 工程師 + 系統管理員
- **前置條件**: WI-012 (效能優化完成)
- **階段**: 第三階段 (Month 9)

## 🎯 工作目標
完成生產環境部署準備，建立 CI/CD 流程，確保系統能夠穩定且安全地在生產環境中運行。

## 📝 詳細工作內容

### 生產環境準備
- [ ] **伺服器環境建置** - 生產伺服器配置和設定
- [ ] **資料庫部署** - 生產資料庫建立和初始化
- [ ] **SSL 憑證配置** - HTTPS 憑證申請和設定
- [ ] **網域名稱設定** - DNS 配置和網域指向
- [ ] **負載均衡器配置** - 高可用性架構設定
- [ ] **CDN 配置** - 靜態資源分發網路設定
- [ ] **監控系統部署** - 生產環境監控工具安裝
- [ ] **備份機制建立** - 自動備份系統設定

### Docker 容器化部署
- [ ] **Docker 映像檔優化** - 多階段建置優化
- [ ] **Docker Compose 配置** - 生產環境容器編排
- [ ] **健康檢查配置** - 容器健康狀態監控
- [ ] **資源限制設定** - CPU 和記憶體使用限制
- [ ] **網路配置** - 容器間網路安全設定
- [ ] **持久化儲存** - 資料持久化方案
- [ ] **映像檔倉庫** - 私有映像檔倉庫建立
- [ ] **容器安全掃描** - 安全漏洞檢測

### CI/CD 流程建立
- [ ] **GitHub Actions 設定** - 自動化建置和部署
- [ ] **建置流程配置** - 程式碼編譯和測試
- [ ] **測試自動化** - 自動化測試整合
- [ ] **部署流程** - 自動化部署腳本
- [ ] **環境管理** - 開發、測試、生產環境管理
- [ ] **回滾機制** - 部署失敗自動回滾
- [ ] **發布管理** - 版本控制和發布審核
- [ ] **通知機制** - 部署狀態通知

### 安全性配置
- [ ] **防火牆設定** - 網路安全規則配置
- [ ] **存取控制** - 伺服器存取權限管理
- [ ] **敏感資料管理** - 密碼和 API 金鑰管理
- [ ] **日誌安全** - 日誌儲存和存取控制
- [ ] **漏洞掃描** - 定期安全漏洞檢測
- [ ] **入侵偵測** - 異常行為監控
- [ ] **資料加密** - 傳輸和儲存加密
- [ ] **合規性檢查** - 資安合規性驗證

## ✅ 完成標準
- [ ] 生產環境成功部署並正常運行
- [ ] CI/CD 流程完整且穩定
- [ ] 所有安全措施正確配置
- [ ] 監控和日誌系統正常運作
- [ ] 備份和災難復原機制可用
- [ ] 效能表現符合預期
- [ ] 使用者可以正常存取系統
- [ ] 所有環境變數和配置正確
- [ ] 網域和 SSL 憑證正常
- [ ] 負載測試通過

## 🐳 Docker 容器化配置

### 後端 Dockerfile 優化
```dockerfile
# 多階段建置
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["EmployeePortal.Api.csproj", "."]
RUN dotnet restore "EmployeePortal.Api.csproj"
COPY . .
RUN dotnet build "EmployeePortal.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "EmployeePortal.Api.csproj" -c Release -o /app/publish

# 運行階段
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=publish /app/publish .

# 建立非 root 使用者
RUN groupadd -r appuser && useradd -r -g appuser appuser
RUN chown -R appuser:appuser /app
USER appuser

# 健康檢查
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

EXPOSE 8080
ENTRYPOINT ["dotnet", "EmployeePortal.Api.dll"]
```

### 前端 Dockerfile 優化
```dockerfile
# 建置階段
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build:prod

# 運行階段
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# 建立非 root 使用者
RUN addgroup -g 1001 -S appuser && adduser -S appuser -G appuser
USER appuser

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose 生產配置
```yaml
version: '3.8'

services:
  api:
    image: employee-portal-api:latest
    container_name: employee-portal-api
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - ConnectionStrings__DefaultConnection=${DB_CONNECTION_STRING}
      - JWT__Secret=${JWT_SECRET}
    depends_on:
      - db
      - redis
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  web:
    image: employee-portal-web:latest
    container_name: employee-portal-web
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - api
    networks:
      - app-network
    restart: unless-stopped

  db:
    image: postgres:15
    container_name: employee-portal-db
    environment:
      - POSTGRES_DB=${DB_NAME}
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - db_data:/var/lib/postgresql/data
      - ./backup:/backup
    networks:
      - app-network
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    container_name: employee-portal-redis
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    networks:
      - app-network
    restart: unless-stopped

volumes:
  db_data:
  redis_data:

networks:
  app-network:
    driver: bridge
```

## 🚀 CI/CD GitHub Actions 配置

### 建置和測試流程
```yaml
name: Build and Test

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  backend-test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: '8.0.x'
    
    - name: Restore dependencies
      run: dotnet restore api/EmployeePortal.Api.csproj
    
    - name: Build
      run: dotnet build api/EmployeePortal.Api.csproj --no-restore
    
    - name: Test
      run: dotnet test api/EmployeePortal.Tests.csproj --no-build --verbosity normal
    
    - name: Code Coverage
      run: |
        dotnet test api/EmployeePortal.Tests.csproj --collect:"XPlat Code Coverage"
        
  frontend-test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: admin-portal/package-lock.json
    
    - name: Install dependencies
      run: npm ci
      working-directory: admin-portal
    
    - name: Run tests
      run: npm run test:ci
      working-directory: admin-portal
    
    - name: Build
      run: npm run build:prod
      working-directory: admin-portal
```

### 部署流程
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Login to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}
    
    - name: Build and push Docker images
      run: |
        # 建置後端映像檔
        docker build -t employee-portal-api:${{ github.sha }} api/
        docker tag employee-portal-api:${{ github.sha }} employee-portal-api:latest
        docker push employee-portal-api:${{ github.sha }}
        docker push employee-portal-api:latest
        
        # 建置前端映像檔
        docker build -t employee-portal-web:${{ github.sha }} admin-portal/
        docker tag employee-portal-web:${{ github.sha }} employee-portal-web:latest
        docker push employee-portal-web:${{ github.sha }}
        docker push employee-portal-web:latest
    
    - name: Deploy to production
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.PROD_HOST }}
        username: ${{ secrets.PROD_USER }}
        key: ${{ secrets.PROD_SSH_KEY }}
        script: |
          cd /opt/employee-portal
          docker-compose pull
          docker-compose up -d
          docker system prune -f
    
    - name: Health check
      run: |
        sleep 30
        curl -f ${{ secrets.PROD_URL }}/health || exit 1
    
    - name: Notify deployment
      uses: 8398a7/action-slack@v3
      with:
        status: ${{ job.status }}
        webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## 🔧 生產環境配置

### Nginx 配置
```nginx
server {
    listen 80;
    server_name employee-portal.company.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name employee-portal.company.com;
    
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    
    # 安全標頭
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # 前端靜態檔案
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # API 反向代理
    location /api/ {
        proxy_pass http://employee-portal-api:8080/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # 超時設定
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }
    
    # 檔案上傳大小限制
    client_max_body_size 10M;
    
    # Gzip 壓縮
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;
}
```

### 環境變數配置
```bash
# .env.production
# 資料庫設定
DB_CONNECTION_STRING=Host=employee-portal-db;Database=EmployeePortal;Username=dbuser;Password=${DB_PASSWORD}
DB_NAME=EmployeePortal
DB_USER=dbuser
DB_PASSWORD=${DB_PASSWORD}

# JWT 設定
JWT_SECRET=${JWT_SECRET}
JWT_ISSUER=employee-portal.company.com
JWT_AUDIENCE=employee-portal-users

# Redis 設定
REDIS_CONNECTION_STRING=employee-portal-redis:6379
REDIS_PASSWORD=${REDIS_PASSWORD}

# 郵件設定
SMTP_HOST=smtp.company.com
SMTP_PORT=587
SMTP_USER=${SMTP_USER}
SMTP_PASSWORD=${SMTP_PASSWORD}

# 檔案儲存設定
FILE_UPLOAD_PATH=/app/uploads
MAX_FILE_SIZE=10485760

# 監控設定
APPLICATION_INSIGHTS_CONNECTION_STRING=${AI_CONNECTION_STRING}
```

## 📊 監控和日誌配置

### 健康檢查端點
```csharp
// HealthCheckExtensions.cs
public static class HealthCheckExtensions
{
    public static IServiceCollection AddHealthChecks(this IServiceCollection services, 
        IConfiguration configuration)
    {
        services.AddHealthChecks()
            .AddNpgSql(configuration.GetConnectionString("DefaultConnection"))
            .AddRedis(configuration.GetConnectionString("Redis"))
            .AddCheck<ApiHealthCheck>("api")
            .AddCheck<FileSystemHealthCheck>("filesystem");
        
        return services;
    }
}

// Program.cs
app.MapHealthChecks("/health", new HealthCheckOptions
{
    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
});
```

### 日誌配置
```json
{
  "Serilog": {
    "MinimumLevel": {
      "Default": "Information",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning"
      }
    },
    "WriteTo": [
      {
        "Name": "Console"
      },
      {
        "Name": "File",
        "Args": {
          "path": "/app/logs/log-.txt",
          "rollingInterval": "Day",
          "retainedFileCountLimit": 30
        }
      },
      {
        "Name": "ApplicationInsights",
        "Args": {
          "connectionString": "${APPLICATION_INSIGHTS_CONNECTION_STRING}"
        }
      }
    ]
  }
}
```

## 🔒 安全配置檢查清單

### 伺服器安全
- [ ] 關閉不必要的連接埠
- [ ] 更新作業系統和軟體
- [ ] 設定防火牆規則
- [ ] 配置入侵偵測系統
- [ ] 設定自動安全更新
- [ ] 建立安全監控告警

### 應用程式安全
- [ ] 移除除錯和開發工具
- [ ] 設定安全的 Cookie 屬性
- [ ] 配置 CORS 政策
- [ ] 實作 Rate Limiting
- [ ] 設定安全標頭
- [ ] 啟用 HTTPS 強制重導向

### 資料安全
- [ ] 資料庫連線加密
- [ ] 敏感資料加密儲存
- [ ] 定期備份驗證
- [ ] 存取日誌記錄
- [ ] 資料保留政策實施
- [ ] 個資保護合規檢查

## 🔗 相關資源
- Docker 生產部署最佳實務
- GitHub Actions 文件
- Nginx 配置指南
- SSL/TLS 配置指南

## 📋 後續工作項目
- WI-014: 使用者培訓與文件
- WI-015: 上線後監控與維護

## 📝 備註
- 所有敏感資訊都應該使用環境變數或加密儲存
- 建立完整的災難復原計劃
- 定期進行安全性檢查和更新
- 建立上線後的監控和維護流程
