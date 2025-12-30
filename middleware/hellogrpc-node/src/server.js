const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// 加载proto文件
const PROTO_PATH = path.join(__dirname, '../proto/greeter.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

console.log('protoDescriptor:', protoDescriptor);

const hellogrpc = protoDescriptor.hellogrpc;

// 实现服务方法
const sayHello = (call, callback) => {
    console.log('Received request from:', call.request.name);
    callback(null, { message: `Hello, ${call.request.name}!` });
};

const sayHelloStreamReply = (call) => {
    const name = call.request.name;
    console.log('Received streaming request from:', name);
    
    // 发送多次问候
    const greetings = [
        'Hello',
        'Bonjour',
        'Hola',
        'Ciao',
        '你好'
    ];

    greetings.forEach((greeting, index) => {
        setTimeout(() => {
            call.write({ message: `${greeting}, ${name}!` });
            if (index === greetings.length - 1) {
                call.end();
            }
        }, index * 1000); // 每秒发送一次问候
    });
};

// 创建和启动服务器
function main() {
    const server = new grpc.Server();
    server.addService(hellogrpc.Greeter.service, {
        sayHello: sayHello,
        sayHelloStreamReply: sayHelloStreamReply
    });

    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
        if (error) {
            console.error('Failed to bind server:', error);
            return;
        }
        server.start();
        console.log(`Server running at http://0.0.0.0:${port}`);
    });
}

main();