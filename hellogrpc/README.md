# Node.js gRPC 示例

这是一个使用 Node.js 实现的简单 gRPC 示例项目。该项目演示了如何创建 gRPC 服务器和客户端，并实现了两种类型的 RPC 方法：简单 RPC 和服务器流式 RPC。

## 项目结构

```
hellogrpc/
├── package.json       # 项目配置和依赖
├── proto/            # Protocol Buffers 定义
│   └── greeter.proto # gRPC 服务定义
└── src/              # 源代码
    ├── server.js     # 服务器实现
    └── client.js     # 客户端实现
```

## 功能说明

该示例实现了一个简单的 Greeter 服务，包含两个 RPC 方法：

1. **SayHello**: 简单的一次性问候 RPC
   - 客户端发送包含用户名的请求
   - 服务器返回"Hello, [用户名]!"格式的问候语

2. **SayHelloStreamReply**: 服务器流式问候 RPC
   - 客户端发送包含用户名的请求
   - 服务器返回多种语言的问候语流，每秒发送一条

## 安装依赖

```bash
npm install
```

## 运行示例

1. 启动服务器：

```bash
npm run start:server
```

服务器将开始监听在 0.0.0.0:50051，并显示以下消息：
```
Server running at http://0.0.0.0:50051
```

2. 在另一个终端窗口中运行客户端：

```bash
npm run start:client
```

这将使用默认名字"World"发送请求。

你也可以指定一个名字作为参数：

```bash
npm run start:client -- Alice
```

## 客户端输出示例

```
Calling SayHello RPC...
Server response: Hello, Alice!

Calling SayHelloStreamReply RPC (streaming)...
Stream response: Hello, Alice!
Stream response: Bonjour, Alice!
Stream response: Hola, Alice!
Stream response: Ciao, Alice!
Stream response: 你好, Alice!
Stream ended
```

## 依赖项

- @grpc/grpc-js: gRPC 的 Node.js 实现
- @grpc/proto-loader: 用于加载 .proto 文件的工具