import "@nomiclabs/hardhat-waffle"
import { ethers, network } from 'hardhat'
import { expect, use } from 'chai'
import { utils } from "ethers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address"

let owner:SignerWithAddress, addr1:SignerWithAddress, addr2:SignerWithAddress

import { INFTXMarketplaceZap, IWETH, IERC721 } from "../../typechain-types/index"

// kovan
// const wethAddr = "0xd0A1E359811322d97991E03f863a0C30C2cF029C"

// mainnet
const wethAddr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
const nftx = "0x0fc584529a2AEfA997697FAfAcbA5831faC0c22d"
const galFt = "0x1f104e7b11a6f5b4a15A438E0a107954afD7769F"
const galNft = "0x582048C4077a34E7c3799962F1F8C5342a3F4b12"

describe("testing for ", async () => {
    let contract: INFTXMarketplaceZap
    let weth: IWETH
    let nft: IERC721

    beforeEach(async () => {
        [owner,addr1,addr2,] = await ethers.getSigners()

        weth = (await ethers.getContractAt("IWETH", wethAddr))
        contract = (await ethers.getContractAt("INFTXMarketplaceZap", nftx))
        nft = (await ethers.getContractAt("IERC721", galNft))        
    })

    describe("NFTX-test", async() => {
        it("success", async () => {

            const vaultId = 438
            const amount = 1
            const specificIds: any[] = []
            const path = [wethAddr, galFt]
            const to = owner.address
        
            await contract.buyAndRedeem(vaultId, amount, specificIds, path, to, {value: utils.parseEther("0.3")})
            console.log((await nft.balanceOf(owner.address)).toString())
        })

        it("success weth", async () => {
            const val = utils.parseEther("0.3")
            await weth.deposit({value: val})
            await weth.approve(contract.address, val)

            const vaultId = 438
            const amount = 1
            const specificIds: any[] = []
            const path = [wethAddr, galFt]
            const to = owner.address

            await contract.buyAndRedeemWETH(vaultId, amount, specificIds, val, path, to)
            console.log((await nft.balanceOf(owner.address)).toString())
        })

        
    })

})
