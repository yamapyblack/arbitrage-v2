// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.8.15;

import { FlashLaonAaveV2Base } from "./FlashLaonAaveV2Base.sol";
import {INFTXMarketplaceZap} from "./interfaces/INFTXMarketplaceZap.sol";
import {IWETH} from "./interfaces/IWETH.sol";
import "hardhat/console.sol";

contract FlashLoanNFTX is FlashLaonAaveV2Base {

    address constant nftx = 0x0fc584529a2AEfA997697FAfAcbA5831faC0c22d;
    address constant weth = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    constructor(address _addressProvider) FlashLaonAaveV2Base(_addressProvider) {
    }

    function _executeOperation(
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata premiums,
        address initiator,
        bytes calldata params
    ) internal override {
        (uint256 vaultId, uint256 amount, uint256[] memory specificIds, uint256 val, address[] memory path, address to) = abi.decode(params, (uint256, uint256, uint256[], uint256, address[], address));
        console.log(vaultId);
        console.log(amount);
        console.log(val);
        console.log(to);
        for(uint8 i = 0; i < specificIds.length; i++){
            console.log(specificIds[i]);
        }
        for(uint8 j = 0; j < path.length; j++){
            console.log(path[j]);
        }

        require(IWETH(weth).approve(nftx, val), "failed approve");

        INFTXMarketplaceZap(nftx).buyAndRedeemWETH(
            vaultId, 
            amount,
            specificIds,
            val,
            path,
            to
        );
    }

}
