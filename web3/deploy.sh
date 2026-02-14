#!/bin/bash

# NeonWarriors Deployment Script
# This script helps you deploy NeonWarriors to Avalanche Fuji testnet

set -e  # Exit on error

echo "🎮 NeonWarriors Deployment Helper"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "contracts/NeonWarriors.sol" ]; then
    echo "❌ Error: Please run this from the web3/ directory"
    echo "   cd /Users/harshkumar/Desktop/projects/project_web3_battle_game/web3"
    exit 1
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found!"
    echo ""
    echo "📝 Creating .env file..."
    echo "PRIVATE_KEY=0x0000000000000000000000000000000000000000000000000000000000000000" > .env
    echo ""
    echo "✅ Created .env template"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env and add your wallet private key!"
    echo "   1. Open MetaMask/Core wallet"
    echo "   2. Go to Account Details → Export Private Key"
    echo "   3. Copy your private key"
    echo "   4. Edit .env and replace the zeros with your key"
    echo ""
    echo "   Example: PRIVATE_KEY=0xabcdef1234567890..."
    echo ""
    read -p "Press Enter after you've updated .env..."
fi

# Load environment variables
source .env

# Check if private key is set
if [ "$PRIVATE_KEY" == "0x0000000000000000000000000000000000000000000000000000000000000000" ]; then
    echo "❌ Error: Private key is still the default placeholder!"
    echo "   Please edit .env and add your real private key"
    exit 1
fi

echo "✅ Private key found"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
    echo ""
fi

# Compile contract
echo "🔨 Compiling NeonWarriors contract..."
PRIVATE_KEY=$PRIVATE_KEY ./node_modules/.bin/hardhat compile --force
echo "✅ Contract compiled successfully"
echo ""

# Ask user if they have test AVAX
echo "💰 Do you have test AVAX in your wallet?"
echo "   If not, visit: https://faucet.avax.network/"
echo ""
read -p "Do you have at least 1 AVAX on Fuji? (y/n): " has_avax

if [ "$has_avax" != "y" ]; then
    echo ""
    echo "⚠️  Please get test AVAX first:"
    echo "   1. Visit https://faucet.avax.network/"
    echo "   2. Connect your wallet"
    echo "   3. Select 'Fuji C-Chain'"
    echo "   4. Request 2 AVAX"
    echo "   5. Wait ~10 seconds for confirmation"
    echo ""
    read -p "Press Enter after you have test AVAX..."
fi

echo ""
echo "🚀 Deploying NeonWarriors to Fuji testnet..."
echo "   This will take ~30 seconds..."
echo ""

# Deploy contract
PRIVATE_KEY=$PRIVATE_KEY ./node_modules/.bin/hardhat run scripts/deploy.ts --network fuji > deployment_output.txt 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo ""
    echo "📋 Deployment Output:"
    cat deployment_output.txt
    echo ""
    
    # Extract contract address (assuming format: { NeonWarriors: '0x...' })
    CONTRACT_ADDRESS=$(grep -o "0x[a-fA-F0-9]\{40\}" deployment_output.txt | head -1)
    
    if [ -n "$CONTRACT_ADDRESS" ]; then
        echo "📍 Contract Address: $CONTRACT_ADDRESS"
        echo ""
        echo "🔗 View on SnowTrace:"
        echo "   https://testnet.snowtrace.io/address/$CONTRACT_ADDRESS"
        echo ""
        echo "✅ NEXT STEP: Update frontend"
        echo "   Edit: ../client/src/contract/index.js"
        echo "   Change line 5 to:"
        echo "   export const ADDRESS = '$CONTRACT_ADDRESS';"
        echo ""
        
        # Save address to file
        echo "$CONTRACT_ADDRESS" > deployed_address.txt
        echo "💾 Address saved to: deployed_address.txt"
        echo ""
        
        # Offer to update frontend automatically
        read -p "Would you like me to update the frontend automatically? (y/n): " update_frontend
        
        if [ "$update_frontend" == "y" ]; then
            FRONTEND_FILE="../client/src/contract/index.js"
            if [ -f "$FRONTEND_FILE" ]; then
                # Backup original
                cp "$FRONTEND_FILE" "$FRONTEND_FILE.backup"
                
                # Update address
                sed -i '' "s/export const ADDRESS = '0x[a-fA-F0-9]*';/export const ADDRESS = '$CONTRACT_ADDRESS';/" "$FRONTEND_FILE"
                
                echo "✅ Frontend updated!"
                echo "   Backup saved to: $FRONTEND_FILE.backup"
                echo ""
            else
                echo "❌ Could not find $FRONTEND_FILE"
            fi
        fi
        
        echo "🎮 Ready to play!"
        echo "   cd ../client"
        echo "   npm run dev"
        echo ""
        echo "   Then visit: http://localhost:5173"
        echo ""
    fi
else
    echo "❌ Deployment failed!"
    echo ""
    echo "Error output:"
    cat deployment_output.txt
    echo ""
    echo "Common issues:"
    echo "  1. Insufficient AVAX for gas - Get more from faucet"
    echo "  2. Wrong network - Make sure you're on Fuji testnet"
    echo "  3. Invalid private key - Check .env file"
    exit 1
fi

echo "🎉 Deployment complete!"
echo ""
echo "📚 Next steps:"
echo "   1. Test the game at http://localhost:5173"
echo "   2. Register a player"
echo "   3. Create a battle"
echo "   4. Battle with a friend!"
echo ""
echo "Happy battling in the neon grid! ⚡🎮"
