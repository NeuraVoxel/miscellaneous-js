import React, { useState, useEffect } from 'react';
import * as protobuf from 'protobufjs';
import './App.css';

// 导入JSON定义文件
import userJson from './proto/user.json';
import awesomeJson from './proto/awesome.json';

interface UserData {
  id: string;
  name: string;
  age: number;
  email: string;
  role: string;
  hobbies: string[];
}

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    id: '1001',
    name: '张三',
    age: 30,
    email: 'zhangsan@example.com',
    role: 'ADMIN',
    hobbies: ['读书', '游泳']
  });
  
  const [awesomeField, setAwesomeField] = useState<string>('AwesomeString');
  
  const [encodedUser, setEncodedUser] = useState<Uint8Array | null>(null);
  const [decodedUser, setDecodedUser] = useState<any>(null);
  
  const [encodedAwesome, setEncodedAwesome] = useState<Uint8Array | null>(null);
  const [decodedAwesome, setDecodedAwesome] = useState<any>(null);
  
  const [activeTab, setActiveTab] = useState<'user' | 'awesome'>('user');
  
  const [error, setError] = useState<string | null>(null);

  // 处理用户数据变化
  const handleUserChange = (field: keyof UserData, value: any) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 处理爱好变化
  const handleHobbyChange = (index: number, value: string) => {
    const newHobbies = [...userData.hobbies];
    newHobbies[index] = value;
    setUserData(prev => ({
      ...prev,
      hobbies: newHobbies
    }));
  };

  // 添加爱好
  const addHobby = () => {
    setUserData(prev => ({
      ...prev,
      hobbies: [...prev.hobbies, '']
    }));
  };

  // 删除爱好
  const removeHobby = (index: number) => {
    const newHobbies = [...userData.hobbies];
    newHobbies.splice(index, 1);
    setUserData(prev => ({
      ...prev,
      hobbies: newHobbies
    }));
  };

  // 处理用户数据的编码和解码
  const processUserData = () => {
    try {
      setError(null);
      
      // 从JSON创建Root
      const root = protobuf.Root.fromJSON(userJson);
      
      // 获取User类型
      const User = root.lookupType("tutorial.User");
      
      // 验证数据
      const errMsg = User.verify(userData);
      if (errMsg) {
        throw Error(errMsg);
      }
      
      // 创建消息实例
      const message = User.create(userData);
      
      // 编码为二进制
      const buffer = User.encode(message).finish();
      setEncodedUser(buffer);
      
      // 解码二进制
      const decoded = User.decode(buffer);
      setDecodedUser(decoded);
      
    } catch (err: any) {
      setError(err.message);
      console.error('处理用户数据时出错:', err);
    }
  };

  // 处理Awesome数据的编码和解码
  const processAwesomeData = () => {
    try {
      setError(null);
      
      // 从JSON创建Root
      const root = protobuf.Root.fromJSON(awesomeJson);
      
      // 获取AwesomeMessage类型
      const AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");
      
      // 创建payload
      const payload = { awesomeField };
      
      // 验证数据
      const errMsg = AwesomeMessage.verify(payload);
      if (errMsg) {
        throw Error(errMsg);
      }
      
      // 创建消息实例
      const message = AwesomeMessage.create(payload);
      
      // 编码为二进制
      const buffer = AwesomeMessage.encode(message).finish();
      setEncodedAwesome(buffer);
      
      // 解码二进制
      const decoded = AwesomeMessage.decode(buffer);
      setDecodedAwesome(decoded);
      
    } catch (err: any) {
      setError(err.message);
      console.error('处理Awesome数据时出错:', err);
    }
  };

  // 当用户数据变化时自动处理
  useEffect(() => {
    if (activeTab === 'user') {
      processUserData();
    }
  }, [userData, activeTab]);

  // 当Awesome字段变化时自动处理
  useEffect(() => {
    if (activeTab === 'awesome') {
      processAwesomeData();
    }
  }, [awesomeField, activeTab]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>HelloProto FromJSON Web</h1>
        <p>Protocol Buffers in the Browser</p>
      </header>

      <div className="tabs">
        <button 
          className={activeTab === 'user' ? 'active' : ''} 
          onClick={() => setActiveTab('user')}
        >
          User Example
        </button>
        <button 
          className={activeTab === 'awesome' ? 'active' : ''} 
          onClick={() => setActiveTab('awesome')}
        >
          Awesome Example
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}

      <div className="content-container">
        {activeTab === 'user' ? (
          <div className="user-container">
            <div className="input-section">
              <h2>User Input</h2>
              <div className="form-group">
                <label>ID:</label>
                <input 
                  type="text" 
                  value={userData.id} 
                  onChange={(e) => handleUserChange('id', e.target.value)} 
                />
              </div>
              
              <div className="form-group">
                <label>Name:</label>
                <input 
                  type="text" 
                  value={userData.name} 
                  onChange={(e) => handleUserChange('name', e.target.value)} 
                />
              </div>
              
              <div className="form-group">
                <label>Age:</label>
                <input 
                  type="number" 
                  value={userData.age} 
                  onChange={(e) => handleUserChange('age', parseInt(e.target.value) || 0)} 
                />
              </div>
              
              <div className="form-group">
                <label>Email:</label>
                <input 
                  type="email" 
                  value={userData.email} 
                  onChange={(e) => handleUserChange('email', e.target.value)} 
                />
              </div>
              
              <div className="form-group">
                <label>Role:</label>
                <select 
                  value={userData.role} 
                  onChange={(e) => handleUserChange('role', e.target.value)}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="GUEST">GUEST</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Hobbies:</label>
                {userData.hobbies.map((hobby, index) => (
                  <div key={index} className="hobby-input">
                    <input 
                      type="text" 
                      value={hobby} 
                      onChange={(e) => handleHobbyChange(index, e.target.value)} 
                    />
                    <button type="button" onClick={() => removeHobby(index)}>-</button>
                  </div>
                ))}
                <button type="button" onClick={addHobby} className="add-button">+ Add Hobby</button>
              </div>
            </div>
            
            <div className="output-section">
              <h2>Protocol Buffer Output</h2>
              
              <div className="output-group">
                <h3>Encoded Binary:</h3>
                <div className="binary-output">
                  {encodedUser ? Array.from(encodedUser).join(', ') : 'No data'}
                </div>
              </div>
              
              <div className="output-group">
                <h3>Decoded Object:</h3>
                <pre>{decodedUser ? JSON.stringify(decodedUser, null, 2) : 'No data'}</pre>
              </div>
            </div>
          </div>
        ) : (
          <div className="awesome-container">
            <div className="input-section">
              <h2>Awesome Input</h2>
              <div className="form-group">
                <label>Awesome Field:</label>
                <input 
                  type="text" 
                  value={awesomeField} 
                  onChange={(e) => setAwesomeField(e.target.value)} 
                />
              </div>
              
              <button onClick={processAwesomeData} className="process-button">Process Data</button>
            </div>
            
            <div className="output-section">
              <h2>Protocol Buffer Output</h2>
              
              <div className="output-group">
                <h3>Encoded Binary:</h3>
                <div className="binary-output">
                  {encodedAwesome ? Array.from(encodedAwesome).join(', ') : 'No data'}
                </div>
              </div>
              
              <div className="output-group">
                <h3>Decoded Object:</h3>
                <pre>{decodedAwesome ? JSON.stringify(decodedAwesome, null, 2) : 'No data'}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;