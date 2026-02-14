# 🎯 NeonWarriors - Remaining TODO Items

## ✅ COMPLETED
- [x] Frontend rebranding (colors, fonts, text)
- [x] Smart contract rename (AvaxGods → NeonWarriors)
- [x] Cyberpunk card types (CYBER_REAPER, GRID_STALKER, etc.)
- [x] Critical hit mechanic (15% chance for 2x damage)
- [x] Deployment script updated
- [x] Contract compiled successfully
- [x] ABI exported to client
- [x] `.env.example` templates created

---

## 🔴 HIGH PRIORITY (Must Fix Before Deployment)

### 1. Deploy Fresh Contract
**Why**: The current ADDRESS in `client/src/contract/index.js` points to the old AvaxGods contract.

**Steps**:
```bash
# 1. Create web3/.env with your private key
cd web3
echo "PRIVATE_KEY=your_wallet_private_key_here" > .env

# 2. Get test AVAX from faucet
# Visit: https://faucet.avax.network/

# 3. Deploy NeonWarriors to Fuji testnet
PRIVATE_KEY=your_key npx hardhat run scripts/deploy.ts --network fuji

# 4. Copy the deployed contract address from terminal output
# Example: { NeonWarriors: '0x1234...' }

# 5. Update client/src/contract/index.js with the new address
```

### 2. Test Contract Integration
**Why**: Ensure frontend can interact with the new NeonWarriors contract.

**Steps**:
```bash
cd client
npm run dev

# Test these flows:
# - Connect wallet
# - Register player
# - Create battle
# - Join battle
# - Make moves (Attack/Defend)
# - Check if critical hits work
```

### 3. Update NFT Metadata
**Why**: Card names changed from DEVIL/GRIFFIN to CYBER_REAPER/GRID_STALKER.

**Current IPFS**: `https://gateway.pinata.cloud/ipfs/QmX2ubhtBPtYw75Wrpv6HLb1fhbJqxrnbhDo1RViW3oVoi`

**Steps**:
- Create new JSON metadata files for each card (0.json through 5.json)
- Update names to match contract constants
- Upload to IPFS/Pinata
- Update `web3/scripts/deploy.ts` with new IPFS CID

**Example metadata structure**:
```json
{
  "name": "Cyber Reaper",
  "description": "A ruthless data assassin from the neon grid",
  "image": "ipfs://QmYOURNEWCID/cyber_reaper.png",
  "attributes": [
    {"trait_type": "Type", "value": "Cybernetic"},
    {"trait_type": "Rarity", "value": "Epic"}
  ]
}
```

---

## 🟡 MEDIUM PRIORITY (Security & Polish)

### 4. Add ReentrancyGuard
**Why**: Prevent reentrancy attacks on battle functions.

**File**: `web3/contracts/NeonWarriors.sol`

**Changes**:
```solidity
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NeonWarriors is ERC1155, Ownable, ERC1155Supply, ReentrancyGuard {
  
  // Add nonReentrant modifier to these functions:
  function attackOrDefendChoice(uint8 _choice, string memory _battleName) 
    external 
    nonReentrant  // <-- Add this
  {
    // existing code...
  }

  function quitBattle(string memory _battleName) 
    public 
    nonReentrant  // <-- Add this
  {
    // existing code...
  }
}
```

### 5. Add VRF for True Randomness
**Why**: Current randomness uses `block.timestamp` which is predictable.

**Options**:
- **Chainlink VRF** (recommended)
- **API3 QRNG**
- **Gelato VRF**

**Affected functions**:
- `_createRandomNum()` (card stats)
- `_isCriticalHit()` (battle mechanics)

### 6. Write Unit Tests
**Why**: Ensure game logic works correctly before mainnet.

**File**: Create `web3/test/NeonWarriors.test.ts`

**Test cases**:
```typescript
describe("NeonWarriors", () => {
  // Player registration
  it("Should register a new player")
  it("Should not allow duplicate registration")
  
  // Battle creation
  it("Should create a new battle")
  it("Should not allow duplicate battle names")
  
  // Battle mechanics
  it("Should resolve Attack vs Attack correctly")
  it("Should resolve Attack vs Defend correctly")
  it("Should resolve Defend vs Defend correctly")
  it("Should apply critical hits randomly")
  it("Should update mana/health after each round")
  
  // Edge cases
  it("Should end battle when health reaches 0")
  it("Should allow quit battle functionality")
  it("Should reset player stats after battle ends")
});
```

