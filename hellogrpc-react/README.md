# gRPC-Web React TypeScript 示例

这个项目展示了如何使用 gRPC-Web 在 React TypeScript 前端应用程序中与 Node.js gRPC 服务器进行通信。

## 项目结构

```
hellogrpc-react/
├── backend/             # Node.js gRPC 服务器
│   ├── package.json
│   └── server.js
├── frontend/           # React TypeScript 前端
│   ├── package.json
│   ├── tsconfig.json
│   ├── public/
│   └── src/
│       ├── proto/     # 生成的 gRPC-Web 代码
│       ├── App.tsx
│       └── index.tsx
├── proto/             # Protocol Buffers 定义
│   └── hello.proto
├── envoy.yaml         # Envoy 代理配置
├── docker-compose.yml # Docker Compose 配置
├── check-services.js  # 服务检查脚本
└── README.md
```

## 功能特性

- 基于 Node.js 的 gRPC 服务器
- 基于 React 和 TypeScript 的前端
- 使用 gRPC-Web 进行前后端通信
- 支持一元 RPC 和服务器流式 RPC
- 使用 Envoy 作为代理

## 前置要求

- Node.js (v14+)
- Docker 和 Docker Compose
- Protocol Buffers 编译器 (protoc)
- gRPC-Web 插件

## 安装步骤

1. 安装后端依赖：
```bash
cd backend
npm install
```

2. 安装前端依赖：
```bash
cd frontend
npm install
```

3. 启动 Envoy 代理：
```bash
docker-compose up -d
```

4. 启动后端服务器：
```bash
cd backend
npm start
```

5. 启动前端开发服务器：
```bash
cd frontend
npm start
```

## 使用说明

1. 访问前端应用：
   - 打开浏览器访问 http://localhost:3000

2. 测试 gRPC 功能：
   - 在输入框中输入名字，点击"发送请求"按钮测试一元 RPC
   - 点击"开始接收流"按钮测试服务器流式 RPC

## 故障排除

### 解决 503 Service Unavailable 错误

如果你遇到 `Error: Http response at 400 or 500 level, http status code: 503` 错误，请按照以下步骤排查：

1. **运行服务检查脚本**：
```bash
node check-services.js
```
这个脚本会检查所有必要的服务是否正在运行，并提供详细的诊断信息。

2. **确保所有服务都在运行**：
   - 后端 gRPC 服务器 (端口 50051)
   - Envoy 代理 (端口 8080 和 9901)

3. **检查 Docker 容器**：
```bash
docker ps
```
确保 Envoy 容器正在运行。如果不是，尝试重启：
```bash
docker-compose down
docker-compose up -d
```

4. **检查 Envoy 日志**：
```bash
docker-compose logs envoy
```
查找任何错误或警告消息。

5. **检查后端服务器日志**：
查看运行后端服务器的终端窗口，寻找任何错误消息。

6. **网络配置问题**：
   - 在 macOS 和 Windows 上，Envoy 配置中的 `host.docker.internal` 应该能正常工作
   - 在 Linux 上，你可能需要修改 `envoy.yaml` 中的地址为 `172.17.0.1` 或你的实际主机 IP

7. **端口冲突**：
确保端口 8080、9901 和 50051 没有被其他应用程序占用。

8. **浏览器问题**：
   - 清除浏览器缓存
   - 尝试使用不同的浏览器
   - 检查浏览器控制台是否有其他错误

### 常见问题解决方案

1. **后端服务未运行**：
```bash
cd backend
npm start
```

2. **Envoy 代理未运行或配置错误**：
```bash
docker-compose down
docker-compose up -d
```

3. **前端客户端配置问题**：
检查 `App.tsx` 中的 gRPC 客户端配置，确保它指向正确的 Envoy 代理地址。

4. **Docker 网络问题**：
在 Linux 上，你可能需要修改 `envoy.yaml` 中的 `host.docker.internal` 为你的实际主机 IP。

## 开发说明

### 修改 Protocol Buffers 定义

1. 编辑 `proto/hello.proto` 文件

2. 重新生成后端代码：
```bash
cd backend
npm run generate-proto
```

3. 重新生成前端代码：
```bash
cd frontend
npm run generate-proto
```

### 开发模式

- 后端服务器运行在 50051 端口
- Envoy 代理运行在 8080 端口
- 前端开发服务器运行在 3000 端口

## 注意事项

1. 确保所有服务都在运行：
   - gRPC 后端服务器
   - Envoy 代理
   - React 开发服务器

2. 如果修改了 proto 文件，需要重新生成客户端和服务器代码

3. 在生产环境中，应该：
   - 配置适当的安全措施
   - 使用 HTTPS
   - 实现错误处理
   - 添加日志记录
   - 实现适当的认证机制

## 许可证

MIT