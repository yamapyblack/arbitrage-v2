import "@nomiclabs/hardhat-waffle"
import { ethers, network } from 'hardhat'
import { expect, use } from 'chai'
import { utils } from "ethers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address"

let owner:SignerWithAddress, addr1:SignerWithAddress, addr2:SignerWithAddress

import { ISynthetix } from "../../typechain-types/index"

// optimism
const SNX = "0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4"

describe("testing for ", async () => {
    let contract: ISynthetix
    const sETH = ethers.utils.formatBytes32String("sETH")
    const sUSD = ethers.utils.formatBytes32String("sUSD")
    const KWENTA = ethers.utils.formatBytes32String("KWENTA")

    beforeEach(async () => {
        [owner,addr1,addr2,] = await ethers.getSigners()

        const C1 = await ethers.getContractFactory("ISynthetix")
        contract = (await C1.deploy(SNX)) as ISynthetix
        await contract.deployed()        
    })

    describe("ExchangeRates-test", async() => {
        it("success", async () => {
            const sETH = "sETH"
            const bsETH = ethers.utils.formatBytes32String(sETH)
            console.log(sETH, bsETH)

            const sBTC = "sBTC"
            const bsBTC = ethers.utils.formatBytes32String(sBTC)
            console.log(sBTC, bsBTC)

            const KWENTA = "KWENTA"
            const bKWENTA = ethers.utils.formatBytes32String(KWENTA)
            console.log(KWENTA, bKWENTA)

            const trackingCode = ethers.utils.parseBytes32String("0x4b57454e54410000000000000000000000000000000000000000000000000000")
            console.log(trackingCode)
        })

        it("success", async () => {
            await contract.exchangeWithTracking(
                sUSD,
                ethers.utils.parseEther("1000"),
                sETH,
                owner.address,
                KWENTA
            )            
        })

    })

})
