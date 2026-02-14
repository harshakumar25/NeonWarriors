# 🚀 NeonWarriors - Quick Start Guide

**Ready to deploy in 3 steps!**

---

## ✅ What's Already Done

- ✅ Frontend fully rebranded to NeonWarriors (cyberpunk theme)
- ✅ Smart contract renamed and secured (ReentrancyGuard added)
- ✅ All dependencies installed (web3 ✓ | client ✓)
- ✅ Contract compiled successfully
- ✅ Critical hits mechanic implemented

---

## 🔴 What You Need To Do (30 Minutes)

### Step 1: Get Test AVAX (5 minutes)

1. Go to https://faucet.avax.network/
2. Connect your MetaMask/Core wallet
3. Select "Fuji (C-Chain)" network
4. Click "Request 2 AVAX"
5. Wait for confirmation (~10 seconds)

---

### Step 2: Deploy NeonWarriors Contract (10 minutes)

```bash
# 1. Navigate to web3 directory
cd /Users/harshkumar/Desktop/projects/project_web3_battle_game/web3

# 2. Create .env file with your private key
# WARNING: Never commit this file to git!
echo "PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE" > .env

# 3. Deploy to Fuji testnet
PRIVATE_KEY=$(cat .env | cut -d'=' -f2) ./node_modules/.bin/hardhat run scripts/deploy.ts --network fuji

# Expected output:
# Deploying a smart contract...
# { NeonWarriors: '0xABCD1234...' }

# 4. COPY THE CONTRACT ADDRESS (you'll need it in Step 3)
```

**Troubleshooting**:
- ❌ "Insufficient funds" → Get more AVAX from faucet
- ❌ "Network error" → Check your internet connection
- ❌ "Invalid private key" → Make sure it starts with `0x`

---

### Step 3: Update Contract Address (2 minutes)

```bash
# 1. Open the contract configuration file
open /Users/harshkumar/Desktop/projects/project_web3_battle_game/client/sr c/contract/index.js

# 2. Find this line (line 5):
export const ADDRESS = '0xC6825E381F728a0300f3FD1bf82d9B378FFD83eA';

# 3. Replace with YOUR deployed address:
export const ADDRESS = '0xYOUR_DEPLOYED_ADDRESS_FROM_STEP_2';

# 4. Save the file
```

---

### Step 4: Start the Game! (1 minute)

```bash
# Navigate to client directory
cd /Users/harshkumar/Desktop/projects/project_web3_battle_game/client

# Start the development server
npm run dev

# Expected output:
#   VITE v3.1.0  ready in 234 ms
#   
#   ➜  Local:   http://localhost:5173/
#   ➜  Network: use --host to expose

# Open your browser to http://localhost:5173
```

---

## 🎮 Testing the Game

Once the game loads:

1. **Connect Wallet**
   - Click "Connect Account" button
   - Approve MetaMask/Core connection
   - Make sure you're on "Fuji (C-Chain)" network

2. **Register Player**
   - Enter your player name
   - Enter a token name (your character)
   - Click "Register"
   - Approve transaction in wallet (~5 seconds)

3. **Create Battle**
   - Enter a battle name
   - Click "Create Battle"
   - You'll be redirected to waiting screen

4. **Join Battle (Second Player)**
   - Open game in incognito/different browser
   - Connect a different wallet
   - Register second player
   - Click "Join Battle"
   - Select the battle you created

5. **Play the Game!**
   - Choose Attack (costs 3 mana) or Defend (gains 3 mana)
   - Watch for critical hits (2x damage, 15% chance)
   - First to reduce opponent's health to 0 wins!

---

## 🐛 Common Issues & Fixes

### "Wrong Network" Error
**Fix**: Switch to Fuji network in MetaMask
- Network Name: Avalanche Fuji C-Chain
- RPC URL: https://api.avax-test.network/ext/bc/C/rpc
- Chain ID: 43113
- Symbol: AVAX
- Explorer: https://testnet.snowtrace.io/

### "Contract Not Found" Error
**Fix**: Make sure you updated the contract address in Step 3

### "Transaction Failed" Error
**Fix**: Check if you have enough AVAX for gas fees

### "Player Already Registered" Error
**Fix**: This is normal if you already registered. Just create/join a battle.

---

## 📊 Expected Behavior

### Player Registration
- **Cost**: ~0.01 AVAX gas fee
- **Time**: ~5 seconds
- **Result**: You get a random NFT card with attack/defense stats

### Creating a Battle
- **Cost**: ~0.005 AVAX gas fee
- **Time**: ~3 seconds
- **Result**: Battle is created, you wait for opponent

