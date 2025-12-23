import { useState } from 'react';

const API = 'http://localhost:3000';

export default function Send({ token }) {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [txHash, setTxHash] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setTxHash(null);
    setLoading(true);

    try {
      const res = await fetch(`${API}/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to,
          amount,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Transaction failed');
      }

      setTxHash(data.transaction_hash);
      setTo('');
      setAmount('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Recipient Address (0x...)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount (ETH)"
          step="0.001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send ETH'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {txHash && (
        <div className="success-box">
          <p className="success">✅ Transaction sent!</p>
          <div className="field">
            <label>TX Hash:</label>
            <code>{txHash}</code>
            <button onClick={() => navigator.clipboard.writeText(txHash)} className="copy-btn">Copy</button>
          </div>
          <p className="hint">🔍 View on <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener">Etherscan</a></p>
        </div>
      )}
    </div>
  );
}
