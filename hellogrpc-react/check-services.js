#!/usr/bin/env node

const http = require('http');
const net = require('net');
const { exec } = require('child_process');

// 颜色代码
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// 打印彩色消息
function printColored(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 打印标题
function printHeader(title) {
  console.log('\n' + '='.repeat(50));
  printColored('cyan', `  ${title}`);
  console.log('='.repeat(50));
}

// 检查端口是否开放
function checkPort(host, port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    
    socket.setTimeout(2000);
    
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    
    socket.on('error', () => {
      socket.destroy();
      resolve(false);
    });
    
    socket.connect(port, host);
  });
}

// 检查HTTP端点
function checkHttpEndpoint(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: data.substring(0, 100) // 只显示前100个字符
        });
      });
    }).on('error', (err) => {
      resolve({
        error: err.message
      });
    });
  });
}

// 检查Docker容器状态
function checkDockerContainers() {
  return new Promise((resolve) => {
    exec('docker ps', (error, stdout, stderr) => {
      if (error) {
        resolve({
          error: `执行命令失败: ${error.message}`
        });
        return;
      }
      
      if (stderr) {
        resolve({
          error: stderr
        });
        return;
      }
      
      resolve({
        output: stdout
      });
    });
  });
}

// 主函数
async function main() {
  printHeader('gRPC-Web 服务检查工具');
  
  // 检查后端gRPC服务
  printColored('yellow', '\n[1/3] 检查后端gRPC服务 (端口 50051)...');
  const backendAvailable = await checkPort('localhost', 50051);
  
  if (backendAvailable) {
    printColored('green', '✓ 后端gRPC服务正在运行');
  } else {
    printColored('red', '✗ 后端gRPC服务未运行');
    printColored('yellow', '  提示: 在backend目录中运行 "npm start" 启动服务');
  }
  
  // 检查Envoy代理
  printColored('yellow', '\n[2/3] 检查Envoy代理 (端口 8080 和 9901)...');
  const envoyDataPlaneAvailable = await checkPort('localhost', 8080);
  const envoyAdminAvailable = await checkPort('localhost', 9901);
  
  if (envoyDataPlaneAvailable && envoyAdminAvailable) {
    printColored('green', '✓ Envoy代理正在运行');
    
    // 检查Envoy管理接口
    try {
      const adminResponse = await checkHttpEndpoint('http://localhost:9901/server_info');
      printColored('green', '  Envoy管理接口可访问');
    } catch (error) {
      printColored('yellow', '  Envoy管理接口不可访问');
    }
  } else {
    printColored('red', '✗ Envoy代理未完全运行');
    if (!envoyDataPlaneAvailable) {
      printColored('red', '  - 数据平面端口 (8080) 未开放');
    }
    if (!envoyAdminAvailable) {
      printColored('red', '  - 管理端口 (9901) 未开放');
    }
    printColored('yellow', '  提示: 运行 "docker-compose up -d" 启动Envoy代理');
  }
  
  // 检查Docker容器
  printColored('yellow', '\n[3/3] 检查Docker容器状态...');
  const dockerResult = await checkDockerContainers();
  
  if (dockerResult.error) {
    printColored('red', `✗ 无法获取Docker容器状态: ${dockerResult.error}`);
  } else {
    if (dockerResult.output.includes('envoy')) {
      printColored('green', '✓ Envoy Docker容器正在运行');
      console.log(dockerResult.output);
    } else {
      printColored('red', '✗ 未找到运行中的Envoy容器');
      printColored('yellow', '  提示: 运行 "docker-compose up -d" 启动容器');
    }
  }
  
  // 总结
  printHeader('诊断总结');
  
  if (backendAvailable && envoyDataPlaneAvailable) {
    printColored('green', '所有服务都在运行中。如果仍然遇到503错误，请检查:');
    console.log('1. 前端应用是否正确配置了gRPC-Web客户端');
    console.log('2. Envoy配置是否正确 (检查envoy.yaml)');
    console.log('3. 浏览器控制台是否有其他错误');
    console.log('4. 网络连接是否有问题 (防火墙、代理等)');
  } else {
    printColored('red', '检测到服务问题。请按照以下步骤解决:');
    
    if (!backendAvailable) {
      console.log('1. 启动后端服务:');
      console.log('   cd backend');
      console.log('   npm install');
      console.log('   npm start');
    }
    
    if (!envoyDataPlaneAvailable) {
      console.log(`${backendAvailable ? '1' : '2'}. 启动Envoy代理:`);
      console.log('   docker-compose up -d');
      console.log('   如果出现错误，尝试: docker-compose down && docker-compose up -d');
    }
  }
  
  console.log('\n如果问题仍然存在，请检查日志:');
  console.log('- 后端日志: 运行后端服务的终端');
  console.log('- Envoy日志: docker-compose logs envoy');
}

// 运行主函数
main().catch(error => {
  console.error('检查过程中出错:', error);
  process.exit(1);
});