# Nimble-Logistic-Contract

# ChainCode Structure

In the Logistic Contract Chain Code there are two Contracts built in working cross each other.

1. Logistic Contract :- Handles the logistic process of a dispatched order from business process service.
2. Identity Contract :- Manages identities of platform users from the Peer organizations (Nimble, EFactory)

### Roles 
We have set of predefined roles in Nimble that we re use in the Chain Code.

1. PLATFORM_MANAGER :- Owners of the platform.
2. NIMBLE_USER :- Nimble User.
3. PUBLISHER :- Service or Product Providers in Nimble Platform.
4. PURCHASER :- Service or Product Purchasers in Nimble Platform.

### Logistic Contract

Logistic contract defines the basic functionality which are required for the dispatched order to travers through the logistic workflow according to the provided template during the dispatch event in the business process service.

Only the identities with `PUBLISHER` role can publish and start a logistic process. 

To Start a logistic process the PUBLISHER should provide list of organization id's who are involved in the logistic process. And all these organizations and the users who involve in the process should be a part of Nimble platform or EFPF Platform already.

Once a logistic process started at each and every point stake holders who are involved in the logistic process can change the custodian of the current purchase order. As mentioned earlier these stake holders should be agreed upon start of the logistic process and should be persisted along with the logistic process instance in the ledger.

Data related to a block chain persisted logistic process can be retrieved only by one of the stake holders or any platform owners.

Logistic process from the ledger can be deleted by only platform owners once requested by 1 or more stake holders.

### Identity Contract

Identity contract helps to manage the identities which are registered in both EFPF and Nimble Platforms. 

Later on these identities will be used on a data loss to recreate the certificates which are required for the BlockChain client to connect with the Chain Code.

One Identity has the roles attached to it which are the same in the Nimble Platform and the organizational reference as well.

Only users them self and the platform manager can delete the Identities.

## Testing 

To test locally the easiest way would be to deploy the Chaincode in the [test-network](https://github.com/hyperledger/fabric-samples/tree/master/test-network)
    
### Test methods

In both Contracts there are test methods for you to verify the contracts are working. This is really helpful when you
 are working in the CLI.
   
 ##### 1. In Logistic Contract :- InitLedger Method

##### How to invoke in test-network in fabric 
 ``
 peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n logistic-contract --peerAddresses localhost:7051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"function":"InitLedger","Args":[]}'
 ``

 ##### 2. In Identity Contract :- initIdentityLedger Method
 #####How to invoke in test-network in fabric 
 ``
 peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n logistic-contract --peerAddresses localhost:7051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"function":"initIdentityLedger","Args":[]}'
 ``
 
## Extending for other use cases.

It's pretty easy to extend this other use cases since all the main functionality of fabric is abstracted out.

We are using `"fabric-contract-api": "2.0.0"` at the moment all the State mechanism [here](./src/lib/ledger-api/statelist.ts) are defined based on it.

# Development Reference
https://github.com/IBM-Blockchain/vehicle-manufacture

# The Scaffolded with 
The basic skeleton was scaffold's with a yeoman generator provided by IBM Block-Chain Team
https://github.com/IBM-Blockchain/generator-fabric
