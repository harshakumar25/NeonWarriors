import { expect } from "chai";
import { ethers } from "hardhat";

describe("NeonWarriors - Critical Tests", function () {
    let neonWarriors: any;
    let player1: any;
    let player2: any;

    const METADATA_URI = "https://gateway.pinata.cloud/ipfs/QmX2ubhtBPtYw75Wrpv6HLb1fhbJqxrnbhDo1RViW3oVoi";

    beforeEach(async function () {
        const signers = await ethers.getSigners();
        player1 = signers[1];
        player2 = signers[2];

        const NeonWarriorsFactory = await ethers.getContractFactory("NeonWarriors");
        neonWarriors = await NeonWarriorsFactory.deploy(METADATA_URI);
        await neonWarriors.deployed();
    });

    describe("🔴 1. Player Registration", function () {
        it("Should register a new player successfully", async function () {
            await neonWarriors.connect(player1).registerPlayer("CyberHacker", "NeonBlade");

            const player = await neonWarriors.getPlayer(player1.address);
            expect(player.playerName).to.equal("CyberHacker");
            expect(player.playerHealth.toNumber()).to.equal(25);
            expect(player.playerMana.toNumber()).to.equal(10);
        });

        it("Should mint NFT with valid stats", async function () {
            await neonWarriors.connect(player1).registerPlayer("Player1", "Token1");

            const token = await neonWarriors.getPlayerToken(player1.address);
            const total = token.attackStrength.toNumber() + token.defenseStrength.toNumber();
            expect(total).to.equal(10);
        });
    });

    describe("🔴 2. Battle Creation & Joining", function () {
        beforeEach(async function () {
            await neonWarriors.connect(player1).registerPlayer("Player1", "Token1");
            await neonWarriors.connect(player2).registerPlayer("Player2", "Token2");
        });

        it("Should create a battle", async function () {
            await neonWarriors.connect(player1).createBattle("GridWar001");

            const battle = await neonWarriors.getBattle("GridWar001");
            expect(battle.name).to.equal("GridWar001");
            expect(battle.battleStatus).to.equal(0); // PENDING
        });

        it("Should allow player 2 to join", async function () {
            await neonWarriors.connect(player1).createBattle("GridWar001");
            await neonWarriors.connect(player2).joinBattle("GridWar001");

            const battle = await neonWarriors.getBattle("GridWar001");
            expect(battle.battleStatus).to.equal(1); // STARTED
            expect(battle.players[1]).to.equal(player2.address);
        });
    });

    describe("🔴 3. Battle Mechanics", function () {
        beforeEach(async function () {
            await neonWarriors.connect(player1).registerPlayer("Player1", "Token1");
            await neonWarriors.connect(player2).registerPlayer("Player2", "Token2");
            await neonWarriors.connect(player1).createBattle("TestBattle");
            await neonWarriors.connect(player2).joinBattle("TestBattle");
        });

        it("Should allow both players to make moves", async function () {
            await neonWarriors.connect(player1).attackOrDefendChoice(1, "TestBattle");
            await neonWarriors.connect(player2).attackOrDefendChoice(1, "TestBattle");

            const p1 = await neonWarriors.getPlayer(player1.address);
            expect(p1.playerMana.toNumber()).to.be.lessThan(10);
        });

        it("Should handle quit battle", async function () {
            await neonWarriors.connect(player1).quitBattle("TestBattle");

            const battle = await neonWarriors.getBattle("TestBattle");
            expect(battle.battleStatus).to.equal(2); // ENDED
        });
    });
});
