import * as protobuf from 'protobufjs';
import * as fs from 'fs';
import * as path from 'path';
import { tutorial } from '../generated/user';

import awesomeJson from '../generated/awesome.json'// exemplary for node


async function main() {
    try {
        // 读取生成的 JSON 文件
        const jsonContent = fs.readFileSync(
            path.join(__dirname, '../generated/user.json'),
            'utf8'
        );

        // 从 JSON 创建 Root
        const root = protobuf.Root.fromJSON(JSON.parse(jsonContent));

        console.log('Root:', root);
        console.log('tutorial:', tutorial);

        // 创建一个用户实例
        const payload: tutorial.IUser = {
            id: '1001',
            name: '张三',
            age: 30,
            email: 'zhangsan@example.com',
            role: tutorial.Role.ADMIN,
            hobbies: ['读书', '游泳']
        };

        // 验证数据
        const errMsg = tutorial.User.verify(payload);
        if (errMsg) throw Error(errMsg);

        // 创建消息实例
        const message = tutorial.User.create(payload);
        console.log('创建的消息实例:', message);

        // 编码为二进制
        const buffer = tutorial.User.encode(message).finish();
        console.log('编码后的二进制数据:', buffer);

        // 解码二进制
        const decoded = tutorial.User.decode(buffer);
        console.log('解码后的消息:', decoded);

        // 转换为普通对象
        const object = tutorial.User.toObject(decoded, {
            longs: String,
            enums: String,
            bytes: String,
        });
        console.log('转换为普通对象:', object);

    } catch (error) {
        console.error('发生错误:', error);
    }
}


function testawesomeproto() {
    console.log('testawesomeproto');
    protobuf.load("./proto/awesome.proto", function (err, root) {
        if (err)
            throw err;

        if (!root) return;

        // Obtain a message type
        var AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");

        console.log(root);

        console.log(AwesomeMessage);

        // Exemplary payload
        var payload = { awesomeField: "AwesomeString" };

        // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
        var errMsg = AwesomeMessage.verify(payload);
        if (errMsg)
            throw Error(errMsg);

        // Create a new message
        var message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary

        // Encode a message to an Uint8Array (browser) or Buffer (node)
        var buffer = AwesomeMessage.encode(message).finish();
        // ... do something with buffer

        // Decode an Uint8Array (browser) or Buffer (node) to a message
        var message = AwesomeMessage.decode(buffer);
        // ... do something with message

        // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.

        // Maybe convert the message back to a plain object
        var object = AwesomeMessage.toObject(message, {
            longs: String,
            enums: String,
            bytes: String,
            // see ConversionOptions
        });
    });

}

function testawesomeprotoJson() {
    console.log('testawesomeprotoJson');


    var root = protobuf.Root.fromJSON(awesomeJson);

    console.log(root);

    // example code
    const AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");

    let message = AwesomeMessage.create({ awesomeField: "hello" });
    console.log(`message = ${JSON.stringify(message)}`);

    let buffer = AwesomeMessage.encode(message).finish();
    console.log(`buffer = ${Array.prototype.toString.call(buffer)}`);

    let decoded = AwesomeMessage.decode(buffer);
    console.log(`decoded = ${JSON.stringify(decoded)}`);

}

main().catch(console.error);
testawesomeproto();
testawesomeprotoJson();