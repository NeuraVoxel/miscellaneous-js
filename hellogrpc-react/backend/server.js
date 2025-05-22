const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// 加载proto文件
const PROTO_PATH = path.resolve(__dirname, '../proto/hello.proto');

// 配置proto加载器
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

// 加载gRPC包定义
const helloProto = grpc.loadPackageDefinition(packageDefinition).hello;

// 日志函数
function log(message, ...args) {
  console.log(`[${new Date().toISOString()}] ${message}`, ...args);
}

/**
 * 实现SayHello RPC方法
 */
function sayHello(call, callback) {
  log('Received sayHello request:', call.request);
  
  try {
    const name = call.request.name || 'World';
    
    // 创建响应
    const response = {
      message: `Hello, ${name}! Welcome to gRPC.`,
      status: 200
    };
    
    log('Sending response:', response);
    
    // 发送响应
    callback(null, response);
  } catch (error) {
    log('Error in sayHello:', error);
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal server error'
    });
  }
}

/**
 * 实现GetServerStream RPC方法
 */
function getServerStream(call) {
  const query = call.request.query || 'default';
  log('Received stream request with query:', query);
  
  let count = 0;
  const maxMessages = 5;
  const interval = setInterval(() => {
    try {
      if (count >= maxMessages) {
        log('Stream completed successfully');
        clearInterval(interval);
        call.end();
        return;
      }

      // 创建并发送响应
      const response = {
        result: `Stream response #${count + 1} for query: ${query}`,
        count: count + 1
      };
      
      log('Sending stream response:', response);
      call.write(response);
      count++;
      
    } catch (error) {
      log('Error in stream:', error);
      clearInterval(interval);
      call.emit('error', {
        code: grpc.status.INTERNAL,
        details: 'Stream processing error'
      });
      call.end();
    }
  }, 1000);
  
  // 处理取消
  call.on('cancelled', () => {
    log('Stream was cancelled by client');
    clearInterval(interval);
  });

  // 处理结束
  call.on('end', () => {
    log('Stream ended by client');
    clearInterval(interval);
  });

  // 处理错误
  call.on('error', (error) => {
    log('Stream error:', error);
    clearInterval(interval);
  });
}

/**
 * 启动gRPC服务器
 */
function startServer() {
  const server = new grpc.Server();
  
  // 添加服务实现
  server.addService(helloProto.HelloService.service, {
    sayHello: sayHello,
    getServerStream: getServerStream
  });
  
  // 绑定地址和端口
  const port = process.env.PORT || 50051;
  const host = '0.0.0.0';
  const serverAddress = `${host}:${port}`;

  server.bindAsync(
    serverAddress,
    grpc.ServerCredentials.createInsecure(),
    (err, boundPort) => {
      if (err) {
        log('Failed to bind server:', err);
        process.exit(1);
      }
      
      server.start();
      log(`Server running at ${serverAddress}`);
      log('Server is ready to accept connections');
    }
  );
  
  // 优雅关闭
  const shutdown = (signal) => {
    log(`Received ${signal}. Shutting down gRPC server...`);
    server.tryShutdown(() => {
      log('Server shut down successfully');
      process.exit(0);
    });
  };
  
  // 监听终止信号
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  
  // 处理未捕获的异常
  process.on('uncaughtException', (err) => {
    log('Uncaught Exception:', err);
    shutdown('UNCAUGHT_EXCEPTION');
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    log('Unhandled Rejection at:', promise, 'reason:', reason);
    shutdown('UNHANDLED_REJECTION');
  });
}

// 启动服务器
startServer();