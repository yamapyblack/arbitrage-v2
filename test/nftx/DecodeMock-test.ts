import "@nomiclabs/hardhat-waffle"
import { ethers, network } from 'hardhat'
import { expect, use } from 'chai'
import { utils } from "ethers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address"

let owner:SignerWithAddress, addr1:SignerWithAddress, addr2:SignerWithAddress

import { DecodeMock } from "../../typechain-types/index"

describe("testing for ", async () => {
    let contract: DecodeMock

    beforeEach(async () => {
        [owner,addr1,addr2,] = await ethers.getSigners()

        const C1 = await ethers.getContractFactory("DecodeMock")
        contract = (await C1.deploy()) as DecodeMock
        await contract.deployed()
    })

    describe("DecodeMock-test", async() => {
        it("success", async () => {
            const abi = new ethers.utils.AbiCoder()
            const params = abi.encode(["uint256","string"], [123,"fuga"])

            // const encodedData = encodeParameters(["uint256"], [123])
            // ethers.utils.arrayify(encodedData)
            await contract.executeDecode(params)
        })

    })

})
