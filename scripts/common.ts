import env, { ethers } from 'hardhat'
import { KmsEthersSigner } from "aws-kms-ethers-signer";
import { HttpNetworkConfig } from "hardhat/types"

export const NilAddress = "0x000000000000000000000000000000000000000"
const region = process.env.AWS_REGION!; 
const keyId = process.env.KMS_KEY_ID!; 

interface AddressesType {                                                 
  Deployer: string
  BscArbitrager: string
  Contract: string
  Weth: string
  UniswapV3Router: string
  AddressPrivider: string
}      

export const Addresses = () => {
  switch (env.network.name) {
    case "kovan":
      return{
        Deployer: "0x5913e04c4BE830be4bc7Cc593ECe04473a8f3b31",
        AddressPrivider: "0x88757f2f99175387aB4C6a4b3067c77A695b0349",
      } as AddressesType

    case "mainnet":
      return{
        Deployer: "0x5913e04c4BE830be4bc7Cc593ECe04473a8f3b31",
      } as AddressesType
  }
}

export const KmsSigner = () => {
  const rpcUrl = (env.network.config as HttpNetworkConfig).url;
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const signer = new KmsEthersSigner({ keyId }).connect(provider);

  return signer
}
