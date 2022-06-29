// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.8.15;

import { FlashLoanReceiverBase } from "./aave/FlashLoanReceiverBase.sol";
import { ILendingPool, ILendingPoolAddressesProvider } from "./aave/Interfaces.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./lib/Withdrawable.sol";
import "./lib/ERC721Receiver.sol";

abstract contract FlashLaonAaveV2Base is FlashLoanReceiverBase, Ownable, Pausable, Withdrawable, ERC721Receiver {

    constructor(address _addressProvider) FlashLoanReceiverBase(ILendingPoolAddressesProvider(_addressProvider)) {
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function _executeOperation(
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata premiums,
        address initiator,
        bytes calldata params
    ) internal virtual
    {}

    function executeOperation(
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata premiums,
        address initiator,
        bytes calldata params
    )
        whenNotPaused
        external
        override
        returns (bool)
    {
        _executeOperation(assets,amounts,premiums,initiator,params);

        // Approve the LendingPool contract allowance to *pull* the owed amount
        for (uint i = 0; i < assets.length; i++) {
            uint amountOwing = amounts[i] + premiums[i];
            IERC20(assets[i]).approve(address(LENDING_POOL), amountOwing);
        }

        return true;
    }

    function myFlashLoanCall(address[] memory assets, uint[] memory amounts, uint[] memory modes, bytes memory params) public onlyOwner {
        address receiverAddress = address(this);

        address onBehalfOf = address(this);
        // bytes memory params = "";
        uint16 referralCode = 0;

        LENDING_POOL.flashLoan(
            receiverAddress,
            assets,
            amounts,
            modes,
            onBehalfOf,
            params,
            referralCode
        );
    }
}
