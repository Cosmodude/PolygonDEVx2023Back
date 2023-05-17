const express = require('express'); 
const { auth, resolver, loaders } = require('@iden3/js-iden3-auth');
const getRawBody = require('raw-body');
import { GetAuthRequest, Callback } from './Verifier_functions.js';


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
