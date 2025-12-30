# Protocol Buffers with TypeScript and React

这个项目演示了如何在React TypeScript应用中使用Protocol Buffers。

## 项目结构

- `src/proto/`: 包含Protocol Buffers定义文件
  - `user.proto`: 用户相关的消息和枚举定义
  - `message.proto`: 示例消息定义
- `src/generated/proto/`: 包含由Protocol Buffers生成的TypeScript文件
  - `bundle.js`: 生成的JavaScript代码
  - `bundle.d.ts`: 生成的TypeScript类型定义

## 安装依赖

```bash
npm install
```

## 生成Protocol Buffers TypeScript文件

```bash
npm run generate-proto
```

这个命令会从`src/proto/`目录中的`.proto`文件生成TypeScript代码。

## 启动开发服务器

```bash
npm start
```

## 使用方法

这个演示应用包含两个表单：

1. **用户表单**：演示如何使用Protocol Buffers来编码和解码用户数据
   - 填写表单字段
   - 点击"Encode & Decode User"按钮
   - 查看浏览器控制台以查看编码和解码的结果

2. **消息表单**：演示如何使用Protocol Buffers来编码和解码简单消息
   - 填写表单字段
   - 点击"Encode & Decode Message"按钮
   - 查看浏览器控制台以查看编码和解码的结果

## Protocol Buffers的优势

- **高效的序列化**：比JSON和XML更小的数据大小
- **类型安全**：强类型定义
- **向前和向后兼容**：可以添加新字段而不破坏现有代码
- **多语言支持**：可以在不同编程语言之间共享相同的数据结构
```

```
protoc --cpp_out=./src/generated/ ./src/proto/message.proto

protoc --plugin="protoc-gen-ts=./node_modules/.bin/protoc-gen-ts"  --ts_out=./src/generated/ ./src/proto/message.proto
```