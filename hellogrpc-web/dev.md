在Ubuntu上安装gRPC-Web插件（protoc-gen-grpc-web）的步骤如下：

安装Protocol Buffers编译器（protoc）

确保已安装protoc（v3.0.0+）：
sudo apt update
sudo apt install -y protobuf-compiler
protoc --version  # 验证版本

下载预编译的gRPC-Web插件

访问https://github.com/grpc/grpc-web/releases，找到最新版本。例如1.4.2：

下载适用于Linux的插件（amd64架构）

wget https://github.com/grpc/grpc-web/releases/download/1.4.2/protoc-gen-grpc-web-1.4.2-linux-x86_64

重命名并赋予执行权限

mv protoc-gen-grpc-web-1.4.2-linux-x86_64 protoc-gen-grpc-web
chmod +x protoc-gen-grpc-web

移动到系统PATH目录（如/usr/local/bin）

sudo mv protoc-gen-grpc-web /usr/local/bin/

验证安装

protoc-gen-grpc-web --version
输出类似：protoc-gen-grpc-web 1.4.2

生成gRPC-Web代码示例

假设有proto文件example.proto，运行：
protoc example.proto \
  --js_out=import_style=commonjs,binary:. \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.

这会生成example_pb.js和example_grpc_web_pb.js文件。

常见问题
权限问题：确保插件有执行权限（chmod +x）。

路径错误：确认插件位于/usr/local/bin或PATH包含的目录。

版本冲突：使用匹配的protoc和grpc-web版本。

备选方案：通过npm安装

如果你使用Node.js环境，也可以通过npm全局安装：
npm install -g grpc-tools

安装后插件路径通常在/usr/local/lib/node_modules/grpc-tools/bin/。

完成上述步骤后，即可在Ubuntu上使用gRPC-Web插件生成客户端代码。