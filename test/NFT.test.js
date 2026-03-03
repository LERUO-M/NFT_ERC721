// Chai allows for the use of assertion and to run effective tests. Without it, the file will just run random commands.
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Complete tests for the NFT Contract", function () {
    async function deployNFTContract() {
        // Get all the accounts I could potentially use for the tests
        const [owner, user1, user2, user3] = await ethers.getSigners();

        // Initialising the constructor when they deploy
        const name = "Leruo";
        const symbol = "LRT";
        const arg1 = "null";
        const arg2 = "null";
        
        const NFTFactory = await ethers.getContractFactory("NFT");
        const nft = await NFTFactory.deploy(name, symbol, arg1, arg2);


        return { owner, user1, user2, user3, nft };
        
    }

    describe("1 - Testing mint function", function() {
        it("1.1 If paused is true, test should revert", async function () {
            const {nft} = await loadFixture(deployNFTContract);
        
            // Set paused to true
            await nft.pause(true);

            // calling the mint function and it should revert
            expect(nft.mint(50)).to.be.reverted;
        
        });

        it("1.2 - If mint amount is 0, test should revert", async function () {
            const {nft} = await loadFixture(deployNFTContract);
            expect(nft.mint(0)).to.be.reverted;
        });

        it("1.3 - If mint amount is bigger than max mint amount, test should revert", async function () {
            const {nft} = await loadFixture(deployNFTContract);
            expect(nft.mint(21)).to.be.reverted;
        });

        it("1.4 - If mint amount is bigger than amount of NFTs left, test should revert", async function () {
            const {nft} = await loadFixture(deployNFTContract);
            expect(nft.mint(8575)).to.be.reverted;
        }); 
        
        it("Owner should be able to mint 1 NFT", async function () {

        });
            
    });



});