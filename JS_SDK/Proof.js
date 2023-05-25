import { proving } from "@iden3/js-jwz";
import { getCurveFromName } from "ffjavascript";
import * as dotenv from 'dotenv' 
dotenv.config()
import { base64url as base64 } from "rfc4648"; 
import pkg from '@0xpolygonid/js-sdk';
/* import {
  BjjProvider,
  CredentialStorage,
  CredentialWallet,
  defaultEthConnectionConfig,
  EthStateStorage,
  ICredentialWallet,
  IDataStorage,
  Identity,
  IdentityCreationOptions,
  IdentityStorage,
  IdentityWallet,
  IIdentityWallet,
  InMemoryDataSource,
  InMemoryMerkleTreeStorage,
  InMemoryPrivateKeyStore,
  KMS,
  KmsKeyType,
  Profile,
  W3CCredential,
  CredentialRequest,
  EthConnectionConfig,
  CircuitStorage,
  CircuitData,
  FSKeyLoader,
  CircuitId,
  IStateStorage,
  ProofService,
  ZeroKnowledgeProofRequest,
  PackageManager,
  AuthorizationRequestMessage,
  PROTOCOL_CONSTANTS,
  AuthHandler,
  AuthDataPrepareFunc,
  StateVerificationFunc,
  DataPrepareHandlerFunc,
  VerificationHandlerFunc,
  IPackageManager,
  VerificationParams,
  ProvingParams,
  ZKPPacker,
  PlainPacker,
  ICircuitStorage,
  core,
  ZKPRequestWithCredential,
  CredentialStatusType,
} from "@0xpolygonid/js-sdk"; */
import { ethers } from "ethers";
import path from "path";

const rhsUrl = process.env.RHS_URL;
const rpcUrl = process.env.RPC_URL;
const contractAddress = process.env.CONTRACT_ADDRESS;
const walletKey = process.env.WALLET_KEY;
