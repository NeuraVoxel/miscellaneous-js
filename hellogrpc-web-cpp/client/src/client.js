// 导入生成的 proto 文件
// 注意：这些文件需要通过运行 npm run generate 命令生成
const { HelloRequest } = require('./proto/greeter_pb.js');
const { GreeterClient } = require('./proto/greeter_grpc_web_pb.js');

// 创建 gRPC 客户端，连接到 Envoy 代理
const client = new GreeterClient('http://localhost:8080');

// 显示消息到响应区域
function displayMessage(message, isError = false) {
  const responseDiv = document.getElementById('response');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  if (isError) {
    messageElement.classList.add('error');
  }
  messageElement.textContent = message;
  responseDiv.appendChild(messageElement);
  responseDiv.scrollTop = responseDiv.scrollHeight;
}

// 清除响应区域
function clearResponse() {
  document.getElementById('response').innerHTML = '';
}

// 发送一元请求
window.sendUnaryRequest = function() {
  const name = document.getElementById('name').value || 'World';
  const request = new HelloRequest();
  request.setName(name);

  clearResponse();
  displayMessage(`Sending unary request for: ${name}`);

  client.sayHello(request, {}, (err, response) => {
    if (err) {
      console.error('Error:', err);
      displayMessage(`Error: ${err.message}`, true);
      return;
    }

    displayMessage(`Response: ${response.getMessage()}`);
  });
};

// 处理流式响应
let streamCall = null;

window.startStreaming = function() {
  const streamButton = document.getElementById('streamButton');
  
  // 如果已经在流式传输，则停止
  if (streamCall) {
    streamCall.cancel();
    streamCall = null;
    streamButton.textContent = 'Start Streaming';
    return;
  }

  const name = document.getElementById('name').value || 'World';
  const request = new HelloRequest();
  request.setName(name);

  clearResponse();
  displayMessage(`Starting stream for: ${name}`);
  streamButton.textContent = 'Stop Streaming';

  streamCall = client.sayHelloStreamReply(request, {});

  streamCall.on('data', (response) => {
    displayMessage(`Stream response: ${response.getMessage()}`);
  });

  streamCall.on('error', (err) => {
    console.error('Stream error:', err);
    displayMessage(`Stream error: ${err.message}`, true);
    streamButton.textContent = 'Start Streaming';
    streamCall = null;
  });

  streamCall.on('end', () => {
    displayMessage('Stream ended');
    streamButton.textContent = 'Start Streaming';
    streamCall = null;
  });
};

// 初始化消息
document.addEventListener('DOMContentLoaded', () => {
  displayMessage('Ready to send requests. Enter your name and click a button.');
});