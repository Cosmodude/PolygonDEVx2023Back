const { auth, resolver, protocol, loaders, circuits } = require('@iden3/js-iden3-auth')

const proofRequest: protocol.ZKPRequest = {
    id: 1,
    circuitId: 'credentialAtomicQuerySigV2',
    query: {
      allowedIssuers: ['*'],
      type: 'EmployeeConfirmation',
      context: 'https://raw.githubusercontent.com/Cosmodude/Gyre_DID/main/EmployeeSchema.jsonld#EmployeeConfirmation',
      credentialSubject: {
        birthday: {
          $lt: 20000101,
        },
      },
  },
};
request.body.scope = [...scope, proofRequest];