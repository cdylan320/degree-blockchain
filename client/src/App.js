import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import DegreeContract from './contracts/Degree.json';
import NFTContract from './contracts/degNFT.json';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [degreeContract, setDegreeContract] = useState(null);
  const [nftContract, setNFTContract] = useState(null);

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

  return (
    <div>
      <h1>Blockchain Degree DApp</h1>
      <p>Connected Account: {accounts[0]}</p>
      
      {/* Add more UI elements to interact with the contracts */}
    </div>
  );
};

export default App;