### Joining a Battle
- **Cost**: ~0.005 AVAX gas fee
- **Time**: ~3 seconds
- **Result**: Battle starts, both players can make moves

### Making Moves
- **Cost**: ~0.008 AVAX gas fee per move
- **Time**: ~3-5 seconds per move
- **Result**: 
  - Attack vs Attack: Both take damage, both lose 3 mana
  - Attack vs Defend: Attacker loses 3 mana, defender gains 3 mana
  - Defend vs Defend: Both gain 3 mana
  - **Critical Hit**: 15% chance for 2x damage (shows in console)

### Winning
- **Result**: Battle ends, both players reset to full health/mana
- **Next**: You can create another battle!

---

## 🎯 Success Checklist

After completing all steps, you should have:

- [ ] Contract deployed to Fuji testnet ✅
- [ ] Contract address updated in client ✅
- [ ] Game running at http://localhost:5173 ✅
- [ ] Wallet connected ✅
- [ ] Player registered ✅
- [ ] Can create battles ✅
- [ ] Can join battles ✅
- [ ] Can make moves (Attack/Defend) ✅
- [ ] Battle ends when one player reaches 0 health ✅

---

## 🔍 Verification

To verify everything works:

1. **Check Contract on Explorer**:
   - Visit: https://testnet.snowtrace.io/address/YOUR_CONTRACT_ADDRESS
   - You should see:
     - Contract creation transaction
     - registerPlayer transactions
     - createBattle transactions
     - attackOrDefendChoice transactions

2. **Check Your NFT**:
   - After registering, you minted an NFT
   - Go to: https://testnet.snowtrace.io/address/YOUR_WALLET_ADDRESS
   - Click "Token Holdings" tab
   - You should see an ERC-1155 token

3. **Check Game State**:
   - Open browser console (F12)
   - Look for event logs:
     - "NewPlayer" event
     - "NewBattle" event
     - "BattleMove" event
     - "RoundEnded" event
     - "BattleEnded" event

---

## 📱 Play with a Friend

Want to test multiplayer?

1. **Send them the game URL**:
   ```
   http://localhost:5173
   ```
   (or deploy to Vercel/Netlify for public access)

2. **Send them test AVAX**:
   - They need to get AVAX from https://faucet.avax.network/

3. **They register** their own player

4. **You create battle**, they join it

5. **Play!**

---

## 🚨 IMPORTANT NOTES

### Security
- ✅ ReentrancyGuard is enabled (protects against attacks)
- ⚠️ Randomness uses blockhash (fine for testnet, not mainnet)
- ⚠️ No tests written yet (recommended before mainnet)

### Costs (Testnet)
- Register Player: ~0.01 AVAX
- Create Battle: ~0.005 AVAX
- Join Battle: ~0.005 AVAX
- Each Move: ~0.008 AVAX
- **Total for one game**: ~0.03-0.05 AVAX (FREE on testnet!)

### Known Limitations
- Critical hits only work in some scenarios (fix before mainnet)
- No battle history/leaderboard (add The Graph later)
- No NFT metadata update yet (cosmetic, can skip)

---

## 🎨 Customization (Optional)

Want to change the game?

### Change Card Stats
Edit `web3/contracts/NeonWarriors.sol` line 27:
```solidity
uint256 public constant MAX_ATTACK_DEFEND_STRENGTH = 10; // Change to 20 for harder battles
```

### Change Player Health/Mana
Edit `web3/contracts/NeonWarriors.sol` line 154:
```solidity
players.push(Player(msg.sender, _name, 10, 25, false)); 
// Change to: players.push(Player(msg.sender, _name, 20, 50, false));
// For 20 mana, 50 health
```

### Change Critical Hit Chance
Edit `web3/contracts/NeonWarriors.sol` line 323:
```solidity
return rand < 15; // 15% chance
// Change to: return rand < 25; // 25% chance
```

**After any changes**: Redeploy contract and update address!

---

## 🎯 You're Done!

**You now have a fully functional Web3 cyberpunk NFT card battle game!**

Next steps:
- Play with friends
- Fix critical hit mechanic (optional)
- Write tests (recommended)
- Deploy to mainnet when ready

Need help? Check:
- `STATUS_REPORT.md` - What's done, what's left
- `CRITICAL_ANALYSIS.md` - What's actually necessary
- `TODO.md` - Full task list
- `REBRANDING_SUMMARY.md` - What changed

**Happy battling in the neon grid! ⚡🎮**
