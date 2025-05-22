const http2 = require('http2');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

// 读取SSL证书
const options = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'private-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'certificate.pem'))
};

// 创建HTTP/2安全服务器
const server = http2.createSecureServer(options);

// 处理错误
server.on('error', (err) => console.error('服务器错误:', err));

// 处理流错误
server.on('stream', (stream, headers) => {
  const method = headers[':method'];
  const path = headers[':path'];
  
  console.log(`收到请求: ${method} ${path}`);

  // 处理根路径请求
  if (path === '/' || path === '/index.html') {
    // 读取index.html文件
    const indexPath = path === '/' ? './public/index.html' : `./public${path}`;
    
    try {
      const data = fs.readFileSync(indexPath);
      
      // 设置响应头
      stream.respond({
        'content-type': 'text/html',
        ':status': 200
      });
      
      // 发送响应体
      stream.end(data);
      
      // 服务器推送CSS和JS文件
      if (path === '/' || path === '/index.html') {
        const cssPath = './public/style.css';
        const jsPath = './public/script.js';
        
        if (fs.existsSync(cssPath)) {
          const cssFile = fs.readFileSync(cssPath);
          const cssStream = stream.pushStream({ ':path': '/style.css' }, (err, pushStream) => {
            if (err) {
              console.error('推送CSS流错误:', err);
              return;
            }
            pushStream.respond({
              'content-type': 'text/css',
              ':status': 200
            });
            pushStream.end(cssFile);
          });
        }
        
        if (fs.existsSync(jsPath)) {
          const jsFile = fs.readFileSync(jsPath);
          const jsStream = stream.pushStream({ ':path': '/script.js' }, (err, pushStream) => {
            if (err) {
              console.error('推送JS流错误:', err);
              return;
            }
            pushStream.respond({
              'content-type': 'application/javascript',
              ':status': 200
            });
            pushStream.end(jsFile);
          });
        }
      }
    } catch (err) {
      console.error('读取文件错误:', err);
      stream.respond({ ':status': 500 });
      stream.end('服务器内部错误');
    }
  } 
  // 处理静态文件请求
  else if (path.startsWith('/')) {
    const filePath = `./public${path}`;
    
    try {
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        const contentType = mime.lookup(filePath) || 'application/octet-stream';
        
        stream.respond({
          'content-type': contentType,
          ':status': 200
        });
        stream.end(data);
      } else {
        stream.respond({ ':status': 404 });
        stream.end('文件未找到');
      }
    } catch (err) {
      console.error('读取文件错误:', err);
      stream.respond({ ':status': 500 });
      stream.end('服务器内部错误');
    }
  } else {
    stream.respond({ ':status': 404 });
    stream.end('页面未找到');
  }
});

// 启动服务器
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`HTTP/2服务器运行在 https://localhost:${PORT}`);
  console.log('注意: 由于使用自签名证书，浏览器可能会显示安全警告');
});