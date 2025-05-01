// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./BaseNFT.sol";

contract NFTGenerator is BaseNFT {
    uint256 public currentId = 0;

    constructor() BaseNFT("MyNFT", "MNFT") {}

    function generateNFT(string memory metadataURI) external returns (uint256) {
        currentId++;
        _mint(msg.sender, currentId);
        _setTokenURI(currentId, metadataURI);
        return currentId;
    }

    function getCurrentId() external view returns (uint256) {
        return currentId;
    }
}
