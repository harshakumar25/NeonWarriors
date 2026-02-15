# ⚡ NeonWarriors - Professional Web3 NFT Card Battle Game

> A production-grade decentralized card battle game built on Avalanche blockchain

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.16-blue)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-2.12.0-orange)](https://hardhat.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Deployment](#deployment)
- [Usage](#usage)
- [Testing](#testing)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**NeonWarriors** is a cyberpunk-themed NFT card battle game where players mint unique character cards and engage in turn-based combat. Built with security-first principles and following Web3 best practices.

### Key Highlights

- ✅ **Secure**: ReentrancyGuard, input validation, access control
- ✅ **Decentralized**: No backend servers, all logic on-chain
- ✅ **Professional**: Follows Solidity style guide and best practices
- ✅ **Tested**: 30+ comprehensive unit tests
- ✅ **Documented**: Extensive NatSpec and user guides
- ✅ **Open Source**: MIT License

---

## ✨ Features

### Smart Contract
- **NFT Minting**: ERC1155 tokens with random stats
- **Battle System**: Turn-based combat with Attack/Defend mechanics
- **Critical Hits**: 15% chance for 2x damage
- **Mana System**: Strategic resource management
- **Health Tracking**: Real-time battle state
- **Events**: Comprehensive event emission for frontend integration

### Frontend
- **Wallet Integration**: MetaMask, Core, WalletConnect
- **Responsive UI**: Mobile-first cyberpunk design
- **Real-time Updates**: Live battle state synchronization
- **NFT Display**: Visual card representation
- **Battle History**: Track your wins and losses

---

## 🛠️ Tech Stack

### Blockchain Layer
```
Solidity: 0.8.16
OpenZeppelin Contracts: 4.x
  - ERC1155 (Multi-Token Standard)
  - Ownable (Access Control)
  - ReentrancyGuard (Security)
  - ERC1155Supply (Supply Tracking)
Hardhat: 2.12.0
Network: Avalanche (Fuji Testnet / C-Chain Mainnet)
```

### Frontend Layer
```
React: 18.2.0
Vite: 3.1.0
Tailwind CSS: 3.1.8
ethers.js: 5.7.1
Web3Modal: 1.9.9
React Router: 6.3.0
```

### Development Tools
```
TypeScript: 4.9+
Hardhat Waffle: Testing
Chai: Assertions
Mocha: Test Runner
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

```bash
Node.js: >= 16.0.0 (Recommended: 18.x or 20.x)
npm: >= 8.0.0
Git: >= 2.0.0
```

### Additional Requirements

- **Wallet**: MetaMask or Core wallet browser extension
- **AVAX**: Test AVAX from [Avalanche Faucet](https://faucet.avax.network/)
- **RPC**: Avalanche Fuji RPC (already configured)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/harshakumar25/NeonWarriors.git
cd NeonWarriors
```

### 2. Install Dependencies

```bash
# Install web3 dependencies
cd web3
npm install

# Install frontend dependencies
cd ../client
npm install

# Return to root
cd ..
```

### 3. Environment Configuration

```bash
# Create environment file for smart contract
cd web3
cp .env.example .env

# Edit .env and add your private key
# NEVER commit this file!
echo "PRIVATE_KEY=0xYOUR_WALLET_PRIVATE_KEY" > .env

# Create environment file for frontend
cd ../client
cp .env.example .env.local
```

---

## 🎯 Deployment

### Professional Deployment (Recommended)

We provide a production-grade deployment script:

```bash
# Make sure you're in the project root
./professional_deploy.sh
```

This script will:
1. ✅ Validate environment
2. ✅ Install dependencies
3. ✅ Run tests
4. ✅ Compile contracts
5. ✅ Deploy to Fuji testnet
6. ✅ Update frontend with deployed address
7. ✅ Build frontend
8. ✅ Provide deployment summary

### Manual Deployment

If you prefer manual deployment:

```bash
# 1. Deploy smart contract
cd web3
npx hardhat run scripts/deploy.ts --network fuji

# 2. Copy the deployed contract address

# 3. Update frontend
# Edit: client/src/contract/index.js
# Change: export const ADDRESS = '0xYOUR_DEPLOYED_ADDRESS';

# 4. Build frontend
cd ../client
npm run build

# 5. Test locally
npm run dev
```

---

## 💻 Usage

### Running Locally

```bash
# Start frontend development server
cd client
npm run dev

# Open browser
open http://localhost:5173
```

### Playing the Game

1. **Connect Wallet**
   - Click "Connect Wallet" button
   - Approve connection in MetaMask/Core
   - Ensure you're on Avalanche Fuji network

2. **Register as Player**
   - Enter your player name
   - Enter your card name
   - Pay gas fee to mint NFT card
   - Receive random stats (Attack + Defense = 10)

3. **Create Battle**
   - Choose "Create Battle"
   - Enter battle name
   - Wait for opponent

4. **Join Battle**
   - Browse available battles
   - Click "Join Battle"
   - Battle begins automatically

5. **Combat**
   - Choose Attack (costs 3 mana, deals damage)
   - Or Choose Defend (gains 3 mana, reduces damage)
   - 15% chance for critical hits (2x damage)
   - First to reduce opponent's health to 0 wins!

---

## 🧪 Testing

### Run All Tests

```bash
cd web3
npx hardhat test
```

### Run Specific Test Suite

```bash
# Critical tests only
npx hardhat test --grep "🔴"

# Important tests
npx hardhat test --grep "🟡"

# Optional tests
npx hardhat test --grep "🟢"
```

### Test Coverage

```bash
npx hardhat coverage
```

### Gas Reporter

```bash
REPORT_GAS=true npx hardhat test
```

---

## 🔒 Security

### Implemented Security Measures

- ✅ **ReentrancyGuard**: Prevents reentrancy attacks on state-changing functions
- ✅ **Access Control**: Ownable pattern for administrative functions
- ✅ **Input Validation**: All user inputs validated
- ✅ **No Hardcoded Values**: Uses constants and environment variables
- ✅ **Events**: All state changes emit events
- ✅ **Fail-Safe**: Proper error handling and reverts

### Security Audits

- ⚠️ **Testnet**: Not required
- 🔴 **Mainnet**: Professional audit REQUIRED before mainnet deployment

### Known Limitations

- **Randomness**: Uses blockhash (predictable). For production, use Chainlink VRF
- **No Circuit Breakers**: Add pausable functionality for mainnet
- **Gas Optimization**: Can be further optimized for mainnet

---

## 📊 Project Structure

```
NeonWarriors/
├── web3/                       # Smart contracts
│   ├── contracts/
│   │   └── NeonWarriors.sol   # Main game contract
│   ├── scripts/
│   │   └── deploy.ts          # Deployment script
│   ├── test/
│   │   ├── NeonWarriors.test.ts        # Comprehensive tests
│   │   └── NeonWarriors.simple.test.ts # Basic tests
│   ├── hardhat.config.ts      # Hardhat configuration
│   └── .env.example           # Environment template
│
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── context/           # Web3 context
│   │   ├── contract/          # Contract ABI & address
│   │   └── assets/            # Images, styles
│   ├── public/                # Static assets
│   ├── index.html             # Entry point
│   └── vite.config.js         # Vite configuration
│
├── docs/                      # Documentation
│   ├── PROFESSIONAL_DEPLOYMENT_PLAN.md
│   ├── VERCEL_DEPLOYMENT_CHECKLIST.md
│   ├── TESTING_GUIDE.md
│   └── ...
│
├── professional_deploy.sh     # Production deployment script
├── vercel.json               # Vercel configuration
└── README.md                 # This file
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Run tests (`npx hardhat test`)
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

### Code Standards

- **Solidity**: Follow [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- **JavaScript/React**: ESLint + Airbnb config
- **Comments**: Use NatSpec for contracts, JSDoc for frontend
- **Testing**: All new features must include tests

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **OpenZeppelin**: Battle-tested smart contract libraries
- **Hardhat**: Ethereum development environment
- **Avalanche**: Fast and low-cost blockchain infrastructure
- **React**: Frontend framework
- **Vite**: Next-generation frontend tooling

---

## 📞 Support

Need help? We're here for you:

- **Issues**: [GitHub Issues](https://github.com/harshakumar25/NeonWarriors/issues)
- **Discussions**: [GitHub Discussions](https://github.com/harshakumar25/NeonWarriors/discussions)
- **Documentation**: Check the `/docs` folder

---

## 🗺️ Roadmap

### ✅ Phase 1: MVP (Complete)
- [x] Smart contract development
- [x] Frontend development
- [x] Testing suite
- [x] Documentation
- [x] Testnet deployment

### 🔄 Phase 2: Enhancement (In Progress)
- [ ] Chainlink VRF integration
- [ ] Battle history (The Graph)
- [ ] Leaderboards
- [ ] Tournament system
- [ ] NFT marketplace

### 🔮 Phase 3: Mainnet (Future)
- [ ] Professional security audit
- [ ] Gas optimization
- [ ] Mainnet deployment
- [ ] Marketing campaign
- [ ] Community building

---

## 📈 Statistics

- **Smart Contract**: 510 lines
- **Tests**: 30 comprehensive test cases
- **Documentation**: 8 detailed guides
- **Frontend Components**: 15+ React components
- **Test Coverage**: 70%+ (target: 90%+)

---

<div align="center">

**Built with ⚡ by Professional Web3 Developers**

[Live Demo](https://neonwarriors10.vercel.app) • [Documentation](/docs) • [Report Bug](https://github.com/harshakumar25/NeonWarriors/issues)

</div>
