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
      context: 'https://raw.githubusercontent.com/Cosmodude/Gyre_DID/main/schema/EmployeeSchema.jsonld#EmployeeConfirmation',
      credentialSubject: {
        organization: {
          $eq: org,
        },
        /*
        position: {
          $eq: pos
        }
        */
      },
  },
};
const req = request.body.scope = [...scope, proofRequest];

// Verification !!!

// Unpack the proof
const getRawBody = require('raw-body');
const keyDIR = "./keys";  // needs to be set and downloaded  (set)
const ethURL = "https://polygon-mumbai.infura.io/v3/0cbd49cd77ed4132b497031ffc95da6a";  // need the real address of RPC node provider
const contractAddress = "0x134B1BE34911E39A8397ec6289782989729807a4";

const raw = await getRawBody(req);
const tokenStr = raw.toString().trim();

//  Initiate the verifier
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

// Execute the verification
let authResponse: protocol.AuthorizationResponseMessage;
//verifies that the proof shared by the user
//satisfies the criteria set by the Verifier inside the initial request.
const opts: VerifyOpts = {
    AcceptedStateTransitionDelay: 5 * 60 * 1000, // 5 minute
  };

authResponse = await verifier.fullVerify(tokenStr, proofRequest, opts); // authRequest  = proofRequest