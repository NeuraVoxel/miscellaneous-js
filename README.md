# miscellaneous-js
JavaScript相关的各种小项目集合

## 目录结构

```
.
├── hellogrpc/          # gRPC示例项目
│   ├── proto/          # Protocol Buffers定义文件
│   │   └── greeter.proto
│   ├── src/           # 源代码目录
│   │   ├── client.js  # gRPC客户端
│   │   └── server.js  # gRPC服务器
│   ├── package.json   # 项目依赖配置
│   └── README.md      # 项目说明文档
├── .gitignore         # Git忽略文件配置
├── LICENSE            # 许可证文件
└── README.md          # 仓库说明文档
```

## 项目列表

1. **hellogrpc** - 一个简单的gRPC示例项目，展示了如何使用Node.js实现gRPC客户端和服务器。