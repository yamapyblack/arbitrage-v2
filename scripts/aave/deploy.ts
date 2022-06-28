import { ethers } from "hardhat";
import { Addresses, KmsSigner } from "../common";
import { MyV2FlashLoan } from "../../typechain-types/MyV2FlashLoan"

const main = async () => {
    const signer = KmsSigner()
    const addresses = Addresses()!

    const c = await ethers.getContractFactory("MyV2FlashLoan");
    const contract = (await c.connect(signer).deploy(addresses.AddressPrivider)) as MyV2FlashLoan
    await contract.deployed();
    console.log('deployed txHash:', contract.deployTransaction.hash);
    console.log('deployed address:', contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

