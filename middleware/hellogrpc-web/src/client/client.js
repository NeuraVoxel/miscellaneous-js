const { GreeterClient } = require('./proto/greeter_grpc_web_pb.js');
const { HelloRequest } = require('./proto/greeter_pb.js');

// 创建gRPC-Web客户端实例
const client = new GreeterClient('http://localhost:8080');

// 获取DOM元素
const nameInput = document.getElementById('name');
const sayHelloButton = document.getElementById('sayHello');
const sayHelloStreamButton = document.getElementById('sayHelloStream');
const unaryResponse = document.getElementById('unaryResponse');
const streamResponse = document.getElementById('streamResponse');

// 一元调用示例
sayHelloButton.addEventListener('click', () => {
  const request = new HelloRequest();
  request.setName(nameInput.value || 'World');

  unaryResponse.textContent = 'Loading...';

  client.sayHello(request, {}, (err, response) => {
    if (err) {
      unaryResponse.textContent = `Error: ${err.message}`;
      console.error('Error:', err);
      return;
    }

    unaryResponse.textContent = response.getMessage();
  });
});

// 服务器流式调用示例
sayHelloStreamButton.addEventListener('click', () => {
  const request = new HelloRequest();
  request.setName(nameInput.value || 'World');

  streamResponse.textContent = 'Waiting for stream responses...';

  const stream = client.sayHelloStreamReply(request, {});
  let responses = [];

  stream.on('data', (response) => {
    responses.push(response.getMessage());
    streamResponse.innerHTML = responses
      .map(msg => `<div class="message">${msg}</div>`)
      .join('');
  });

  stream.on('error', (err) => {
    streamResponse.innerHTML += `<div class="message error">Error: ${err.message}</div>`;
    console.error('Stream error:', err);
  });

  stream.on('end', () => {
    if (responses.length === 0) {
      streamResponse.textContent = 'Stream ended without any messages.';
    }
  });
});

// 添加一些基本的错误处理
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// 在页面加载时添加一些说明
window.addEventListener('load', () => {
  unaryResponse.textContent = 'Enter a name and click "Say Hello" to receive a greeting.';
  streamResponse.textContent = 'Click "Say Hello Stream" to receive multiple greetings.';
});