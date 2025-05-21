const protobuf = require('protobufjs');
const path = require('path');
const fs = require('fs');

// 解码示例：从文件读取二进制数据并解码
async function decodeExample() {
    try {
        console.log("===== Protocol Buffers 解码示例 =====");

        // 加载 .proto 文件
        const root = await protobuf.load(path.join(__dirname, '..', 'proto', 'message.proto'));
        const AddressBook = root.lookupType('tutorial.AddressBook');

        // 读取二进制文件
        const binaryFile = path.join(__dirname, '..', 'addressbook.pb');
        const buffer = fs.readFileSync(binaryFile);
        console.log(`读取Protocol Buffers二进制文件: ${binaryFile}`);

        // 读取JSON文件（用于比较）
        const jsonFile = path.join(__dirname, '..', 'addressbook.json');
        const jsonData = fs.readFileSync(jsonFile, 'utf8');
        console.log(`读取JSON文件: ${jsonFile}`);

        // 性能测试：Protocol Buffers解码
        console.log("\n执行性能测试...");
        const protoStart = process.hrtime.bigint();
        const decoded = AddressBook.decode(buffer);
        const protoEnd = process.hrtime.bigint();
        const protoTime = Number(protoEnd - protoStart) / 1_000_000; // 转换为毫秒

        // 性能测试：JSON解析
        const jsonStart = process.hrtime.bigint();
        const jsonParsed = JSON.parse(jsonData);
        const jsonEnd = process.hrtime.bigint();
        const jsonTime = Number(jsonEnd - jsonStart) / 1_000_000; // 转换为毫秒

        // 输出性能比较结果
        console.log("\n===== 性能比较 =====");
        console.log(`Protocol Buffers解码时间: ${protoTime.toFixed(3)} ms`);
        console.log(`JSON解析时间: ${jsonTime.toFixed(3)} ms`);
        console.log(`性能比例: Protocol Buffers解码速度是JSON的 ${(jsonTime/protoTime).toFixed(2)} 倍`);

        // 验证数据完整性
        console.log("\n===== 数据完整性验证 =====");
        const object = AddressBook.toObject(decoded, {
            longs: String,
            enums: String,
            bytes: String,
        });

        // 检查第一个和最后一个联系人
        console.log("\n第一个联系人:");
        console.log(object.people[0]);
        console.log("\n最后一个联系人:");
        console.log(object.people[object.people.length - 1]);
        console.log(`\n总联系人数: ${object.people.length}`);

        // 数据访问示例
        console.log("\n===== 数据访问示例 =====");
        console.log("遍历前5个联系人的姓名和电话:");
        for (let i = 0; i < 5 && i < object.people.length; i++) {
            const person = object.people[i];
            console.log(`${person.name}: ${person.phones.map(p => p.number).join(', ')}`);
        }

        return {
            decodingTime: {
                protobuf: protoTime,
                json: jsonTime
            },
            contactCount: object.people.length
        };

    } catch (error) {
        console.error("解码过程中发生错误:", error);
        throw error;
    }
}

// 如果直接运行此文件
if (require.main === module) {
    decodeExample().catch(console.error);
}

module.exports = { decodeExample };