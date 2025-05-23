import * as protobuf from 'protobufjs';
import * as fs from 'fs';
import * as path from 'path';
import { tutorial } from '../generated/user';

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

main().catch(console.error);