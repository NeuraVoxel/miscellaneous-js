# gRPC-Web JavaScript 示例

这个项目展示了如何在JavaScript中使用gRPC-Web与gRPC服务器进行通信。gRPC-Web允许Web客户端直接与gRPC服务器通信，使用Protocol Buffers进行高效的数据序列化。

## 项目结构

```
hellogrpc-web/
├── proto/                  # Protocol Buffers定义文件
│   └── greeter.proto       # 服务和消息定义
├── src/                    # 源代码目录
│   ├── client/             # 客户端代码
│   │   ├── index.html      # Web客户端HTML
│   │   └── client.js       # gRPC-Web客户端实现
│   └── server/             # 服务器代码
│       └── server.js       # gRPC服务器实现
├── envoy.yaml              # Envoy代理配置
├── Dockerfile              # Envoy Docker配置
├── docker-compose.yml      # Docker Compose配置
├── webpack.config.js       # Webpack配置
├── package.json            # 项目配置
└── README.md               # 项目说明
```

## 前提条件

- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/) (v6+)
- [Docker](https://www.docker.com/) 和 [Docker Compose](https://docs.docker.com/compose/) (用于运行Envoy代理)
- [Protoc](https://github.com/protocolbuffers/protobuf) 编译器 (v3.0+)
- [protoc-gen-grpc-web](https://github.com/grpc/grpc-web/releases) 插件

## 安装

1. 克隆项目并安装依赖：

```bash
git clone <repository-url>
cd hellogrpc-web
npm install
```

2. 安装Protoc编译器和gRPC-Web插件：

对于macOS：
```bash
brew install protobuf
```

对于Linux：
```bash
apt-get install -y protobuf-compiler
```

安装gRPC-Web插件：
```bash
# 下载适合你系统的版本
GRPC_WEB_PLUGIN_VERSION=1.4.2
wget https://github.com/grpc/grpc-web/releases/download/${GRPC_WEB_PLUGIN_VERSION}/protoc-gen-grpc-web-${GRPC_WEB_PLUGIN_VERSION}-darwin-x86_64
chmod +x protoc-gen-grpc-web-${GRPC_WEB_PLUGIN_VERSION}-darwin-x86_64
sudo mv protoc-gen-grpc-web-${GRPC_WEB_PLUGIN_VERSION}-darwin-x86_64 /usr/local/bin/protoc-gen-grpc-web
```
ubuntu 安装gRPC-Web插件请参考dev.md[./dev.md]

3. 生成客户端代码：

```bash
npm run generate
```

## 运行示例

1. 启动Envoy代理：

```bash
docker-compose up -d
```

2. 启动gRPC服务器：

```bash
npm run start:server
```

3. 在另一个终端中，启动Web客户端开发服务器：

```bash
npm run start:dev-server
```

或者，你可以同时启动服务器和客户端：

```bash
npm start
```

4. 打开浏览器访问 http://localhost:8081

## 示例说明

### 服务定义

这个示例实现了一个简单的Greeter服务，定义在`proto/greeter.proto`文件中：

```protobuf
service Greeter {
  // 一元调用
  rpc SayHello (HelloRequest) returns (HelloReply) {}
  
  // 服务器流式调用
  rpc SayHelloStreamReply (HelloRequest) returns (stream HelloReply) {}
}
```

### 服务器实现

服务器使用Node.js和@grpc/grpc-js库实现gRPC服务：

- `SayHello`：一个简单的一元调用，返回一个问候消息
- `SayHelloStreamReply`：一个服务器流式调用，返回多个问候消息

### 客户端实现

Web客户端使用gRPC-Web库与服务器通信：

- 一元调用：点击"Say Hello"按钮发送一个请求并接收一个响应
- 服务器流式调用：点击"Say Hello Stream"按钮发送一个请求并接收多个响应

### Envoy代理

Envoy代理负责在gRPC服务器和Web客户端之间转换协议。它将HTTP/1.1请求转换为gRPC请求，并将gRPC响应转换回HTTP/1.1响应。

## gRPC-Web的优势

- **强类型**：使用Protocol Buffers进行类型安全的API定义
- **高效**：比JSON更小、更快的数据序列化
- **双向流**：支持服务器流式传输
- **代码生成**：自动生成客户端和服务器代码
- **跨平台**：可以在浏览器和Node.js中使用相同的API定义

## 进一步学习

- [gRPC-Web GitHub](https://github.com/grpc/grpc-web)
- [gRPC-Web文档](https://grpc.io/docs/platforms/web/)
- [Protocol Buffers文档](https://developers.google.com/protocol-buffers)
- [Envoy代理文档](https://www.envoyproxy.io/)