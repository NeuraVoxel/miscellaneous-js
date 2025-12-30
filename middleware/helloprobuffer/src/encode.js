const protobuf = require('protobufjs');
const path = require('path');
const fs = require('fs');

// 编码示例：将数据编码为二进制格式并保存到文件
async function encodeExample() {
    try {
        console.log("===== Protocol Buffers 编码示例 =====");
        
        // 加载 .proto 文件
        const root = await protobuf.load(path.join(__dirname, '..', 'proto', 'message.proto'));
        const Person = root.lookupType('tutorial.Person');
        const AddressBook = root.lookupType('tutorial.AddressBook');

        // 创建一个大型通讯录数据集用于演示
        const addressBook = {
            people: []
        };

        // 添加100个联系人
        for (let i = 0; i < 100; i++) {
            addressBook.people.push({
                name: `Person ${i}`,
                age: 20 + i % 50,
                email: `person${i}@example.com`,
                phones: [
                    { number: `123-456-${i.toString().padStart(4, '0')}`, type: i % 3 }
                ]
            });
        }

        // 验证通讯录
        const errMsg = AddressBook.verify(addressBook);
        if (errMsg) throw Error(errMsg);

        // 创建消息实例
        const message = AddressBook.create(addressBook);

        // 编码为二进制格式
        console.log("编码通讯录为Protocol Buffers二进制格式...");
        const buffer = AddressBook.encode(message).finish();
        
        // 保存到文件
        const binaryFile = path.join(__dirname, '..', 'addressbook.pb');
        fs.writeFileSync(binaryFile, buffer);
        console.log(`二进制数据已保存到文件: ${binaryFile}`);
        console.log(`Protocol Buffers二进制大小: ${buffer.length} 字节`);

        // 同时保存为JSON格式以便比较
        const jsonData = JSON.stringify(addressBook);
        const jsonFile = path.join(__dirname, '..', 'addressbook.json');
        fs.writeFileSync(jsonFile, jsonData);
        console.log(`JSON数据已保存到文件: ${jsonFile}`);
        console.log(`JSON大小: ${jsonData.length} 字节`);

        // 比较大小
        const ratio = (buffer.length / jsonData.length * 100).toFixed(2);
        console.log(`Protocol Buffers相比JSON的大小比例: ${ratio}%`);
        console.log(`节省了 ${(100 - parseFloat(ratio)).toFixed(2)}% 的空间`);

        return {
            protobufSize: buffer.length,
            jsonSize: jsonData.length,
            binaryFile,
            jsonFile
        };

    } catch (error) {
        console.error("编码过程中发生错误:", error);
        throw error;
    }
}

// 如果直接运行此文件
if (require.main === module) {
    encodeExample().catch(console.error);
}

module.exports = { encodeExample };