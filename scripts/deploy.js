const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const name = "Leruo";
  const symbol = "LR";
  const arg1 = "null";
  const arg2 = "null";

  const NFT = await hre.ethers.getContractFactory("NFT");

  // Deploy the contract
  const nft = await NFT.deploy(name, symbol, arg1, arg2);

  await nft.waitForDeployment();

  const adresName = await nft.getAddress();

  console.log(`NFT contract deployed to: ${adresName}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
