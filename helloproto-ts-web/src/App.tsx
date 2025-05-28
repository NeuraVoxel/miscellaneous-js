import React, { useState } from 'react';
import './App.css';
import { user, message } from './generated/src/proto/bundle';
import {message as message2} from './generated/src/proto/message';

function App() {
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    age: 0,
    email: '',
    role: user.Role.USER,
    hobbies: ['']
  });

  const [messageData, setMessageData] = useState({
    awesomeField: '',
    count: 0,
    isActive: false
  });

  console.log(message2);
  
  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create a new User message
    const userMessage = user.User.create(userData);
    // Encode the message
    const encodedUser = user.User.encode(userMessage).finish();
    // Decode the message (in a real app, this would be received from a server)
    const decodedUser = user.User.decode(encodedUser);
    console.log('Encoded and decoded user:', decodedUser);
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create a new AwesomeMessage
    const awesomeMessage = message.AwesomeMessage.create(messageData);
    // Encode the message
    const encodedMessage = message.AwesomeMessage.encode(awesomeMessage).finish();
    // Decode the message
    const decodedMessage = message.AwesomeMessage.decode(encodedMessage);
    console.log('Encoded and decoded message:', decodedMessage);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Protocol Buffers Demo</h1>
        
        <div style={{ margin: '20px', padding: '20px', border: '1px solid white' }}>
          <h2>User Form</h2>
          <form onSubmit={handleUserSubmit}>
            <div>
              <label>
                ID:
                <input
                  type="text"
                  value={userData.id}
                  onChange={e => setUserData({...userData, id: e.target.value})}
                />
              </label>
            </div>
            <div>
              <label>
                Name:
                <input
                  type="text"
                  value={userData.name}
                  onChange={e => setUserData({...userData, name: e.target.value})}
                />
              </label>
            </div>
            <div>
              <label>
                Age:
                <input
                  type="number"
                  value={userData.age}
                  onChange={e => setUserData({...userData, age: parseInt(e.target.value)})}
                />
              </label>
            </div>
            <div>
              <label>
                Email:
                <input
                  type="email"
                  value={userData.email}
                  onChange={e => setUserData({...userData, email: e.target.value})}
                />
              </label>
            </div>
            <div>
              <label>
                Role:
                <select
                  value={userData.role}
                  onChange={e => setUserData({...userData, role: parseInt(e.target.value)})}
                >
                  <option value={user.Role.USER}>User</option>
                  <option value={user.Role.ADMIN}>Admin</option>
                  <option value={user.Role.GUEST}>Guest</option>
                </select>
              </label>
            </div>
            <button type="submit">Encode & Decode User</button>
          </form>
        </div>

        <div style={{ margin: '20px', padding: '20px', border: '1px solid white' }}>
          <h2>Message Form</h2>
          <form onSubmit={handleMessageSubmit}>
            <div>
              <label>
                Awesome Field:
                <input
                  type="text"
                  value={messageData.awesomeField}
                  onChange={e => setMessageData({...messageData, awesomeField: e.target.value})}
                />
              </label>
            </div>
            <div>
              <label>
                Count:
                <input
                  type="number"
                  value={messageData.count}
                  onChange={e => setMessageData({...messageData, count: parseInt(e.target.value)})}
                />
              </label>
            </div>
            <div>
              <label>
                Is Active:
                <input
                  type="checkbox"
                  checked={messageData.isActive}
                  onChange={e => setMessageData({...messageData, isActive: e.target.checked})}
                />
              </label>
            </div>
            <button type="submit">Encode & Decode Message</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;