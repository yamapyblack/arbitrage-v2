import "@nomiclabs/hardhat-waffle"
import { ethers, network } from 'hardhat'
import { expect, use } from 'chai'
import { BigNumberish, BytesLike, PayableOverrides, utils, ContractTransaction, BigNumber } from "ethers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address"

let owner:SignerWithAddress, addr1:SignerWithAddress, addr2:SignerWithAddress

import { FlashLoanNFTX, IWETH, LogicNFTX , IERC721} from "../typechain-types/index"

// kovan
// const wethAddr = "0xd0A1E359811322d97991E03f863a0C30C2cF029C"
// const AddressPrivider = "0x88757f2f99175387aB4C6a4b3067c77A695b0349"

// mainnet
const wethAddr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
const AddressPrivider = "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5"
const galFt = "0x1f104e7b11a6f5b4a15A438E0a107954afD7769F"
const galNft = "0x582048C4077a34E7c3799962F1F8C5342a3F4b12"

describe("testing for ", async () => {
    let contract: FlashLoanNFTX
    let weth: IWETH
    let nft: IERC721

    beforeEach(async () => {
        [owner,addr1,addr2,] = await ethers.getSigners()

        const C1 = await ethers.getContractFactory("FlashLoanNFTX")
        contract = (await C1.deploy(AddressPrivider)) as FlashLoanNFTX
        await contract.deployed()

        weth = (await ethers.getContractAt("IWETH", wethAddr))
        nft = (await ethers.getContractAt("IERC721", galNft))        
    })

    describe("myFlashLoanCall", async() => {
        it("success", async () => {
            const val = utils.parseEther("0.3")
            await weth.deposit({value: val})
            await weth.transfer(contract.address, val)

            const assets = [wethAddr]
            const amounts = [val]
            const modes = [0]

            const vaultId = 438
            const amount = 1
            const specificIds: any[] = []
            const path = [wethAddr, galFt]
            const to = contract.address

            const abi = new ethers.utils.AbiCoder()
            const params = abi.encode(["uint256", "uint256", "uint256[]", "uint256", "address[]", "address"], [vaultId, amount, specificIds, val, path, to])
            // const params = abi.encode(["uint256"], [vaultId])

            await contract.myFlashLoanCall(assets, amounts, modes, ethers.utils.arrayify(params))

            console.log((await nft.balanceOf(contract.address)).toString())
        })
    })

})
