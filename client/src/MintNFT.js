import React, { useState } from 'react';

const MintNFT = ({ account, nftContract }) => {
  const [tokenId, setTokenId] = useState('');
  const [tokenURI, setTokenURI] = useState('');

  const mintNFT = async () => {
    if (nftContract && account) {
      try {
        await nftContract.methods.mint(account, tokenId, tokenURI).send({ from: account });
        alert('NFT Minted!');
      } catch (error) {
        console.error('Error minting NFT:', error);
      }
    }
  };

  return (
    <div>
      <h2>Mint New NFT</h2>
      <input
        type="text"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Token URI"
        value={tokenURI}
        onChange={(e) => setTokenURI(e.target.value)}
      />
      <button onClick={mintNFT}>Mint NFT</button>
    </div>
  );
};

export default MintNFT;