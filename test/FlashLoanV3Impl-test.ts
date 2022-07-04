import "@nomiclabs/hardhat-waffle"
import { ethers, network } from 'hardhat'
import { expect, use } from 'chai'
import { BigNumberish, BytesLike, PayableOverrides, utils, ContractTransaction, BigNumber } from "ethers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address"

let owner:SignerWithAddress, addr1:SignerWithAddress, addr2:SignerWithAddress

import { FlashLoanV3Impl, IWETH } from "../typechain-types/index"

// optimism
const wethAddr = "0x4200000000000000000000000000000000000006"
const pool = "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb"

describe("testing for ", async () => {
    let contract: FlashLoanV3Impl
    let weth: IWETH

    beforeEach(async () => {
        [owner,addr1,addr2,] = await ethers.getSigners()

        const C1 = await ethers.getContractFactory("FlashLoanV3Impl")
        contract = (await C1.deploy(pool)) as FlashLoanV3Impl
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

            const asset = wethAddr
            const amount = utils.parseEther("0.1")

            const abi = new ethers.utils.AbiCoder()
            const params = abi.encode(["uint256"], [0])

            await contract.flashloan(asset, amount, params)
            console.log((await weth.balanceOf(contract.address)).toString())
        })
    })

})
