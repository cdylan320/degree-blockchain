# Educational Degree NFT DApp

## Overview

This DApp enables educational institutions to issue and manage digital degrees securely on the Ethereum blockchain as non-fungible tokens (NFTs). The DApp consists of two smart contracts: `Degree.sol` and `Token.sol`.

## Smart Contracts

### `Degree` Contract

- **Token Minting:** Admin users can mint unique tokens representing degrees and associate them with specific student addresses. Each token is minted with a unique ID derived from the student's address.
- **Admin Management:** The contract allows the designation of administrators who have the authority to perform privileged actions such as setting other admins, adding students, marking students as graduated, and managing courses.
- **Student Management:** Admins can add students to the system, associating them with their Ethereum addresses and names. The contract keeps track of each student's graduation status and courses.
- **Course Management:** Admins can add courses for students, including the course name and associated GPA. Students can view their enrolled courses and hide or reveal specific courses as needed.

### `Token` Contract

- **ERC-721 Compliance:** Adheres to ERC-721 for creating and managing NFTs.
- **Metadata Support:** Utilizing the NFTokenMetadata contract, degNFT supports associating metadata, such as a URI, with each NFT. This allows additional information about each degree, such as details regarding the degree holder and the associated educational institution, to be stored off-chain.
- **Ownership Management:** Only an admin or the entity deploying the contract can mint NFTs.

## How it Works

1. Admins use `Degree.sol` to mint NFTs for students.
2. `Token.sol` manages NFT metadata with details about the degree and holder.
3. Students and admins interact with the DApp to manage courses and graduation status.

### Use Case Diagram
![image](https://github.com/dcnorkai/Blockchain-Degree/assets/54694121/2081ad56-fc69-491b-bf2b-bb12f37f0285)

## Getting Started

1. Deploy `Degree.sol` and `Token.sol` on Ethereum.
2. Interact with the DApp using an Ethereum wallet or DApp browser.

## Dependencies

- `0xcert/ethereum-erc721`: ERC-721 implementation.
- Solidity ^0.8.0: Smart contract development language.

## License

This project is licensed under the MIT License - see [LICENSE.md](LICENSE.md) for details.
