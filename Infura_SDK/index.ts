// Import the libraries and load the environment variables.
import { config as loadEnv } from 'dotenv';
import { SDK, Auth, TEMPLATES, Metadata } from '@infura/sdk';
loadEnv();

// Create Auth object
const auth = new Auth({
    projectId: process.env.INFURA_API_KEY,
    secretId: process.env.INFURA_API_KEY_SECRET,
    privateKey: process.env.WALLET_PRIVATE_KEY,
    chainId: 80001,
});

// Instantiate SDK
const sdk = new SDK(auth);
const getCollectionsByWallet = async (walletAddress: string)=> {
    const result = await sdk.api.getCollectionsByWallet({
        walletAddress: walletAddress,
      });
      console.log('collections:', result);
}

/*
(async() => {
    try {
      await getCollectionsByWallet('0x6f9e2777D267FAe69b0C5A24a402D14DA1fBcaA1');
    } catch (error) {
      console.log(error);
   }
})();
*/

async function contractDeploy() {
  const newContractERC1155 = await sdk.deploy({
    template: TEMPLATES.ERC1155Mintable,
    params: {
      baseURI: 'ipfs://QmXv6qJjFfk3vXCktcqrD2M37jxSnQHeHqDjsZueamYbmj/', //URI (identifier) for Metadata Storage
      // Each token's URI = baseURI + tokenId
      contractURI: 'ipfs://Qmdtyqjx5ha9dBda6ZE5dc2N4vB8oAZYrLhGQj5jAah2RF/1.json', // whole collectionMetadata URI
      ids: [0, 1],
    },
  });
  console.log('Contract: ', newContractERC1155.contractAddress);
  return newContractERC1155;
}


// to work with existing contract in separate environment 
async function getContract(address: string) {
  const existingContract = await sdk.loadContract({
    template: TEMPLATES.ERC1155Mintable,
    contractAddress: address,
  });
  console.log('contract: \n', existingContract);
  return existingContract;
}

const deployed = await contractDeploy();
getContract(deployed.contractAddress);

  