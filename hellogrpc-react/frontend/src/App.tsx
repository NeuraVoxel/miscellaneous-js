import React, { useState, useEffect, useCallback } from 'react';
import { HelloRequest, HelloResponse, StreamRequest, StreamResponse } from './proto/hello_pb';
import { HelloServiceClient } from './proto/Hello_grpc_web_pb';

// 创建gRPC客户端实例，使用HTTPS
const client = new HelloServiceClient('https://localhost:8080', null, {
  // 开发环境中禁用证书验证
  'transport': 'grpc-web-text',
  'debug': true
});

function App() {
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [streamMessages, setStreamMessages] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  // 处理一元RPC调用
  const handleSayHello = useCallback(async () => {
    const request = new HelloRequest();
    request.setName(name || 'World');

    try {
      client.sayHello(request, {}, (err: any, response: HelloResponse) => {
        if (err) {
          console.error('Error:', err);
          setMessage('Error: ' + err.message);
          return;
        }
        setMessage(response.getMessage());
      });
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error: ' + (error as Error).message);
    }
  }, [name]);

  // 处理服务器流式RPC调用
  const handleStartStream = useCallback(() => {
    setIsStreaming(true);
    setStreamMessages([]);

    const request = new StreamRequest();
    request.setQuery('stream-test');

    try {
      const stream = client.getServerStream(request, {});

      stream.on('data', (response: StreamResponse) => {
        setStreamMessages(prev => [...prev, response.getResult()]);
      });

      stream.on('end', () => {
        setIsStreaming(false);
        setStreamMessages(prev => [...prev, '流结束']);
      });

      stream.on('error', (err: Error) => {
        console.error('Stream error:', err);
        setStreamMessages(prev => [...prev, 'Error: ' + err.message]);
        setIsStreaming(false);
      });
    } catch (error) {
      console.error('Error:', error);
      setStreamMessages(prev => [...prev, 'Error: ' + (error as Error).message]);
      setIsStreaming(false);
    }
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>gRPC-Web React Demo</h1>

      <div style={styles.section}>
        <h2>一元 RPC 示例</h2>
        <div style={styles.inputGroup}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="输入你的名字"
            style={styles.input}
          />
          <button onClick={handleSayHello} style={styles.button}>
            发送请求
          </button>
        </div>
        {message && <div style={styles.response}>{message}</div>}
      </div>

      <div style={styles.section}>
        <h2>服务器流式 RPC 示例</h2>
        <button
          onClick={handleStartStream}
          disabled={isStreaming}
          style={styles.button}
        >
          {isStreaming ? '接收中...' : '开始接收流'}
        </button>
        <div style={styles.streamContainer}>
          {streamMessages.map((msg, index) => (
            <div key={index} style={styles.streamMessage}>
              {msg}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <h2>连接状态</h2>
        <div style={styles.statusInfo}>
          <p>gRPC服务器: localhost:50051</p>
          <p>Envoy代理: localhost:8080</p>
          <p>如果看到503错误，请确保：</p>
          <ul>
            <li>后端gRPC服务器正在运行 (npm start in backend/)</li>
            <li>Envoy代理正在运行 (docker-compose up)</li>
            <li>所有端口未被其他程序占用</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// 样式
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center' as const,
    color: '#333',
    marginBottom: '30px',
  },
  section: {
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
  inputGroup: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
  },
  input: {
    flex: '1',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '8px 16px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#0056b3',
    },
    ':disabled': {
      backgroundColor: '#ccc',
    },
  },
  response: {
    marginTop: '15px',
    padding: '10px',
    backgroundColor: '#e9ecef',
    borderRadius: '4px',
  },
  streamContainer: {
    marginTop: '15px',
    maxHeight: '300px',
    overflowY: 'auto' as const,
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  streamMessage: {
    padding: '8px',
    borderBottom: '1px solid #eee',
  },
  statusInfo: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  }
};

export default App;