const { auth, resolver, protocol, loaders, circuits } = require('@iden3/js-iden3-auth');


// Request !!!
const org = "Gyre";
const pos = "Developer";

const proofRequest: protocol.ZKPRequest = {
    id: 1,  // should be unique for every request
    circuitId: 'credentialAtomicQuerySigV2',
    query: {
      allowedIssuers: ['*'],
      type: 'EmployeeConfirmation',
      context: 'https://raw.githubusercontent.com/Cosmodude/Gyre_DID/main/EmployeeSchema.jsonld#EmployeeConfirmation',
      credentialSubject: {
        organization: {
          $eq: org,
        },
        position: {
          $eq: pos
        }
      },
  },
};
const req = request.body.scope = [...scope, proofRequest];

// Verification !!!

const getRawBody = require('raw-body');
const keyDIR = "./keys";
const ethURL = "https://polygon-testnet-rpc.allthatnode.com:8545";  // need the real address
const contractAddress = "0x134B1BE34911E39A8397ec6289782989729807a4";

const raw = await getRawBody(req);
const tokenStr = raw.toString().trim();

const verificationKeyloader = new loaders.FSKeyLoader(keyDIR); // verification key loader which is used to fetch the verification keys necessary to verify a zero knowledge proof.
const sLoader = new loaders.UniversalSchemaLoader('ipfs.io');

const ethStateResolver = new resolver.EthStateResolver( // resolver which is used to fetch the identity state from the State Smart Contract
    ethURL,
    contractAddress,
);

const resolvers: resolver.Resolvers = {  
    ['polygon:mumbai']: ethStateResolver,
};

const verifier = new auth.Verifier(  // instance of a Verifier
verificationKeyloader,
sLoader, 
resolvers,
);