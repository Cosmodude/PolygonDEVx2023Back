import express from 'express'; 
import { auth, resolver, loaders } from '@iden3/js-iden3-auth';
import getRawBody from 'raw-body';
import { GetAuthRequest, Callback }  from './Verifier_functions.js';
import cors from 'cors';
import { addTokens, mintTokens } from './Infura_SDK/SmartContract_Methods.ts'

    
const app = express();
app.use(cors());

const port = 8080;


// Create a map to store the auth requests and their session IDs
const requestMap = new Map();
let ids = 0;

app.get("/api/sign-in", async (req, res) => {
    console.log('get Auth Request');
    const ret = await GetAuthRequest(req,res);
    res.status(200).set('Content-Type', 'application/json').send(ret);
});

app.post("/api/callback", (req, res) => {
    console.log('callback');
    Callback(req,res);
});

// Latest contract address: 0x51cFe6e6Bb7E7Be72503343aea7238aC6136EE67
const contractAddress = "0x51cFe6e6Bb7E7Be72503343aea7238aC6136EE67";
app.post("/api/createPOM", () => {
    console.log('Creating POM');
    addTokens(contractAddress, [ids]);
    ids += 1;
    //console.log(addtx.hash)
});

app.post("/api/claimPOM", () => {
    console.log('Claiming POM...');
    mintTokens(contractAddress,"", ids-1, 1);
});

app.listen(port, () => {
    console.log('server running on port 8080');
});


