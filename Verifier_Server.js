import express from 'express'; 
import { auth, resolver, loaders } from '@iden3/js-iden3-auth';
import getRawBody from 'raw-body';
import { GetAuthRequest, Callback }  from './Verifier_functions.js';
import cors from 'cors';

    
const app = express();
app.use(cors());

const port = 8080;

// Create a map to store the auth requests and their session IDs
const requestMap = new Map();

app.get("/api/sign-in", async (req, res) => {
    console.log('get Auth Request');
    const ret = await GetAuthRequest(req,res);
    res.status(200).set('Content-Type', 'application/json').send(ret);
});

app.post("/api/callback", (req, res) => {
    console.log('callback');
    Callback(req,res);
});

app.listen(port, () => {
    console.log('server running on port 8080');
});


