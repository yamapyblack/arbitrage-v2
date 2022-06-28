import "@nomiclabs/hardhat-waffle"
import { ethers, network } from 'hardhat'
import { expect, use } from 'chai'
import { BigNumberish, BytesLike, PayableOverrides, utils, ContractTransaction, BigNumber } from "ethers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address"

let owner:SignerWithAddress, addr1:SignerWithAddress, addr2:SignerWithAddress

import { MyV2FlashLoan, IWETH } from "../../typechain-types/index"

// kovan
// const wethAddr = "0xd0A1E359811322d97991E03f863a0C30C2cF029C"
// const AddressPrivider = "0x88757f2f99175387aB4C6a4b3067c77A695b0349"

// mainnet
const wethAddr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
const AddressPrivider = "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5"

describe("testing for ", async () => {
    let contract: MyV2FlashLoan
    let weth: IWETH

    beforeEach(async () => {
        [owner,addr1,addr2,] = await ethers.getSigners()

        const C1 = await ethers.getContractFactory("MyV2FlashLoan")
        contract = (await C1.deploy(AddressPrivider)) as MyV2FlashLoan
        await contract.deployed()

        weth = (await ethers.getContractAt("IWETH", wethAddr))
    })

    describe("myFlashLoanCall", async() => {
        it("success", async () => {
            console.log(owner.address)
            console.log(contract.address)

            await weth.deposit({value: utils.parseEther("0.1")})
            console.log((await weth.balanceOf(owner.address)).toString())

            await weth.transfer(contract.address, utils.parseEther("0.1"))
            console.log((await weth.balanceOf(contract.address)).toString())

            const assets = [wethAddr]
            const amounts = [utils.parseEther("0.1")]
            const modes = [0]

            await contract.myFlashLoanCall(assets, amounts, modes)
            console.log((await weth.balanceOf(contract.address)).toString())
        })
    })

})
