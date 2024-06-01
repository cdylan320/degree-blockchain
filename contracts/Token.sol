// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./0xcert/tokens/nf-token-metadata.sol";
import "./ownership/ownable.sol";

contract degNFT is NFTokenMetadata, Ownable {
    constructor() {
        nftName = "Degree NFT";
        nftSymbol = "DEG";
    }

    function mint(
        address _to,
        uint256 _tokenId,
        string calldata _uri
    ) internal onlyOwner {
        super._mint(_to, _tokenId);
        super._setTokenUri(_tokenId, _uri);
    }
}
