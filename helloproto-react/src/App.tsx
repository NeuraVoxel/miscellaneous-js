import React, { useEffect, useState } from 'react';
import './App.css';
import { ProtoLoader, createSampleUser, createSampleUserList, IUser, IUserList } from './proto/protoUtils';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [originalUser, setOriginalUser] = useState<IUser | null>(null);
  const [serializedUser, setSerializedUser] = useState<Uint8Array | null>(null);
  const [deserializedUser, setDeserializedUser] = useState<IUser | null>(null);
  const [originalUserList, setOriginalUserList] = useState<IUserList | null>(null);
  const [serializedUserList, setSerializedUserList] = useState<Uint8Array | null>(null);
  const [deserializedUserList, setDeserializedUserList] = useState<IUserList | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initProto = async () => {
      try {
        const protoLoader = ProtoLoader.getInstance();
        await protoLoader.load();
        setIsLoaded(true);

        // 创建示例数据
        const user = createSampleUser();
        setOriginalUser(user);

        const userList = createSampleUserList();
        setOriginalUserList(userList);

        // 序列化
        const userBuffer = protoLoader.serialize('tutorial.User', user);
        setSerializedUser(userBuffer);

        const userListBuffer = protoLoader.serialize('tutorial.UserList', userList);
        setSerializedUserList(userListBuffer);

        // 反序列化
        const decodedUser = protoLoader.deserialize<IUser>('tutorial.User', userBuffer);
        setDeserializedUser(decodedUser);

        const decodedUserList = protoLoader.deserialize<IUserList>('tutorial.UserList', userListBuffer);
        setDeserializedUserList(decodedUserList);
      } catch (err) {
        console.error('Error initializing protobuf:', err);
        setError(err instanceof Error ? err.message : String(err));
      }
    };

    initProto();
  }, []);

  // 将Uint8Array转换为可读字符串
  const bufferToString = (buffer: Uint8Array | null): string => {
    if (!buffer) return 'No data';
    return Array.from(buffer)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join(' ');
  };

  // 计算序列化后的大小
  const getSerializedSize = (buffer: Uint8Array | null): string => {
    if (!buffer) return '0 bytes';
    return `${buffer.length} bytes`;
  };

  if (error) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Error Loading Protobuf</h1>
          <p>{error}</p>
        </header>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="App">
        <header className="App-header">
          <p>Loading protobuf...</p>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Protobuf.js with React & TypeScript</h1>
      </header>
      <main className="App-content">
        <section className="proto-demo">
          <h2>Single User Example</h2>
          <div className="proto-container">
            <div className="proto-column">
              <h3>Original Data</h3>
              <pre>{JSON.stringify(originalUser, null, 2)}</pre>
            </div>
            <div className="proto-column">
              <h3>Serialized Data</h3>
              <p>Size: {getSerializedSize(serializedUser)}</p>
              <pre className="serialized">{bufferToString(serializedUser)}</pre>
            </div>
            <div className="proto-column">
              <h3>Deserialized Data</h3>
              <pre>{JSON.stringify(deserializedUser, null, 2)}</pre>
            </div>
          </div>
        </section>

        <section className="proto-demo">
          <h2>User List Example</h2>
          <div className="proto-container">
            <div className="proto-column">
              <h3>Original Data</h3>
              <pre>{JSON.stringify(originalUserList, null, 2)}</pre>
            </div>
            <div className="proto-column">
              <h3>Serialized Data</h3>
              <p>Size: {getSerializedSize(serializedUserList)}</p>
              <pre className="serialized">{bufferToString(serializedUserList)}</pre>
            </div>
            <div className="proto-column">
              <h3>Deserialized Data</h3>
              <pre>{JSON.stringify(deserializedUserList, null, 2)}</pre>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;