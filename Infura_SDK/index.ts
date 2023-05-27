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

(async() => {
    try {
      await getCollectionsByWallet('0xacdaEEb57ff6886fC8e203B9Dd4C2b241DF89b7a');
    } catch (error) {
      console.log(error);
   }
})();