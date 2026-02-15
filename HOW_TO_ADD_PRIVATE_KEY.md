# 🔑 HOW TO GET YOUR PRIVATE KEY FROM CORE WALLET

## ⚠️ SECURITY WARNING
**NEVER share your private key with anyone!**
**Only use this key for testnet development!**
**Make sure this wallet only has TEST AVAX (worth $0)!**

---

## 📱 Steps to Export Private Key from Core Wallet

### Option 1: Core Wallet (Desktop/Browser Extension)

1. **Open Core Wallet**
   - Click on the Core extension icon in your browser
   - Make sure you're logged in

2. **Go to Settings**
   - Click on your account name at the top
   - Click the gear icon ⚙️ (Settings)

3. **Security & Privacy**
   - Navigate to "Security & Privacy" section
   - Scroll down to find "Show Private Key" or "Export Private Key"

4. **Authenticate**
   - Enter your wallet password
   - Complete any 2FA if enabled

5. **Copy Private Key**
   - Your private key will be displayed (starts with `0x`)
   - Click "Copy" or select and copy the entire key
   - It should look like: `0x1234567890abcdef...` (64 characters after 0x)

---

### Option 2: MetaMask (Alternative if using MetaMask)

1. **Open MetaMask**
   - Click the MetaMask extension icon

2. **Account Details**
   - Click the three dots ⋮ next to your account
   - Select "Account Details"

3. **Export Private Key**
   - Click "Export Private Key"
   - Enter your password

4. **Copy Key**
   - Click "Confirm" 
   - Copy the displayed private key
   - Starts with `0x`

---

## 📝 Add to .env File

### Method 1: Using nano (Command Line)

```bash
# Navigate to web3 directory
cd /Users/harshkumar/Desktop/projects/project_web3_battle_game/web3

# Edit .env file
nano .env

# Replace the line:
# FROM: PRIVATE_KEY=0x0000000000000000000000000000000000000000000000000000000000000000
# TO:   PRIVATE_KEY=0xYOUR_ACTUAL_PRIVATE_KEY_HERE

# Save and exit:
# Press: Ctrl+O (save)
# Press: Enter (confirm)
# Press: Ctrl+X (exit)
```

### Method 2: Using echo (Quick Command)

```bash
cd /Users/harshkumar/Desktop/projects/project_web3_battle_game/web3

# Replace YOUR_PRIVATE_KEY with your actual key
echo "PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE" > .env
```

### Method 3: Using VS Code (Visual Editor)

```bash
# Open in VS Code
code /Users/harshkumar/Desktop/projects/project_web3_battle_game/web3/.env

# Edit the file and save
```

---

## ✅ Verify .env File

After editing, verify it's correct:

```bash
cd web3
cat .env

# Should show:
# PRIVATE_KEY=0x[your 64-character hex string]
```

**Make sure**:
- ✅ Starts with `0x`
- ✅ Followed by exactly 64 hexadecimal characters (0-9, a-f)
- ✅ No spaces or quotes
- ✅ Single line

---

## 🔒 Security Checklist

Before using this private key:

- [ ] This wallet has ONLY test AVAX (not real AVAX)
- [ ] You got test AVAX from https://faucet.avax.network/
- [ ] This is NOT your main wallet with real funds
- [ ] The `.env` file is in `.gitignore` (already configured ✅)
- [ ] You will NEVER commit this file to GitHub

---

## 🚀 After Adding Private Key

Run the deployment script again:

```bash
cd /Users/harshkumar/Desktop/projects/project_web3_battle_game
./professional_deploy.sh
```

---

## ❓ Troubleshooting

### "I don't see my private key option"
- Make sure you're logged in to Core wallet
- Update Core wallet to latest version
- Try right-clicking the account name

### "I'm worried about security"
- Create a NEW wallet just for development
- Use that wallet only for testnet
- Never put real AVAX in it

### "The .env file doesn't exist"
```bash
cd web3
ls -la .env
# If not found, create it:
touch .env
echo "PRIVATE_KEY=0xYOUR_KEY" > .env
```

---

## 🎯 Quick Summary

1. Open Core wallet
2. Settings → Security & Privacy → Show Private Key
3. Copy the key (starts with 0x)
4. Edit `web3/.env`
5. Replace placeholder with your key
6. Save the file
7. Run `./professional_deploy.sh` again

---

**Need help? Let me know which step you're stuck on!** 🚀
