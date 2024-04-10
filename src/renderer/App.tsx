import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';

function Hello() {
  const [remoteCode, setRemoteCode] = useState('');
  const [localCode, setLocalCode] = useState('');
  // 0未连接，1已控制，2被控制
  const [controlText, setControlText] = useState('');

  const login = async () => {
    const code = await window.electron.ipcRenderer.invokeData('login');
    setLocalCode(code);
  };
  const control = async (code: string) => {
    window.electron.ipcRenderer.sendMessage('control', code);
  };

  const handelControl = (code: unknown, type: unknown) => {
    if (type === 1) {
      setControlText(`正在远程控制${code}`);
    } else if (type === 2) {
      setControlText(`${code}正在远程控制你`);
    } else {
      setControlText('');
    }
  };

  useEffect(() => {
    login();
    window.electron.ipcRenderer.on('control-state-change', handelControl);
  }, []);

  return (
    <div>
      {controlText == '' ? (
        <>
          <div className="title">你的控制码是{localCode}</div>
          <input
            type="text"
            value={remoteCode}
            onChange={(e) => {
              setRemoteCode(e.target.value);
            }}
          />
          <button onClick={() => control(remoteCode)}>确认</button>
        </>
      ) : (
        <div>{controlText}</div>
      )}
    </div>
  );
}

// stream 1、捕获用户的用户的设备视频、音频流 然后转化为媒体流对象 媒体流：就是一小段一小段能播放我们的视频
// 建立 P2P 连接

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
