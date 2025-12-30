const { encodeExample } = require('./src/encode');
const { decodeExample } = require('./src/decode');
const protobuf = require('protobufjs');
const path = require('path');

// 基本示例：展示Protocol Buffers的基本用法
async function basicExample() {
    try {
        console.log("\n===== Protocol Buffers 基本示例 =====");
        
        // 加载 .proto 文件
        const root = await protobuf.load(path.join(__dirname, 'proto', 'message.proto'));

        // 获取消息类型
        const Person = root.lookupType('tutorial.Person');

        // 创建一个 Person 消息实例
        const person = {
            name: "John Doe",
            age: 30,
            email: "john@example.com",
            phones: [
                { number: "123-456-7890", type: 0 }, // MOBILE
                { number: "987-654-3210", type: 1 }  // HOME
            ]
        };

        // 验证消息
        const errMsg = Person.verify(person);
        if (errMsg) throw Error(errMsg);

        // 创建消息实例
        const message = Person.create(person);
        console.log("\n原始消息对象:");
        console.log(message);

        // 编码消息为二进制格式
        const buffer = Person.encode(message).finish();
        console.log("\n编码后的二进制数据长度:", buffer.length, "字节");
        console.log("二进制数据:", buffer);

        // 解码二进制数据
        const decoded = Person.decode(buffer);
        console.log("\n解码后的消息对象:");
        console.log(decoded);

        // 转换为普通JavaScript对象
        const object = Person.toObject(decoded, {
            longs: String,
            enums: String,
            bytes: String,
        });
        console.log("\n转换为普通JavaScript对象:");
        console.log(object);

        return { success: true };
    } catch (error) {
        console.error("基本示例中发生错误:", error);
        return { success: false, error };
    }
}

// 运行所有示例
async function runAllExamples() {
    console.log("======================================");
    console.log("Protocol Buffers JavaScript 使用示例");
    console.log("======================================");
    
    try {
        // 运行基本示例
        await basicExample();
        
        console.log("\n\n======================================");
        
        // 运行编码示例
        const encodeResult = await encodeExample();
        
        console.log("\n\n======================================");
        
        // 运行解码示例
        const decodeResult = await decodeExample();
        
        console.log("\n\n======================================");
        console.log("所有示例执行完成!");
        console.log("======================================");
        
        // 总结
        console.log("\n===== 结果总结 =====");
        console.log(`Protocol Buffers大小: ${encodeResult.protobufSize} 字节`);
        console.log(`JSON大小: ${encodeResult.jsonSize} 字节`);
        console.log(`空间节省: ${(100 - (encodeResult.protobufSize / encodeResult.jsonSize * 100)).toFixed(2)}%`);
        console.log(`解码速度提升: ${(decodeResult.decodingTime.json / decodeResult.decodingTime.protobuf).toFixed(2)}倍`);
        
    } catch (error) {
        console.error("执行示例时发生错误:", error);
    }
}

// 运行示例
runAllExamples().catch(console.error);