### 7. Move Contract Address to .env
**Why**: Don't hardcode contract addresses in source code.

**File**: `client/src/contract/index.js`

**Changes**:
```javascript
export const ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0xC6825E381F728a0300f3FD1bf82d9B378FFD83eA';
```

**File**: `client/.env`
```
VITE_CONTRACT_ADDRESS=0xYourDeployedContractAddress
```

### 8. Better Error Handling
**Files**: `client/src/context/index.jsx`, all page components

**Improvements needed**:
- [ ] Handle "user rejected transaction" gracefully
- [ ] Show gas estimation before transactions
- [ ] Handle network switch failures
- [ ] Add retry logic for failed RPC calls
- [ ] Display user-friendly error messages

---

## 🟢 LOW PRIORITY (Nice to Have)

### 9. Update UI Assets
**Files to replace**:
- [ ] `client/public/avax.svg` → `neonwarriors.svg` (favicon)
- [ ] `client/src/assets/logo.png` → New NeonWarriors logo
- [ ] Background images (optional, current ones work fine)

### 10. Add The Graph Indexer
**Why**: Fast queries for battle history and player stats.

**Steps**:
1. Create subgraph schema for events:
   - `NewPlayer`
   - `NewBattle`
   - `BattleEnded`
   - `RoundEnded`
2. Deploy subgraph to The Graph
3. Update frontend to query from subgraph

### 11. Production Deployment
**Frontend**:
```bash
cd client
npm run build
# Deploy to Vercel/Netlify
```

**Smart Contract**:
- [ ] Audit contract (use Slither, Mythril, or professional audit)
- [ ] Deploy to Avalanche C-Chain mainnet
- [ ] Verify contract on SnowTrace

### 12. CI/CD Setup
**File**: Create `.github/workflows/test.yml`

```yaml
name: Test & Lint
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd web3 && npm install && npm test
      - run: cd client && npm install && npm run lint
```

### 13. Add Pre-commit Hooks
**File**: Create `.husky/pre-commit`

```bash
#!/bin/sh
cd client && npm run lint
cd ../web3 && npm run lint
```

---

## 📊 Current Project Status

| Category | Progress | Status |
|----------|----------|--------|
| Frontend Rebranding | 95% | ✅ Complete (needs logo/assets) |
| Smart Contract | 90% | ✅ Complete (needs deployment) |
| Security | 20% | ⚠️ Needs ReentrancyGuard + VRF |
| Testing | 0% | ❌ No tests yet |
| Deployment | 0% | ❌ Not deployed |
| Documentation | 70% | ✅ Good (see REBRANDING_SUMMARY.md) |

---

## 🚀 Quick Start (For Testing)

```bash
# Terminal 1: Start local hardhat node (optional, for local testing)
cd web3
npx hardhat node

# Terminal 2: Deploy to local network
npx hardhat run scripts/deploy.ts --network localhost
# Copy the contract address

# Terminal 3: Start frontend
cd client
# Update .env with local contract address
echo "VITE_CONTRACT_ADDRESS=0xYourLocalAddress" > .env
npm run dev
```

Visit `http://localhost:5173` and test the game!

---

## 🐛 Known Issues to Fix Later

1. **Node.js version warning**: Hardhat expects Node 14/16/18, but project uses v24
   - Works fine for now, but consider using `nvm` to switch versions
   
2. **npm vulnerabilities**: 48 vulnerabilities in dependencies
   - Run `npm audit fix` in both `client/` and `web3/`
   
3. **TypeScript errors in deploy.ts**: Missing type definitions
   - Add `@types/node` to fix: `npm i -D @types/node`

---

## 📞 Need Help?

- Hardhat docs: https://hardhat.org/docs
- Avalanche docs: https://docs.avax.network
- OpenZeppelin docs: https://docs.openzeppelin.com
