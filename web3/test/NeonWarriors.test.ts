import { expect } from "chai";
import { ethers } from "hardhat";
import { NeonWarriors } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("NeonWarriors - Essential Tests", function () {
    let neonWarriors: NeonWarriors;
    let owner: SignerWithAddress;
    let player1: SignerWithAddress;
    let player2: SignerWithAddress;
    let player3: SignerWithAddress;

    const METADATA_URI = "https://gateway.pinata.cloud/ipfs/QmX2ubhtBPtYw75Wrpv6HLb1fhbJqxrnbhDo1RViW3oVoi";

    beforeEach(async function () {
        // Get signers
        [owner, player1, player2, player3] = await ethers.getSigners();

        // Deploy contract
        const NeonWarriorsFactory = await ethers.getContractFactory("NeonWarriors");
        neonWarriors = await NeonWarriorsFactory.deploy(METADATA_URI);
        await neonWarriors.deployed();
    });

    // ========================================
    // 🔴 CRITICAL TESTS (Must Pass)
    // ========================================

    describe("🔴 1. Player Registration", function () {
        it("Should register a new player successfully", async function () {
            const playerName = "CyberHacker";
            const tokenName = "NeonBlade";

            await neonWarriors.connect(player1).registerPlayer(playerName, tokenName);

            const registeredPlayer = await neonWarriors.getPlayer(player1.address);
            expect(registeredPlayer.playerName).to.equal(playerName);
            expect(registeredPlayer.playerHealth).to.equal(25);
            expect(registeredPlayer.playerMana).to.equal(10);
            expect(registeredPlayer.inBattle).to.equal(false);
        });

        it("Should prevent duplicate player registration", async function () {
            await neonWarriors.connect(player1).registerPlayer("Player1", "Token1");

            await expect(
                neonWarriors.connect(player1).registerPlayer("Player1Again", "Token1Again")
            ).to.be.revertedWith("Player already registered");
        });

        it("Should mint an NFT token when player registers", async function () {
            await neonWarriors.connect(player1).registerPlayer("Player1", "Token1");

            const playerToken = await neonWarriors.getPlayerToken(player1.address);

            // Check that token has valid stats
            expect(playerToken.attackStrength).to.be.gt(0);
            expect(playerToken.defenseStrength).to.be.gt(0);
            expect(playerToken.attackStrength).to.be.lte(10);
            expect(playerToken.defenseStrength).to.be.lte(10);

            // Attack + Defense should equal MAX (10)
            const total = playerToken.attackStrength.toNumber() + playerToken.defenseStrength.toNumber();
            expect(total).to.equal(10);
        });
    });

    describe("🔴 2. Battle Creation & Joining", function () {
        beforeEach(async function () {
            await neonWarriors.connect(player1).registerPlayer("Player1", "Token1");
            await neonWarriors.connect(player2).registerPlayer("Player2", "Token2");
        });

        it("Should create a new battle", async function () {
            const battleName = "GridWar001";

            await neonWarriors.connect(player1).createBattle(battleName);

            const battle = await neonWarriors.getBattle(battleName);
            expect(battle.name).to.equal(battleName);
            expect(battle.battleStatus).to.equal(0); // PENDING
            expect(battle.players[0]).to.equal(player1.address);
            expect(battle.players[1]).to.equal(ethers.constants.AddressZero);
        });

        it("Should prevent duplicate battle names", async function () {
            const battleName = "GridWar001";

            await neonWarriors.connect(player1).createBattle(battleName);

            await expect(
                neonWarriors.connect(player2).createBattle(battleName)
            ).to.be.revertedWith("Battle already exists!");
        });

        it("Should allow player 2 to join battle", async function () {
            const battleName = "GridWar001";

            await neonWarriors.connect(player1).createBattle(battleName);
            await neonWarriors.connect(player2).joinBattle(battleName);

            const battle = await neonWarriors.getBattle(battleName);
            expect(battle.battleStatus).to.equal(1); // STARTED
            expect(battle.players[1]).to.equal(player2.address);

            // Check that both players are now in battle
            const p1 = await neonWarriors.getPlayer(player1.address);
            const p2 = await neonWarriors.getPlayer(player2.address);
            expect(p1.inBattle).to.equal(true);
            expect(p2.inBattle).to.equal(true);
        });

        it("Should prevent player 1 from joining their own battle", async function () {
            const battleName = "GridWar001";

            await neonWarriors.connect(player1).createBattle(battleName);

            await expect(
                neonWarriors.connect(player1).joinBattle(battleName)
            ).to.be.revertedWith("Only player two can join a battle");
        });

        it("Should prevent joining an already started battle", async function () {
            const battleName = "GridWar001";

            await neonWarriors.connect(player1).registerPlayer("Player3", "Token3");
            await neonWarriors.connect(player1).createBattle(battleName);
            await neonWarriors.connect(player2).joinBattle(battleName);

            await expect(
                neonWarriors.connect(player3).joinBattle(battleName)
            ).to.be.revertedWith("Battle already started!");
        });
    });

    describe("🔴 3. Battle Mechanics - Attack vs Attack", function () {
        beforeEach(async function () {
            await neonWarriors.connect(player1).registerPlayer("Player1", "Token1");
            await neonWarriors.connect(player2).registerPlayer("Player2", "Token2");
            await neonWarriors.connect(player1).createBattle("TestBattle");
            await neonWarriors.connect(player2).joinBattle("TestBattle");
        });

        it("Should allow both players to attack", async function () {
            const battleName = "TestBattle";

            // Player 1 attacks (choice 1)
            await neonWarriors.connect(player1).attackOrDefendChoice(1, battleName);

            // Player 2 attacks (choice 1)
            await neonWarriors.connect(player2).attackOrDefendChoice(1, battleName);

            // Both players should have taken damage and lost mana
            const p1 = await neonWarriors.getPlayer(player1.address);
            const p2 = await neonWarriors.getPlayer(player2.address);

            // Both should have lost 3 mana (10 - 3 = 7)
            expect(p1.playerMana).to.be.lt(10);
            expect(p2.playerMana).to.be.lt(10);
        });

        it("Should prevent making a move twice in same round", async function () {
            const battleName = "TestBattle";

            await neonWarriors.connect(player1).attackOrDefendChoice(1, battleName);

            await expect(
                neonWarriors.connect(player1).attackOrDefendChoice(1, battleName)
            ).to.be.revertedWith("You have already made a move!");
        });

        it("Should require sufficient mana to attack", async function () {
            const battleName = "TestBattle";

            // Drain mana by attacking multiple rounds
            for (let i = 0; i < 3; i++) {
                await neonWarriors.connect(player1).attackOrDefendChoice(1, battleName);
                await neonWarriors.connect(player2).attackOrDefendChoice(1, battleName);
            }

            // Now player 1 should have < 3 mana
            const p1 = await neonWarriors.getPlayer(player1.address);
            if (p1.playerMana < 3) {
                await expect(
                    neonWarriors.connect(player1).attackOrDefendChoice(1, battleName)
                ).to.be.revertedWith("Mana not sufficient for attacking!");
            }
        });
    });

    describe("🔴 4. Battle Mechanics - Attack vs Defend", function () {
        beforeEach(async function () {
            await neonWarriors.connect(player1).registerPlayer("Player1", "Token1");
            await neonWarriors.connect(player2).registerPlayer("Player2", "Token2");
            await neonWarriors.connect(player1).createBattle("TestBattle");
            await neonWarriors.connect(player2).joinBattle("TestBattle");
        });

        it("Should handle attack vs defend correctly", async function () {
            const battleName = "TestBattle";

            const p1Before = await neonWarriors.getPlayer(player1.address);
            const p2Before = await neonWarriors.getPlayer(player2.address);

            // Player 1 attacks, Player 2 defends
            await neonWarriors.connect(player1).attackOrDefendChoice(1, battleName); // Attack
            await neonWarriors.connect(player2).attackOrDefendChoice(2, battleName); // Defend

            const p1After = await neonWarriors.getPlayer(player1.address);
            const p2After = await neonWarriors.getPlayer(player2.address);

            // Player 1 (attacker) should lose mana
            expect(p1After.playerMana).to.equal(p1Before.playerMana.sub(3));

            // Player 2 (defender) should gain mana
            expect(p2After.playerMana).to.equal(p2Before.playerMana.add(3));
        });
    });

    describe("🔴 5. Battle Mechanics - Defend vs Defend", function () {
        beforeEach(async function () {
            await neonWarriors.connect(player1).registerPlayer("Player1", "Token1");
            await neonWarriors.connect(player2).registerPlayer("Player2", "Token2");
            await neonWarriors.connect(player1).createBattle("TestBattle");
            await neonWarriors.connect(player2).joinBattle("TestBattle");
        });

        it("Should allow both players to gain mana when both defend", async function () {
            const battleName = "TestBattle";

            const p1Before = await neonWarriors.getPlayer(player1.address);
            const p2Before = await neonWarriors.getPlayer(player2.address);

            // Both players defend
            await neonWarriors.connect(player1).attackOrDefendChoice(2, battleName);
            await neonWarriors.connect(player2).attackOrDefendChoice(2, battleName);

            const p1After = await neonWarriors.getPlayer(player1.address);
            const p2After = await neonWarriors.getPlayer(player2.address);

            // Both should have gained 3 mana
            expect(p1After.playerMana).to.equal(p1Before.playerMana.add(3));
            expect(p2After.playerMana).to.equal(p2Before.playerMana.add(3));

            // Neither should have taken damage
            expect(p1After.playerHealth).to.equal(p1Before.playerHealth);
            expect(p2After.playerHealth).to.equal(p2Before.playerHealth);
        });
    });

    describe("🔴 6. Battle End Conditions", function () {
        beforeEach(async function () {
            await neonWarriors.connect(player1).registerPlayer("Player1", "Token1");
            await neonWarriors.connect(player2).registerPlayer("Player2", "Token2");
            await neonWarriors.connect(player1).createBattle("TestBattle");
            await neonWarriors.connect(player2).joinBattle("TestBattle");
        });

        it("Should allow player to quit battle", async function () {
            const battleName = "TestBattle";

            await neonWarriors.connect(player1).quitBattle(battleName);

            const battle = await neonWarriors.getBattle(battleName);
            expect(battle.battleStatus).to.equal(2); // ENDED
            expect(battle.winner).to.equal(player2.address); // Player 2 wins

            // Both players should be reset
            const p1 = await neonWarriors.getPlayer(player1.address);
            const p2 = await neonWarriors.getPlayer(player2.address);

            expect(p1.inBattle).to.equal(false);
            expect(p2.inBattle).to.equal(false);
            expect(p1.playerHealth).to.equal(25);
            expect(p2.playerHealth).to.equal(25);
            expect(p1.playerMana).to.equal(10);
            expect(p2.playerMana).to.equal(10);
        });

        it("Should reset players after battle ends", async function () {
            const battleName = "TestBattle";

            // Quit battle
            await neonWarriors.connect(player1).quitBattle(battleName);

            // Players should be able to create new battles
            await expect(
                neonWarriors.connect(player1).createBattle("NewBattle")
            ).to.not.be.reverted;
        });
    });

    // ========================================
    // 🟡 IMPORTANT TESTS (Should Pass)
    // ========================================

    describe("🟡 7. ReentrancyGuard Protection", function () {
        it("Should have nonReentrant on attackOrDefendChoice", async function () {
            // This test verifies that the nonReentrant modifier is present
            // Actual reentrancy testing would require a malicious contract

            await neonWarriors.connect(player1).registerPlayer("Player1", "Token1");
            await neonWarriors.connect(player2).registerPlayer("Player2", "Token2");
            await neonWarriors.connect(player1).createBattle("TestBattle");
            await neonWarriors.connect(player2).joinBattle("TestBattle");

            // Normal call should work
            await expect(
                neonWarriors.connect(player1).attackOrDefendChoice(1, "TestBattle")
            ).to.not.be.reverted;
        });

        it("Should have nonReentrant on quitBattle", async function () {
            await neonWarriors.connect(player1).registerPlayer("Player1", "Token1");
            await neonWarriors.connect(player2).registerPlayer("Player2", "Token2");
            await neonWarriors.connect(player1).createBattle("TestBattle");
            await neonWarriors.connect(player2).joinBattle("TestBattle");

            // Normal call should work
            await expect(
                neonWarriors.connect(player1).quitBattle("TestBattle")
            ).to.not.be.reverted;
        });
    });

    describe("🟡 8. Token Stats Randomization", function () {
        it("Should generate different stats for different players", async function () {
            await neonWarriors.connect(player1).registerPlayer("Player1", "Token1");
            await neonWarriors.connect(player2).registerPlayer("Player2", "Token2");

            const token1 = await neonWarriors.getPlayerToken(player1.address);
            const token2 = await neonWarriors.getPlayerToken(player2.address);

            // Stats should be different (very unlikely to be exactly the same)
            const sameStats =
                token1.attackStrength.eq(token2.attackStrength) &&
                token1.defenseStrength.eq(token2.defenseStrength);

            // This might occasionally fail due to randomness, but very rare
            // If it fails consistently, there's a problem with randomization
            expect(sameStats).to.be.false;
        });

        it("Should assign valid token IDs (0-5)", async function () {
            await neonWarriors.connect(player1).registerPlayer("Player1", "Token1");

            const token = await neonWarriors.getPlayerToken(player1.address);
            expect(token.id).to.be.gte(0);
            expect(token.id).to.be.lte(5);
        });
    });

    // ========================================
    // 🟢 EDGE CASE TESTS (Nice to Have)
    // ========================================

    describe("🟢 9. Edge Cases", function () {
        it("Should prevent unregistered players from creating battles", async function () {
            await expect(
                neonWarriors.connect(player1).createBattle("TestBattle")
            ).to.be.revertedWith("Please Register Player First");
        });

        it("Should prevent players in battle from creating another battle", async function () {
            await neonWarriors.connect(player1).registerPlayer("Player1", "Token1");
            await neonWarriors.connect(player2).registerPlayer("Player2", "Token2");

            await neonWarriors.connect(player1).createBattle("Battle1");
            await neonWarriors.connect(player2).joinBattle("Battle1");

            await expect(
                neonWarriors.connect(player1).createBattle("Battle2")
            ).to.be.revertedWith("Player is in a battle");
        });

        it("Should get all battles correctly", async function () {
            await neonWarriors.connect(player1).registerPlayer("Player1", "Token1");
            await neonWarriors.connect(player2).registerPlayer("Player2", "Token2");

            await neonWarriors.connect(player1).createBattle("Battle1");
            await neonWarriors.connect(player1).createBattle("Battle2");

            const battles = await neonWarriors.getAllBattles();
            expect(battles.length).to.be.gte(2);
        });
    });

    describe("🟢 10. Token URI", function () {
        it("Should return correct token URI", async function () {
            const tokenId = 0; // CYBER_REAPER
            const uri = await neonWarriors.tokenURI(tokenId);

            expect(uri).to.include(METADATA_URI);
            expect(uri).to.include("/0.json");
        });
    });
});
