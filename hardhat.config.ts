import { HardhatUserConfig } from "hardhat/config";
import { HttpNetworkAccountsConfig } from "hardhat/types"

import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter"

// const accounts = (): HttpNetworkAccountsConfig => {
//   if (!process.env.PRIV_KEY) {
//     return "remote"
//   }
//   return [process.env.PRIV_KEY!]
// }

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
        forking: {
            // url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
            //url: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
            // url: `https://kovan.infura.io/v3/${process.env.INFURA_KEY}`,
            //url: `https://bsc-dataseed1.binance.org:443`,
            //url: `https://rpc-mainnet.matic.network`,
            blockNumber: 15010000,
            url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
        }
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_KEY}`,
      chainId: 42,
      gasPrice: 1000000000,
      // accounts: accounts(),
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
      chainId: 1,
      gas: "auto",
      gasPrice: 45000000000,
      // accounts: accounts(),
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.15",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }  
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }  
      }
    ]
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 80000
  },
  gasReporter: {
    currency: 'ETH',
    gasPrice: 1000000001,
  },
};

export default config;
