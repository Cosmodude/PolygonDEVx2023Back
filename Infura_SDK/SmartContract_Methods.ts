// Import the libraries and load the environment variables.
import { config as loadEnv } from 'dotenv';
import { SDK, Auth, TEMPLATES, Metadata } from '@infura/sdk';
loadEnv();

// Create Auth object
const auth = new Auth({
    projectId: process.env.INFURA_API_KEY,
    secretId: process.env.INFURA_API_KEY_SECRET,
    privateKey: process.env.WALLET_PRIVATE_KEY,
    chainId: 80001,   // change network here
});

// Instantiate SDK
const sdk = new SDK(auth);

// Get NFT collections
const getCollectionsByWallet = async (walletAddress: string)=> {
    const result = await sdk.api.getCollectionsByWallet({
        walletAddress: walletAddress,
      });
      console.log('collections:', result);
}



async function deployContract() {
  const newContractERC1155 = await sdk.deploy({
    template: TEMPLATES.ERC1155Mintable,
    params: {
      baseURI: 'ipfs://Qmdtyqjx5ha9dBda6ZE5dc2N4vB8oAZYrLhGQj5jAah2RF/', //URI (identifier) for Metadata Storage
      // Each token's URI = baseURI + tokenId
      contractURI: 'ipfs://Qmdtyqjx5ha9dBda6ZE5dc2N4vB8oAZYrLhGQj5jAah2RF/1.json', // whole collectionMetadata URI
      ids: [0, 1],
    },
  });
  console.log('Contract: ', newContractERC1155.contractAddress);
  return newContractERC1155;
}


// to work with existing contract in separate environment 
export async function getContract(contractAddress: string) {
  const existingContract = await sdk.loadContract({
    template: TEMPLATES.ERC1155Mintable,
    contractAddress: contractAddress,
  });
  console.log('contract: \n', existingContract);
  return existingContract;
}

// Adds tokens (ids) to the contract 
export async function addTokens(contractAddress: string, ids: number[]) {
  const existingContract = await sdk.loadContract({
    template: TEMPLATES.ERC1155Mintable,
    contractAddress: contractAddress,
  });
  const tx = await existingContract.addIds({
    ids: ids,
  });
  return tx;
}

export async function mintTokens(contractAddress: string, to=process.env.WALLET_PUBLIC_ADDRESS, id: number, amount: number) {
  const existingContract = await sdk.loadContract({
    template: TEMPLATES.ERC1155Mintable,
    contractAddress: contractAddress,
  });

  const mint = await existingContract.mint({
    to: to,
    id: id,
    quantity: amount,
    gas: 5000,  // required for Polygon and Mumbai networks, optional for the other networks
  });
  
  const minted = await mint.wait();
  console.log(minted);
  return minted;
}

/*
export async function setBaseURI(newURI: string) {
  const baseURI = await sdk.setBaseURI({
    baseURI: newURI,
    gas: 5000,
});
console.log(baseURI);
}
*/

export async function addAdmin(adminaddress: string, contractAddress: string) {
  const existingContract = await sdk.loadContract({
    template: TEMPLATES.ERC1155Mintable,
    contractAddress: contractAddress,
  });

  const newAdmin = await existingContract.addAdmin({
    publicAddress: adminaddress
  });
  console.log(newAdmin);
  return newAdmin;
}


// Latest contract address: 0x51cFe6e6Bb7E7Be72503343aea7238aC6136EE67

// Mikhail public address 0x6CF3b3418241B621dD2c59d2f4058dEB78FF2054

//const deployed = await deployContract();
//getContract(deployed.contractAddress);
//console.log("tx: ",await addTokens(deployed.contractAddress, [1000]) )
  
