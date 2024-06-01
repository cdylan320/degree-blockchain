import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import DegreeContract from './contracts/Degree.json';
import NFTContract from './contracts/degNFT.json';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [degreeContract, setDegreeContract] = useState(null);
  const [nftContract, setNFTContract] = useState(null);
  const [degreeContractAddress, setDegreeContractAddress] = useState('');
  const [nftContractAddress, setNFTContractAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [tokenURI, setTokenURI] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        // Initialize web3
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
        setWeb3(web3);

        // Get accounts
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);

        // Get network ID
        const networkId = await web3.eth.net.getId();

        // Get Degree contract instance
        const deployedNetwork = DegreeContract.networks[networkId];
        if (deployedNetwork) {
          const instance = new web3.eth.Contract(
            DegreeContract.abi,
            deployedNetwork.address,
          );
          setDegreeContract(instance);
          setDegreeContractAddress(deployedNetwork.address);
          console.log('Degree contract instance:', instance);
        } else {
          console.error('Degree contract not deployed on this network.');
        }

        // Get NFT contract instance
        const deployedNFTNetwork = NFTContract.networks[networkId];
        if (deployedNFTNetwork) {
          const instance = new web3.eth.Contract(
            NFTContract.abi,
            deployedNFTNetwork.address,
          );
          setNFTContract(instance);
          setNFTContractAddress(deployedNFTNetwork.address);
          console.log('NFT contract instance:', instance);
        } else {
          console.error('NFT contract not deployed on this network.');
        }
      } catch (error) {
        console.error('Could not connect to web3 or contracts.', error);
      }
    };

    init();
  }, []);

  const mintNFT = async () => {
    try {
      setStatus('Minting NFT...');
      console.log(`Minting NFT with tokenId: ${tokenId} and tokenURI: ${tokenURI}`);
      await nftContract.methods.mint(accounts[0], tokenId, tokenURI).send({ from: accounts[0] });
      setStatus('NFT minted successfully!');
      console.log('NFT minted successfully!');
    } catch (error) {
      console.error('Error minting NFT:', error);
      setStatus(`Error minting NFT: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Blockchain Degree DApp</h1>
      <p>Connected Account: {accounts[0]}</p>
      <p>Degree Contract Address: {degreeContractAddress}</p>
      <p>NFT Contract Address: {nftContractAddress}</p>

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
      <p>{status}</p>
    </div>
  );
};

export default App;
