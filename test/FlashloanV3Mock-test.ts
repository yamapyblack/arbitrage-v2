import "@nomiclabs/hardhat-waffle"
import { ethers, network } from 'hardhat'
import { expect, use } from 'chai'
import { BigNumberish, BytesLike, PayableOverrides, utils, ContractTransaction, BigNumber } from "ethers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address"

let owner:SignerWithAddress, addr1:SignerWithAddress, addr2:SignerWithAddress

import { FlashloanV3Mock, IWETH } from "../typechain-types/index"

// optimism
const wethAddr = "0x4200000000000000000000000000000000000006"
const pool = "0x794a61358D6845594F94dc1DB02A252b5b4814aD"

describe("testing for ", async () => {
    let contract: FlashloanV3Mock
    let weth: IWETH

    beforeEach(async () => {
        [owner,addr1,addr2,] = await ethers.getSigners()

        const C1 = await ethers.getContractFactory("FlashloanV3Mock")
        contract = (await C1.deploy(pool)) as FlashloanV3Mock
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

            const assets = wethAddr
            const amounts = utils.parseEther("0.1")

            // const abi = new ethers.utils.AbiCoder()
            // const params = abi.encode(["uint256"], [0])

            await contract.flashloan(assets, amounts)
            console.log((await weth.balanceOf(contract.address)).toString())
        })
    })

})
