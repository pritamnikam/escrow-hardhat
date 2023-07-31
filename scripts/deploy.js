// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const deposit = ethers.utils.parseEther('1');
  const depositor = ethers.provider.getSigner(0);
  const beneficiary = ethers.provider.getSigner(1);
  const arbiter = ethers.provider.getSigner(2);
  try {
    const Escrow = await ethers.getContractFactory('Escrow');
    const contract = await Escrow.deploy(
      arbiter.getAddress(),
      beneficiary.getAddress(),
      {
        value: deposit,
      }
    );
    await contract.deployed();

    console.log(
      `Escrow with ${hre.ethers.utils.formatEther(
        deposit
      )}ETH deployed to ${contract.address}`
    );
  } catch(error) {
    console.error(error);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});