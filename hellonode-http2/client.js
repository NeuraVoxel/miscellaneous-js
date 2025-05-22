const http2 = require('http2');
const fs = require('fs');
const path = require('path');

// 创建客户端会话
const client = http2.connect('https://localhost:3000', {
  // 在开发环境中禁用证书验证（仅用于测试）
  rejectUnauthorized: false
});

// 处理客户端错误
client.on('error', (err) => console.error('客户端错误:', err));

// 创建请求
const req = client.request({ ':path': '/' });

// 处理响应数据
req.on('response', (headers) => {
  console.log('状态码:', headers[':status']);
  console.log('响应头:', headers);
});

// 接收推送的流
client.on('stream', (pushedStream, requestHeaders) => {
  console.log('收到服务器推送:', requestHeaders[':path']);
  
  pushedStream.on('push', (responseHeaders) => {
    console.log('推送响应头:', responseHeaders);
  });
  
  // 处理推送的数据
  pushedStream.on('data', (chunk) => {
    console.log(`收到推送数据: ${requestHeaders[':path']}`);
  });
});

// 处理数据
let data = '';
req.on('data', (chunk) => {
  data += chunk;
});

// 处理请求结束
req.on('end', () => {
  console.log('响应数据:', data);
  // 关闭客户端会话
  client.close(() => {
    console.log('客户端会话已关闭');
  });
});

// 结束请求
req.end();