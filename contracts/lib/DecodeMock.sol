// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.8.15;

import "hardhat/console.sol";

contract DecodeMock {

    function executeDecode(
        bytes calldata params
    )
        external
        view
        returns(bool)
    {
        (uint256 val1, string memory val2) = abi.decode(params, (uint256, string));
        console.log(val1);
        console.log(val2);

        return true;
    }

}
