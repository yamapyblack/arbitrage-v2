// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract Withdrawable is Ownable {

    constructor() {}

    function withdrawEther() public onlyOwner() payable {
        payable(msg.sender).transfer(address(this).balance);
    }

    function withdrawERC20(
        address _contract
    ) public onlyOwner() {
        require(_contract !=  address(0), "Withdrawable: contract address is zero");

        IERC20 erc20 = IERC20(_contract);
        erc20.transfer(msg.sender, erc20.balanceOf(address(this)));
    }

    function withdrawERC721(
        address _contract, uint[] calldata tokenIds
    ) public onlyOwner() {
        require(_contract !=  address(0), "Withdrawable: contract address is zero");

        IERC721 erc721 = IERC721(_contract);
        for(uint8 i; i < tokenIds.length; i++){
            erc721.transferFrom(address(this), msg.sender, tokenIds[i]);
        }
    }

}
