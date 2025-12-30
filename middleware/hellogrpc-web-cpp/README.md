# gRPC-Web with C++ Backend Example

这是一个使用 gRPC-Web 和 C++ 后端的完整示例项目。前端使用 JavaScript 和 gRPC-Web，后端使用 C++ 实现 gRPC 服务。

## 项目结构

```
.
├── proto/                  # Protocol Buffers 定义
│   └── greeter.proto      # 服务定义文件
├── client/                # 前端 JavaScript 代码
│   ├── src/
│   │   ├── client.js     # gRPC-Web 客户端实现
│   │   └── index.html    # Web 界面
│   ├── package.json      # 前端依赖配置
│   └── webpack.config.js # Webpack 配置
└── server/               # 后端 C++ 代码
    ├── src/
    │   └── server.cpp    # gRPC 服务器实现
    └── CMakeLists.txt    # CMake 构建配置
```

## 前置要求

### 系统要求
- CMake (>= 3.5)
- C++ 编译器 (支持 C++14)
- Node.js (>= 14)
- npm
- Protocol Buffers 编译器 (protoc)
- gRPC C++ 插件
- gRPC-Web 插件

### 安装依赖

1. 安装基本构建工具：
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y cmake build-essential
```

2. 安装 Protocol Buffers：
```bash
# Ubuntu/Debian
sudo apt-get install -y protobuf-compiler libprotobuf-dev

# 验证安装
protoc --version  # 应显示 libprotoc 3.x.x
```

3. 安装 gRPC：
```bash
# Ubuntu/Debian
sudo apt-get install -y libgrpc++-dev

# 验证 grpc_cpp_plugin 是否可用
which grpc_cpp_plugin  # 应显示类似 /usr/bin/grpc_cpp_plugin
```

4. 安装 Node.js 和 gRPC-Web protoc 插件：
```bash
# 安装 Node.js 和 npm
sudo apt-get install -y nodejs npm

# 安装 gRPC-Web protoc 插件
sudo npm install -g protoc-gen-grpc-web

# 验证安装
which protoc-gen-grpc-web  # 应显示插件路径
```

### 故障排除

如果在构建过程中遇到 protoc 或 grpc_cpp_plugin 相关的错误：

1. 手动指定 protoc 路径：
```bash
cmake -DPROTOC_PATH=/path/to/protoc ..
```

2. 手动指定 grpc_cpp_plugin 路径：
```bash
cmake -DGRPC_CPP_PLUGIN_PATH=/path/to/grpc_cpp_plugin ..
```

3. 常见问题：

- 如果出现 "protoc: command not found"：
  ```bash
  # 重新安装 protobuf-compiler
  sudo apt-get install --reinstall protobuf-compiler
  ```

- 如果出现 "grpc_cpp_plugin: command not found"：
  ```bash
  # 重新安装 grpc 开发包
  sudo apt-get install --reinstall libgrpc++-dev
  ```

- 如果出现找不到 Protobuf 或 gRPC 的 CMake 配置文件：
  ```bash
  # 设置 Protobuf_DIR 和 gRPC_DIR
  cmake -DProtobuf_DIR=/usr/lib/x86_64-linux-gnu/cmake/protobuf \
        -DgRPC_DIR=/usr/lib/x86_64-linux-gnu/cmake/grpc ..
  ```

## 构建和运行

### 设置 Envoy 代理

gRPC-Web 需要一个代理来转换 HTTP/1.1 请求为 gRPC 请求。我们使用 Envoy 代理来处理这个转换。

1. 使用 Docker 启动 Envoy 代理：
```bash
# 确保 Docker 已安装
docker-compose up -d
```

2. 验证 Envoy 代理是否正在运行：
```bash
docker ps | grep envoy
```

如果你不想使用 Docker，也可以直接安装 Envoy：
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common
curl -sL 'https://deb.dl.getenvoy.io/public/gpg.8115BA8E629CC074.key' | sudo gpg --dearmor -o /usr/share/keyrings/getenvoy-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/getenvoy-keyring.gpg] https://deb.dl.getenvoy.io/public/deb/ubuntu $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/getenvoy.list
sudo apt-get update
sudo apt-get install -y getenvoy-envoy

# 运行 Envoy
envoy -c envoy.yaml
```

