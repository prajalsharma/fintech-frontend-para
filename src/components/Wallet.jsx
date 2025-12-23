import { useState } from 'react';

const API = 'http://localhost:3000';

export default function Wallet({ token }) {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchWallet = async () => {
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API}/wallet`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch wallet');
      }

      setWallet(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleFetchWallet} disabled={loading} className="fetch-btn">
        {loading ? 'Fetching...' : 'Fetch Wallet'}
      </button>

      {error && <p className="error">{error}</p>}

      {wallet && (
        <div className="wallet-display">
          <div className="field">
            <label>Address:</label>
            <code>{wallet.address}</code>
            <button onClick={() => navigator.clipboard.writeText(wallet.address)} className="copy-btn">Copy</button>
          </div>
          <div className="field">
            <label>Balance:</label>
            <span className="balance">{wallet.balance_eth} ETH</span>
          </div>
          <p className="hint">💵 Needs funding? Use <a href="https://sepolia-faucet.pk910.de/" target="_blank" rel="noopener">Sepolia Faucet</a></p>
        </div>
      )}
    </div>
  );
}
