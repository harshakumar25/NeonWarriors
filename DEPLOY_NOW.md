# 🚀 Final Deployment Instructions

**You're at the finish line!** Everything is ready. Just follow these steps:

---

## Option 1: Automated Deployment (Recommended)

I've created a helper script that does everything for you:

```bash
cd /Users/harshkumar/Desktop/projects/project_web3_battle_game/web3
./deploy.sh
```

The script will:
1. ✅ Check if you're in the right directory
2. ✅ Create `.env` if it doesn't exist
3. ✅ Compile the contract
4. ✅ Remind you to get test AVAX
5. ✅ Deploy to Fuji testnet
6. ✅ Extract the contract address
7. ✅ Offer to update the frontend automatically
8. ✅ Give you the exact next steps

**Just run `./deploy.sh` and follow the prompts!**

---

## Option 2: Manual Deployment

If you prefer to do it manually:

### Step 1: Create .env
```bash
cd /Users/harshkumar/Desktop/projects/project_web3_battle_game/web3
echo "PRIVATE_KEY=0xYOUR_WALLET_PRIVATE_KEY" > .env
```

**Get your private key**:
1. Open MetaMask/Core wallet
2. Click account → Account Details
3. Click "Export Private Key"
4. Enter password
5. Copy the private key (starts with 0x)

### Step 2: Get Test AVAX
1. Visit: https://faucet.avax.network/
2. Connect wallet
3. Select "Fuji C-Chain"
4. Request 2 AVAX
5. Wait ~10 seconds

### Step 3: Deploy
```bash
PRIVATE_KEY=$(cat .env | cut -d'=' -f2) ./node_modules/.bin/hardhat run scripts/deploy.ts --network fuji
```

You'll see:
```
Deploying a smart contract...
{ NeonWarriors: '0xABCDEF1234567890...' }
```

**Copy that address!**

### Step 4: Update Frontend
Edit `/Users/harshkumar/Desktop/projects/project_web3_battle_game/client/src/contract/index.js`

Change line 5:
```javascript
export const ADDRESS = '0xYOURDEPLOYEDADDRESS';
```

### Step 5: Start the Game
```bash
cd /Users/harshkumar/Desktop/projects/project_web3_battle_game/client
npm run dev
```

Visit: http://localhost:5173

---

## Security Reminders

⚠️ **NEVER commit .env to git**  
⚠️ **NEVER share your private key**  
⚠️ **This is testnet AVAX (worth $0)**  

For mainnet deployment, use a hardware wallet or multisig.

---

## Troubleshooting

### "Insufficient funds"
→ Get more AVAX from https://faucet.avax.network/

### "Network error"
→ Check internet connection, try again

### "Invalid private key"
→ Make sure it starts with `0x` and is 66 characters

### "Contract not found" in game
→ Make sure you updated the address in `client/src/contract/index.js`

---

## What Happens After Deployment

1. Contract is deployed to Fuji testnet
2. You get a contract address (0x...)
3. Frontend connects to that address
4. Players can register and battle
5. All transactions cost test AVAX (free)

---

## Ready?

**Run this now**:
```bash
cd /Users/harshkumar/Desktop/projects/project_web3_battle_game/web3
./deploy.sh
```

Follow the prompts, and you'll be playing NeonWarriors in 5 minutes!

Good luck! ⚡🎮
