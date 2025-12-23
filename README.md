# 💰 Para Wallet Frontend Demo

Minimal React frontend for testing the fintech backend with **Supabase Auth + Para REST API + Sepolia Integration**.

## 🎯 Purpose

This frontend exercises the complete Para flow:
1. **Signup** → Create user account + auto-generate EVM wallet
2. **Login** → Authenticate and get JWT token
3. **View Wallet** → Display wallet address + Sepolia balance
4. **Send Crypto** → Build, sign, and broadcast transactions

## 📦 Stack

- **React 18** with hooks
- **Vite** for fast development
- **Plain CSS** (no frameworks)
- **Fetch API** for backend calls
- **LocalStorage** for JWT persistence

## 🚀 Quick Start

### Prerequisites

✅ Node.js 18+
✅ Backend running on `http://localhost:3000`

### Setup

```bash
# Clone frontend
git clone https://github.com/prajalsharma/fintech-frontend-para.git
cd fintech-frontend-para

# Install dependencies
npm install

# Start dev server
npm run dev
```

Browser will open at `http://localhost:5173`

## 📁 Folder Structure

```
fintech-frontend-para/
├── src/
│   ├── components/
│   │   ├── Signup.jsx      # POST /signup
│   │   ├── Login.jsx       # POST /login
│   │   ├── Wallet.jsx      # GET /wallet
│   │   └── Send.jsx        # POST /send
│   ├── App.jsx             # Main component
│   ├── App.css             # Styling
│   ├── main.jsx            # Entry point
│   └── index.css           # Base CSS
├── index.html              # HTML shell
├── vite.config.js          # Vite config
├── package.json            # Dependencies
└── README.md               # This file
```

## 🔄 Component Flow

### 1. **Signup** (`src/components/Signup.jsx`)

**What it does:**
- Form: email + password
- Calls `POST /signup`
- Backend creates Supabase user + Para EVM wallet
- Shows wallet address on success

**Fetch call:**
```javascript
const res = await fetch('http://localhost:3000/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
```

**Success response:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "wallet_address": "0x1234567890123456789012345678901234567890"
}
```

---

### 2. **Login** (`src/components/Login.jsx`)

**What it does:**
- Form: email + password
- Calls `POST /login`
- Backend authenticates with Supabase
- Returns JWT access token
- Frontend stores token + redirects to dashboard

**Fetch call:**
```javascript
const res = await fetch('http://localhost:3000/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
```

**Success response:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3. **Wallet** (`src/components/Wallet.jsx`)

**What it does:**
- Button: "Fetch Wallet"
- Calls `GET /wallet` with Bearer token
- Displays wallet address + Sepolia ETH balance
- Shows link to faucet for funding

**Fetch call:**
```javascript
const res = await fetch('http://localhost:3000/wallet', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
```

**Success response:**
```json
{
  "address": "0x1234567890123456789012345678901234567890",
  "balance_eth": "0.5"
}
```

---

### 4. **Send** (`src/components/Send.jsx`)

**What it does:**
- Form: recipient address + amount (ETH)
- Calls `POST /send` with Bearer token
- Backend builds, signs (with Para), and broadcasts to Sepolia
- Shows transaction hash + Etherscan link on success
- **Requires**: Wallet must have Sepolia ETH

**Fetch call:**
```javascript
const res = await fetch('http://localhost:3000/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to: '0x742d35Cc6634C0532925a3b844Bc9e7595f42e2e',
    amount: '0.001',
  }),
});
```

**Success response:**
```json
{
  "transaction_hash": "0x9876543210fedcba9876543210fedcba98765432",
  "from": "0x1234567890123456789012345678901234567890",
  "to": "0x742d35Cc6634C0532925a3b844Bc9e7595f42e2e",
  "amount": "0.001"
}
```

**View on Etherscan:**
```
https://sepolia.etherscan.io/tx/0x9876543210fedcba9876543210fedcba98765432
```

---

## ✅ How This Exercises Para Correctly

1. **Wallet Creation** ✅
   - Signup calls backend → Para creates EVM wallet
   - Backend returns address to frontend
   - Frontend displays it immediately

2. **Token Management** ✅
   - Login returns JWT from Supabase
   - Frontend stores in memory (optionally localStorage)
   - All protected endpoints include Bearer token

3. **Wallet Query** ✅
   - Frontend fetches wallet data from backend
   - Backend queries Para for wallet details
   - Sepolia RPC queries balance
   - Frontend displays results

4. **Transaction Signing** ✅
   - Frontend builds TX (to, amount)
   - Backend uses Para to sign securely
   - Backend broadcasts to Sepolia
   - Frontend shows confirmation

**Key insight:** Frontend never touches Para directly. All Para interactions go through the secure backend.

---

## 🧪 Testing Workflow

### 1. **Start both services**

```bash
# Terminal 1: Backend
cd fintech-backend-para
npm start
# Running on http://localhost:3000

