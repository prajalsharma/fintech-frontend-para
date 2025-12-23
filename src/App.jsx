import { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Wallet from './components/Wallet';
import Send from './components/Send';
import './App.css';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(localStorage.getItem('user') || null);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <div className="container">
      <header>
        <h1>💰 Para Wallet Demo</h1>
        <p>Minimal frontend for testing Supabase + Para backend</p>
      </header>

      {!token ? (
        <div className="auth-section">
          <div className="tabs">
            <Tab label="Sign Up">
              <Signup onSignup={(userData) => {
                setUser(userData);
                alert(`Wallet created: ${userData.wallet_address}`);
              }} />
            </Tab>
            <Tab label="Log In">
              <Login onLogin={(userData, accessToken) => {
                setToken(accessToken);
                setUser(userData);
                localStorage.setItem('token', accessToken);
                localStorage.setItem('user', userData);
              }} />
            </Tab>
          </div>
        </div>
      ) : (
        <div className="dashboard">
          <div className="user-info">
            <p>Logged in as: <strong>{user}</strong></p>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>

          <div className="actions-grid">
            <div className="card">
              <h2>📊 Wallet Info</h2>
              <Wallet token={token} />
            </div>
            <div className="card">
              <h2>💸 Send Crypto</h2>
              <Send token={token} />
            </div>
          </div>
        </div>
      )}

      <footer>
        <p>Backend: <code>http://localhost:3000</code></p>
        <p><a href="https://github.com/prajalsharma/fintech-backend-para" target="_blank" rel="noopener">Backend Repo</a></p>
      </footer>
    </div>
  );
}

function Tab({ label, children }) {
  const [active, setActive] = useState(false);
  return (
    <div className="tab">
      <button
        className={`tab-button ${active ? 'active' : ''}`}
        onClick={() => setActive(!active)}
      >
        {label}
      </button>
      {active && <div className="tab-content">{children}</div>}
    </div>
  );
}
