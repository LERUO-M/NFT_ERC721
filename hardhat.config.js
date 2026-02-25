// CONFIG FILE FOR LOCAL TESTING!!!!!

require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("solidity-coverage");
// require('@openzeppelin/hardhat-upgrades');

// require("@nomiclabs/hardhat-ethers");
// require("@nomiclabs/hardhat-etherscan");

require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {
      // For local testing
    },
    mainnet: {
          url: "https://mainnet.infura.io/v3/7ef0b5e3cbd14f0db0f35a3c91c09bc8",
          accounts: "remote"
    },    
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  sourcify: {
    enabled: true,
  },
};