const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// 加载proto文件
const PROTO_PATH = path.join(__dirname, '../../proto/greeter.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const hellogrpc = protoDescriptor.hellogrpc;

// 实现服务方法
const sayHello = (call, callback) => {
  const name = call.request.name || 'World';
  callback(null, { message: `Hello, ${name}!` });
};

const sayHelloStreamReply = (call) => {
  const name = call.request.name || 'World';
  const responses = [
    `Hello, ${name}!`,
    `How are you, ${name}?`,
    `Good to see you, ${name}!`,
    `Have a great day, ${name}!`,
    `Goodbye, ${name}!`
  ];

  // 模拟流式响应，每500ms发送一条消息
  responses.forEach((message, index) => {
    setTimeout(() => {
      call.write({ message });
      if (index === responses.length - 1) {
        call.end();
      }
    }, 500 * index);
  });
};

// 创建和启动服务器
function startServer() {
  const server = new grpc.Server();
  server.addService(hellogrpc.Greeter.service, {
    sayHello,
    sayHelloStreamReply,
  });

  server.bindAsync(
    '0.0.0.0:9090',
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error('Failed to bind server:', error);
        return;
      }
      server.start();
      console.log(`gRPC server listening on port ${port}`);
    }
  );
}

startServer();