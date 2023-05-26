// CREATE CONTRACT Metadata
import { config as loadEnv } from 'dotenv';
import { SDK, Auth, TEMPLATES, Metadata } from '@infura/sdk';
loadEnv();

const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/1/18/Ipfs-logo-1024-ice-text.png";
const defaultLink = "https://docs.infura.io/infura/";

// Create Auth object
const auth = new Auth({
    projectId: process.env.INFURA_PROJECT_ID,
    secretId: process.env.INFURA_PROJECT_SECRET,
    privateKey: process.env.WALLET_PRIVATE_KEY,
    rpcUrl: process.env.EVM_RPC_URL,
    chainId: 5, // Goerli
    ipfs: {
      projectId: process.env.INFURA_IPFS_PROJECT_ID,  // corrected mistake in a key
      apiKeySecret: process.env.INFURA_IPFS_PROJECT_SECRET,
    }
  });

// Instantiate SDK
const sdk = new SDK(auth);

// STORES FILES on IPFS
async function Store_File(filepath:string ) {
    const storedFile = await sdk.storeFile({ metadata: filepath});
    console.log('storeImageUrl ----', storedFile);
    return storedFile; // returns IPFS hash of the stored file (string)
};

// STORES TOKEN METADATA on IPFS
async function Store_Metadata(name: string, image = defaultImage, link =defaultLink) {
    const collectionMetadata = Metadata.openSeaCollectionLevelStandard({
        name: `${name}'s POM`,  //PORN
        description: `Tokens proving your connection with ${name}`,
        image: await sdk.storeFile({
            metadata: image,
        }),
        external_link: link,  //'https://www.linkedin.com/in/vladislav-lenskii-393697237/'
    });
    const storeMetadata = await sdk.storeMetadata({ metadata: collectionMetadata });
    return storeMetadata;  // returns IPFS hash of the stored data (string)
};

// STORES ARRAY of medata on IPFS
async function storeFolder(names: string[], imageLinks: string[], link = defaultLink) { 
    const storeArrayMetadata = await sdk.createFolder({  // fixed problems with arguments
        metadata: [
            Metadata.openSeaTokenLevelStandard({
                description: "description",
                external_url: link,
                image: await sdk.storeFile(
                    { metadata: imageLinks[0] }
                ),
                name: names[0],
                attributes: [],
            }),
        ],
        isErc1155: true,
    });
    console.log('storeArrayMetadata: ', storeArrayMetadata);
    return storeArrayMetadata;
}