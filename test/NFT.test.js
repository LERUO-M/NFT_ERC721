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
        
        it("1.5 -Owner should be able to mint 1 NFT", async function () {
            const {nft, owner} = await loadFixture(deployNFTContract);

            expect(await nft.balanceOf(owner.address)).to.equal(0);
            await nft.mint(1);
            expect(await nft.balanceOf(owner.address)).to.equal(1);
        });

        it("1.6 - User1 should not be able to mint if he pays the wrong amount", async function () {
            const {nft, user1} = await loadFixture(deployNFTContract);
            const amount = ethers.parseEther("1.0");

            
            const attemptToBuy = nft.connect(user1).mint(2, {value: amount});
            expect(attemptToBuy).to.be.reverted;
        });

        it("1.7 - User1 should be able to mint if he pays the right amount", async function () {
            const {nft, user1} = await loadFixture(deployNFTContract);
            const amount = ethers.parseEther("2.0");

            
            await nft.connect(user1).mint(2, {value: amount});
            expect(await nft.balanceOf(user1.address)).to.equal(2);
        });
    });
            
    describe("2 - Checking the wallet of owner ", function(){
        it("2.1 - tokenIds list creates the right size of array from the amount of tokens held", async function (){
            const {nft, user1} = await loadFixture(deployNFTContract);

            // Minting 2 tokens to User1
            const amount = ethers.parseEther("2.0");
            await nft.connect(user1).mint(2, {value: amount});
            expect(await nft.balanceOf(user1.address)).to.equal(2);

            // Check what the function returns
            const listOfArray = await nft.walletOfOwner(user1.address);

            expect(listOfArray.length).to.equal(2);
        });

        it("2.2 - tokenIds list should be 0 if address doesnt have any NFTs", async function (){
            const {nft, user1} = await loadFixture(deployNFTContract);

             // Check what the function returns
            const listOfArray = await nft.walletOfOwner(user1.address);
            expect(listOfArray.length).to.equal(0);
        });
    });

    describe("3 - Testing the tokenURI function", function(){
        it("Tring to find an NFT of a tokenId that doesnt exist; it should revert", async function () {
            
        });

        it("Tring to find an NFT of a tokenId that exists, that is not revealed. This should revert", async function () {
            
        });

        it("Tring to find an NFT of a tokenId that exists, and has been revealed", async function () {
            
        });        
    });

    describe("4 - Testing onlyOwner functionality", function(){
        it("Only owner should be able to reveal a NFT", async function () {
            
        });

        it("User trying to reveal a NFT should fail", async function () {
            
        });   
        
        it("Only owner should be able to set the cost", async function () {
            
        });

        it("User trying to set the cost should fail", async function () {
            
        });  
    
        it("Only owner should be able to set the max mint amount", async function () {
            
        });

        it("User trying to set the max mint amount should fail", async function () {
            
        });  

        it("Only owner should be able to set the not revealed URI", async function () {
            
        });

        it("User trying to set the not revealed URI should fail", async function () {
            
        });  

        it("Only owner should be able to set the BASE URI", async function () {
            
        });

        it("User trying to set the BASE URI should fail", async function () {
            
        }); 

        it("Only owner should be able to set the base extension", async function () {
            
        });

        it("User trying to set the base extension should fail", async function () {
            
        });  

        it("Only owner should be able to set the pause state", async function () {
            
        });

        it("User trying to set the pause state should fail", async function () {
            
        });  

        it("Only owner should be able to withdraw the contract balance", async function () {
            
        });

        it("User trying to withdraw the contract balance should fail", async function () {
            
        });  
    });


});