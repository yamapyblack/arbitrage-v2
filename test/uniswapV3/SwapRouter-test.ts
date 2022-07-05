import "@nomiclabs/hardhat-waffle"
import { ethers, network } from 'hardhat'
import { expect, use } from 'chai'
import { utils } from "ethers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address"

let owner:SignerWithAddress, addr1:SignerWithAddress, addr2:SignerWithAddress

import { ISwapRouter, IWETH, ISwapRouter02, IV3SwapRouter } from "../../typechain-types/index"
import { IERC20 } from "../../typechain-types/@openzeppelin/contracts/token/ERC20/IERC20"

// optimism
const Router = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45" // SwapRouter02
// const Router = "0xE592427A0AEce92De3Edee1F18E0157C05861564" // SwapRouter
const wETH = "0x4200000000000000000000000000000000000006"
const sUSD = "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9"

describe("testing for ", async () => {
    let contract: ISwapRouter02
    let weth: IWETH
    let susd: IERC20
    let param: IV3SwapRouter.ExactInputSingleParamsStruct

    beforeEach(async () => {
        [owner,addr1,addr2,] = await ethers.getSigners()

        contract = (await ethers.getContractAt("ISwapRouter02", Router))
        weth = (await ethers.getContractAt("IWETH", wETH))
        susd = (await ethers.getContractAt("IERC20", sUSD))
    })

    describe("ExchangeRates-test", async() => {
        it("success", async () => {
            await weth.deposit({value: utils.parseEther("1.5")})
            await weth.approve(contract.address, ethers.utils.parseEther("1.5"))

            // Note that fee is in hundredths of basis points (e.g. the fee for a pool at the 0.3% tier is 3000; the fee for a pool at the 0.01% tier is 100).
            param = {
                tokenIn: wETH,
                tokenOut: sUSD,
                fee: 3000,// 0.3%
                recipient: owner.address,
                // deadline: 99999999999, // ISwapRouterとIV3SwapRouterではパラメータが異なるので注意！
                amountIn: ethers.utils.parseEther("1"),
                amountOutMinimum: ethers.utils.parseEther("1000"),
                sqrtPriceLimitX96: 0,
            }
                    
            await contract.exactInputSingle(param)
            console.log((await susd.balanceOf(owner.address)).toString())
        })

    })

})
