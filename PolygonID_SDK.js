const { auth, resolver, protocol, loaders, circuits } = require('@iden3/js-iden3-auth')

const org = "Gyre";
const pos = "Developer"

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
request.body.scope = [...scope, proofRequest];