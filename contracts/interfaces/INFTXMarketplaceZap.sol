// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface INFTXMarketplaceZap {

  function buyAndRedeem(
    uint256 vaultId, 
    uint256 amount,
    uint256[] calldata specificIds, 
    address[] calldata path,
    address to
  ) external payable;

}
