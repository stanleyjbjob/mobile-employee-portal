import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>員工行動入口網站</h1>
        <p>
          企業員工專用的行動入口網站
        </p>
        <div className="App-nav">
          <button className="nav-button">個人資訊</button>
          <button className="nav-button">公司公告</button>
          <button className="nav-button">活動報名</button>
          <button className="nav-button">問卷調查</button>
        </div>
      </header>
    </div>
  );
}

export default App;
