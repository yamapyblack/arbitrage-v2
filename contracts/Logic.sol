// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.8.15;

import "@openzeppelin/contracts/access/Ownable.sol";
import {ILogic} from "./interfaces/ILogic.sol";
import "hardhat/console.sol";

contract Logic is ILogic, Ownable {

    address flashLoan;

    constructor(address _flashLoan) {
        setFlashLoan(_flashLoan);
    }

    function setFlashLoan(address _flashLoan) public onlyOwner {
        flashLoan = _flashLoan;
    }

    /**
        This function is called after your contract has received the flash loaned amount
     */
    function executeLogic(
        bytes calldata params
    )
        external
        override
        returns (bool)
    {
        require(msg.sender == flashLoan, "only from flashLoan executor.");

        // NFTX
        

        return true;
    }

}
