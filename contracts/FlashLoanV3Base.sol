// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

import {FlashLoanSimpleReceiverBase} from "./aaveV3/FlashLoanSimpleReceiverBase.sol";
import {IPoolAddressesProvider} from "./aaveV3/IPoolAddressesProvider.sol";
import {IPool} from "./aaveV3/IPool.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./lib/Withdrawable.sol";

abstract contract FlashLoanV3Base is
    FlashLoanSimpleReceiverBase,
    Ownable,
    Pausable,
    Withdrawable
{
    constructor(address _addressProvider)
        FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider))
    {}

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function _executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) internal virtual
    {}

    function executeOperation(
        address _asset,
        uint256 _amount,
        uint256 _premium,
        address _initiator,
        bytes calldata _params
    ) external override whenNotPaused returns (bool) {
        _executeOperation(_asset,_amount,_premium,_initiator,_params);

        IERC20(_asset).approve(address(POOL), _amount + _premium);
        return true;
    }

    function flashloan(
        address _asset,
        uint256 _amount,
        bytes memory _params
    ) public onlyOwner {
        POOL.flashLoanSimple(
            address(this),
            _asset,
            _amount,
            _params,
            0 //referralCode
        );
    }
}
