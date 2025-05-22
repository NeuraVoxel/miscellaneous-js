# miscellaneous-js
JavaScript相关的各种小项目集合

## 目录结构

```
.
├── hellogrpc-node/     # gRPC示例项目
│   ├── proto/          # Protocol Buffers定义文件
│   │   └── greeter.proto
│   ├── src/           # 源代码目录
│   │   ├── client.js  # gRPC客户端
│   │   └── server.js  # gRPC服务器
│   ├── package.json   # 项目依赖配置
│   └── README.md      # 项目说明文档
├── helloprobuffer/     # Protocol Buffers示例项目
│   ├── proto/          # Protocol Buffers定义文件
│   │   └── message.proto
│   ├── src/           # 源代码目录
│   │   ├── encode.js  # 编码示例
│   │   └── decode.js  # 解码示例
│   ├── index.js       # 主入口文件
│   ├── package.json   # 项目依赖配置
│   └── README.md      # 项目说明文档
├── hellogrpc-web/      # gRPC-Web示例项目
│   ├── proto/          # Protocol Buffers定义文件
│   │   └── greeter.proto
│   ├── src/           # 源代码目录
│   │   ├── client/    # 客户端代码
│   │   │   ├── client.js
│   │   │   └── index.html
│   │   └── server/    # 服务器代码
│   │       └── server.js
│   ├── envoy.yaml     # Envoy代理配置
│   ├── Dockerfile     # Docker配置
│   ├── docker-compose.yml # Docker Compose配置
│   ├── webpack.config.js # Webpack配置
│   ├── package.json   # 项目依赖配置
│   └── README.md      # 项目说明文档
├── hellogrpc-web-cpp/  # gRPC-Web与C++后端示例项目
│   ├── proto/          # Protocol Buffers定义文件
│   │   └── greeter.proto
│   ├── client/        # 前端JavaScript代码
│   │   ├── src/       # 源代码目录
│   │   │   ├── client.js
│   │   │   └── index.html
│   │   ├── package.json
│   │   └── webpack.config.js
│   ├── server/        # 后端C++代码
│   │   ├── src/       # 源代码目录
│   │   │   └── server.cpp
│   │   └── CMakeLists.txt
│   └── README.md      # 项目说明文档
├── .gitignore         # Git忽略文件配置
├── LICENSE            # 许可证文件
└── README.md          # 仓库说明文档
```

## 项目列表

1. **hellogrpc-node** - 一个简单的gRPC示例项目，展示了如何使用Node.js实现gRPC客户端和服务器。
   - 实现了一元调用和服务器流式调用
   - 使用Protocol Buffers定义服务和消息
   - 详细的代码注释和使用说明

2. **helloprobuffer** - Protocol Buffers序列化示例项目，展示了如何使用Protocol Buffers进行数据序列化和反序列化。
   - 比较Protocol Buffers和JSON的数据大小
   - 展示编码和解码过程
   - 包含性能比较测试

3. **hellogrpc-web** - gRPC-Web示例项目，展示了如何在Web浏览器中使用gRPC-Web与gRPC服务通信。
   - 使用Envoy代理桥接gRPC和HTTP
   - 支持一元调用和服务器流式调用
   - 完整的Web客户端实现

4. **hellogrpc-web-cpp** - gRPC-Web与C++后端示例项目，展示了如何使用JavaScript前端和C++后端实现gRPC通信。
   - 使用C++实现gRPC服务器
   - 使用JavaScript和gRPC-Web实现Web客户端
   - 支持一元调用和服务器流式调用
   - 包含完整的构建配置（CMake和Webpack）

## 先决条件

要运行这些项目，您需要安装以下软件：

- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/) (v6+)
- [Docker](https://www.docker.com/) 和 [Docker Compose](https://docs.docker.com/compose/) (用于hellogrpc-web项目)
- [Protoc](https://github.com/protocolbuffers/protobuf) 编译器 (v3.0+，用于生成Protocol Buffers代码)

## 如何运行

每个子项目都有独立的依赖和运行方式，请参考各自目录中的README.md获取详细说明。

### hellogrpc

```bash
cd hellogrpc
npm install
# 启动服务器
node src/server.js
# 在另一个终端中启动客户端
node src/client.js
```

### helloprobuffer

```bash
cd helloprobuffer
npm install
npm start
```

### hellogrpc-web

```bash
cd hellogrpc-web
npm install
# 生成客户端代码
npm run generate
# 启动Envoy代理
docker-compose up -d
# 启动服务器和客户端
npm start
```

## 技术栈

这些项目使用了以下技术：

- [Protocol Buffers](https://developers.google.com/protocol-buffers) - 用于数据序列化
- [gRPC](https://grpc.io/) - 用于服务间通信
- [gRPC-Web](https://github.com/grpc/grpc-web) - 用于浏览器中的gRPC通信
- [Node.js](https://nodejs.org/) - JavaScript运行时
- [Envoy Proxy](https://www.envoyproxy.io/) - 用于gRPC-Web代理
- [Webpack](https://webpack.js.org/) - 用于打包Web客户端代码

## 学习资源

- [Protocol Buffers官方文档](https://developers.google.com/protocol-buffers)
- [gRPC官方文档](https://grpc.io/docs/)
- [gRPC-Web GitHub](https://github.com/grpc/grpc-web)
- [Envoy代理文档](https://www.envoyproxy.io/)

## 常见问题

### 1. 为什么需要使用Protocol Buffers而不是JSON？

Protocol Buffers相比JSON有以下优势：
- 更小的数据大小（通常比JSON小30-60%）
- 更快的解析速度
- 强类型定义
- 向前兼容性

### 2. 为什么gRPC-Web需要Envoy代理？

浏览器不能直接与gRPC服务器通信，因为：
- 浏览器不支持HTTP/2的所有功能
- 浏览器不能发送gRPC格式的请求

Envoy代理负责在gRPC服务器和Web客户端之间转换协议，将HTTP/1.1请求转换为gRPC请求，并将gRPC响应转换回HTTP/1.1响应。

## 贡献指南

欢迎贡献！如果您想为这个项目做出贡献，请遵循以下步骤：

1. Fork这个仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个Pull Request

## 许可证

这个项目采用MIT许可证 - 详情请参阅[LICENSE](LICENSE)文件。