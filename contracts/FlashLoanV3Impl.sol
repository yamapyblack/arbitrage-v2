// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

import "./FlashLoanV3Base.sol";

contract FlashLoanV3Impl is FlashLoanV3Base {

    constructor(address _addressProvider) FlashLoanV3Base(_addressProvider) {
    }

    function _executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) internal override
    {}

}