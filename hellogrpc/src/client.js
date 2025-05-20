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
const hellogrpc = protoDescriptor.hellogrpc;

// 创建客户端
function main() {
    // 获取命令行参数
    const name = process.argv[2] || 'World';
    
    // 创建gRPC客户端
    const client = new hellogrpc.Greeter(
        'localhost:50051',
        grpc.credentials.createInsecure()
    );

    console.log('Calling SayHello RPC...');
    
    // 调用简单RPC
    client.sayHello({ name: name }, (error, response) => {
        if (error) {
            console.error('Error:', error.message);
            return;
        }
        console.log('Server response:', response.message);
        
        // 调用流式RPC
        console.log('\nCalling SayHelloStreamReply RPC (streaming)...');
        const call = client.sayHelloStreamReply({ name: name });
        
        call.on('data', (response) => {
            console.log('Stream response:', response.message);
        });
        
        call.on('end', () => {
            console.log('Stream ended');
        });
        
        call.on('error', (error) => {
            console.error('Stream error:', error.message);
        });
    });
}

main();