# Terminal 2: Frontend
cd fintech-frontend-para
npm run dev
# Running on http://localhost:5173
```

### 2. **Sign up**

- Email: `test@example.com`
- Password: `Test1234!`
- See wallet address printed

### 3. **Log in**

- Use same email/password
- Get JWT token (stored internally)
- Redirected to dashboard

### 4. **View wallet**

- Click "Fetch Wallet"
- See address + balance (0.0 ETH initially)
- Copy address

### 5. **Fund wallet** (required for sending)

1. Copy wallet address
2. Visit: https://sepolia-faucet.pk910.de/
3. Paste address
4. Claim ETH
5. Wait ~30 seconds

### 6. **Fetch wallet again**

- Click "Fetch Wallet"
- Balance should now show ~0.05 ETH

### 7. **Send transaction**

- Recipient: `0x742d35Cc6634C0532925a3b844Bc9e7595f42e2e`
- Amount: `0.001`
- Click "Send ETH"
- See TX hash
- Click link to view on Etherscan

### 8. **View on Etherscan**

- Transaction should show "Pending" then "Success"
- View full details: from address, to address, amount, gas

---

## 📊 State Management

**Minimal, intentional design:**

```javascript
// App.jsx
const [token, setToken] = useState(localStorage.getItem('token') || null);
const [user, setUser] = useState(localStorage.getItem('user') || null);
```

- Token stored in localStorage (persists on refresh)
- User email stored in localStorage
- Components read token as prop
- No Redux, Context, or global state
- Local component state for form inputs

---

## 🎨 Styling

**Minimal CSS, no frameworks:**

- `App.css` → Main styles (400+ lines)
- Mobile responsive (grid adapts)
- Focus states for accessibility
- Error/success messaging
- Simple tab switcher for auth forms

---

## ⚙️ Environment Variables

**Not needed!** Frontend assumes backend at `http://localhost:3000`.

To change backend URL, edit all components:

```javascript
const API = 'http://your-backend-url';
```

---

## 🚀 Build & Deploy

### Build

```bash
npm run build
```

Creates `dist/` folder ready to deploy.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Then set environment variable in Vercel dashboard:

```
VITE_API_URL=https://your-backend.vercel.app
```

And update component API call:

```javascript
const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

---

## 🐛 Troubleshooting

### "Cannot connect to backend"

- Is backend running on port 3000? → Check `npm start` in backend folder
- Is frontend trying correct URL? → Check API constant in components
- CORS error? → Backend needs to allow frontend origin

### "Wallet not created"

- Check backend logs for Para API errors
- Verify Para API key is set
- Try signup again

### "Transaction failed"

- Wallet not funded? → Use Sepolia faucet
- Invalid recipient? → Must be valid Ethereum address
- Out of gas? → Balance too low
- Network error? → Check Sepolia RPC is accessible

### "Token expired"

- JWT from Supabase has 1-hour expiry
- Frontend currently doesn't refresh automatically
- Solution: Log out and log back in

---

## 📚 Related Repos

- **Backend:** [fintech-backend-para](https://github.com/prajalsharma/fintech-backend-para)
- **Para Docs:** https://docs.getpara.com/
- **Sepolia Faucet:** https://sepolia-faucet.pk910.de/

---

## 🎓 Learning Outcomes

After using this frontend, you'll understand:

✅ How to fetch from backend APIs with auth tokens
✅ How Para creates and manages wallets server-side
✅ How to display crypto wallet data in React
✅ How transactions are signed and broadcasted
✅ How JWT auth works in web3 apps
✅ How to test blockchain integration without frontend complexity

---

## 📄 License

MIT

---

## 🤝 Support

Questions? Check:
1. Backend logs → `npm start` output
2. Frontend console → Browser DevTools
3. Network tab → Check actual requests/responses
4. Sepolia Etherscan → View transaction details

---

**Built with ❤️ for testing Para REST API**
