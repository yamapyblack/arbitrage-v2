// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

import "./IPool.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FlashloanV3Mock is Ownable{
    address PoolAddress;

    constructor(address _PoolAddress) {
        PoolAddress = _PoolAddress;
    }

    function executeOperation(
        address _asset,
        uint256 _amount,
        uint256 _premium,
        address _initiator,
        bytes calldata _params
  ) external returns (bool)
    {

        //
        // Your logic goes here.
        // 

        IERC20(_asset).approve(address(PoolAddress), _amount+_premium);
        return true;
    }

    function flashloan(address _asset, uint _amount) public onlyOwner {
        bytes memory data = "";
        IPool(PoolAddress).flashLoanSimple(
          address(this), 
          _asset, 
          _amount, 
          data, 
          0
        );
    }

}