### 构建并运行后端服务器

1. 创建构建目录并构建项目：
```bash
cd server
mkdir -p build && cd build
cmake .. -DCMAKE_BUILD_TYPE=Debug
```

2. 如果 CMake 配置成功，编译项目：
```bash
make -j$(nproc)
```

3. 检查生成的可执行文件：
```bash
ls -la greeter_server
```

4. 运行服务器：
```bash
./greeter_server
```

5. 验证服务器是否正在运行：
```bash
# 在另一个终端中
netstat -tuln | grep 9090  # 应显示服务器正在监听 9090 端口
```

#### 调试构建问题

如果构建过程中遇到问题：

1. 启用详细输出：
```bash
cmake -DCMAKE_VERBOSE_MAKEFILE=ON ..
make VERBOSE=1
```

2. 检查生成的文件：
```bash
ls -la generated/  # 查看是否生成了 Protocol Buffers 文件
```

3. 手动运行 protoc 命令测试：
```bash
protoc --cpp_out=. -I../../proto ../../proto/greeter.proto
```

### 构建并运行前端

1. 安装依赖：
```bash
cd client
npm install
```

2. 创建 proto 输出目录：
```bash
mkdir -p src/proto
```

3. 生成 Protocol Buffers 代码：
```bash
# 确保 protoc-gen-grpc-web 在 PATH 中
npm run generate
```

4. 验证生成的文件：
```bash
ls -la src/proto/  # 应该包含 greeter_pb.js 和 greeter_grpc_web_pb.js
```

5. 启动开发服务器：
```bash
npm start
```

6. 打开浏览器访问 http://localhost:3000

#### 调试前端问题

如果在生成 Protocol Buffers 代码时遇到问题：

1. 检查 protoc 和 protoc-gen-grpc-web 是否正确安装：
```bash
which protoc
which protoc-gen-grpc-web
```

2. 手动运行 protoc 命令：
```bash
protoc -I=../proto ../proto/greeter.proto \
  --js_out=import_style=commonjs:./src/proto \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./src/proto
```

3. 检查 webpack 配置：
```bash
# 确保 webpack.config.js 中的路径正确
cat webpack.config.js
```

4. 使用详细模式启动 webpack：
```bash
npx webpack --mode=development --progress
```

### 完整运行流程

1. 启动 Envoy 代理（在项目根目录）：
```bash
docker-compose up -d
```

2. 启动 gRPC 服务器（在 server/build 目录）：
```bash
./greeter_server
```

3. 启动 Web 客户端（在 client 目录）：
```bash
npm start
```

4. 打开浏览器访问 http://localhost:3000

## 使用说明

1. 在输入框中输入你的名字
2. 点击 "Send Unary Request" 发送一元请求
3. 点击 "Start Streaming" 开始接收流式响应
   - 服务器将每秒发送一条消息，共发送5条
   - 再次点击按钮可以停止流式传输

## 功能特性

1. 一元 RPC 调用 (SayHello)
   - 客户端发送单个请求
   - 服务器返回单个响应

2. 服务器流式 RPC (SayHelloStreamReply)
   - 客户端发送单个请求
   - 服务器返回多个响应
   - 支持取消流式传输

## 注意事项

- 这是一个简化的示例，在生产环境中，你可能需要：
  - 使用 Envoy 代理来处理 gRPC-Web 请求
  - 添加错误处理和重试逻辑
  - 实现安全认证
  - 优化构建配置
  - 添加日志记录
  - 实现健康检查

- 开发模式下，webpack-dev-server 配置了代理来处理 gRPC-Web 请求，但在生产环境中应该使用 Envoy 代理

## 调试

- 服务器日志会显示在终端中
- 客户端日志可以在浏览器的开发者工具控制台中查看
- gRPC 服务器运行在 9090 端口
- Web 开发服务器运行在 8080 端口