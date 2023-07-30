// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const { arbiter, beneficiary } = await hre.ethers.getSigners();
  const amount = hre.ethers.parseEther("0.00001");
  const escrow = await hre.ethers.deployContract(
    "Escrow",
    arbiter,
    beneficiary,
    amount
  );

  await escrow.waitForDeployment();

  console.log(
    `Escrow with ${hre.ethers.formatEther(
        amount
    )}ETH deployed to ${escrow.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});