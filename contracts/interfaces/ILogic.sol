// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ILogic {
    function executeLogic(
        bytes calldata params
    ) external returns(bool);

}
