const express = require('express'); 
const {auth, resolver, loaders} = require('@iden3/js-iden3-auth')
const getRawBody = require('raw-body')

const app = express();
const port = 8080;

app.get("/api/sign-in", (req, res) => {
    console.log('get Auth Request');
    GetAuthRequest(req,res);
});

app.post("/api/callback", (req, res) => {
    console.log('callback');
    Callback(req,res);
});

app.listen(port, () => {
    console.log('server running on port 8080');
});

// Create a map to store the auth requests and their session IDs
const requestMap = new Map();

// Sign in endpoint

async function GetAuthRequest(req,res) {

    // Audience is verifier id
    const hostUrl = "<NGROK_URL>";
    const sessionId = 1;
    const callbackURL = "/api/callback"
    const audience = "did:polygonid:polygon:mumbai:2qDyy1kEo2AYcP3RT4XGea7BtxsY285szg6yP9SPrs"

    const uri = `${hostUrl}${callbackURL}?sessionId=${sessionId}`;

    // Generate request for basic authentication
    const request = auth.createAuthorizationRequest(
        'test flow',
        audience,
        uri,
    );

    request.id = '7f38a193-0918-4a48-9fac-36adfdb8b542';
    request.thid = '7f38a193-0918-4a48-9fac-36adfdb8b542';

    // Add request for a specific proof
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
            /*
            position: {
              $eq: pos
            }
            */
          },
      },
    };
    const req = request.body.scope = [...scope, proofRequest];

    // Store auth request in map associated with session ID
    requestMap.set(`${sessionId}`, request);

    return res.status(200).set('Content-Type', 'application/json').send(request);
}