## Nimble-Logistic-Contract

### ChainCode Structure:

In the Logistic Contract Chain Code, there are two Smart Contracts built-in working cross each other.

1. Logistic Contract:- Handles the logistic process of a dispatched order from the business process service.
2. Identity Contract:- Manages identities of platform users from Peer organizations (Nimble, EFPF)

### Roles 

We have a set of predefined roles in Nimble that we use in the Chain Code.

1. PLATFORM_MANAGER :- Owners of the platform.
2. NIMBLE_USER :- Nimble User.
3. PUBLISHER :- Service or Product Providers in Nimble Platform.
4. PURCHASER :- Service or Product Purchasers in Nimble Platform.

### Logistic Contract

The logistic contract defines the functionality for a dispatched order from the Manufacturers end to traverse through the logistic workflow according to the provided template. The template for the logistic workflow should be provided during the dispatch event in the business process service.

Only the identities with `PUBLISHER` role can publish and start a logistic process. 

To Start a logistic process the PUBLISHER should provide list of organization id's who are involved in the logistic process. And all these organizations and the users involved in the process should be a part of the Nimble platform or EFPF Platform already.

Once a logistic process starts, Stakeholders who are involved in the logistic process can change the custodian of the current purchase order. As mentioned earlier these stakeholders should be agreed upon at the start of the logistic process and should be persisted along with the logistic process instance in the ledger.

Data related to a blockchain persisted logistic process can be retrieved only by one of the stakeholders or any platform owners.

The logistic process from the ledger can be deleted by only platform owners once requested by 1 or more stakeholders.

### Identity Contract

Identity contract helps to manage the identities which are registered in both EFPF and Nimble Platforms. 

Later on, these identities will be used on a data loss to recreate the certificates which are required for the BlockChain client to connect with the Chain Code.

One Identity has the roles attached to it which are the same in the Nimble Platform and the organizational reference as well.

Only users themself and the platform manager can delete the Identities.

Only the Identities registered to the platform can only perform operations defined in the Logistic Contract. Furthermore, at the start of the Logistic Process, the list of Parties should be defined. And the Identities of these parties only can interact with logistic processes and perform actions also these identities should have the right Roles defined as well.

This contract is highly coupled with the Logistic Contract as it helps the logistic contract to verify the identities.

## Testing 

To test locally the easiest way would be to deploy the Chaincode in the [test-network](https://github.com/hyperledger/fabric-samples/tree/master/test-network)
    
### Test methods

In both Contracts, there are test methods for you to verify the contracts are working. This is really helpful when you are working in the CLI.
   
##### 1. In Logistic Contract :- InitLedger Method

##### How to invoke in test-network in fabric 
 ``
 peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n logistic-contract --peerAddresses localhost:7051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"function":"InitLedger","Args":[]}'
 ``

##### 2. In Identity Contract :- initIdentityLedger Method

##### How to invoke in test-network in fabric 
 ``
 peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n logistic-contract --peerAddresses localhost:7051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"function":"initIdentityLedger","Args":[]}'
 ``

## Extending for other use cases.

It's pretty easy to extend for other use cases since all the main functionality of fabric required to perform transactions in the ledger are abstracted out.

### Ledger API.

Smart Contracts are written using Hyperldger Fabric Contract API 2.0.0.

#### Single State Operations
Common Operations for supported class types that are useful for a state for a single instance in the ledger are defined in the [State](https://github.com/nimble-platform/logistic-contract/blob/master/src/lib/ledger-api/state.ts) class. 


#### Collection Operations
Common operations in the ledger like

1. Add State.
2. Get State.
3. Get History. 
4. Delete State.
5. Update State. 

are defined in the [StateList](https://github.com/nimble-platform/logistic-contract/blob/master/src/lib/ledger-api/statelist.ts) Class. 

This is defined in a more generic way where any supported classes can get the use of the common methods defined in both State, and StateList classes.

The contract you write will be the service layer which talks to the data persistence layer defined in StateList class to work with the World State of BlockChain Ledger. 

#### Context of the Chaincode.

The single Context point for the Chaincode is defined in the [NimbleLogisticContext](https://github.com/nimble-platform/logistic-contract/blob/master/src/lib/utils/context.ts) class.

This will create new collections for the target types by defined Smart Contracts during the startup. You can create you're own list and make sure to pass the Contract Object Type as Parameter to the list initialization.

#### Type Conversion

Since this project is written from TypeScript it's more type-safe and it requires types to perform operations.

For you to easily convert any request objects to Contract Object Types you can use the [pick](https://github.com/nimble-platform/logistic-contract/blob/master/src/lib/utils/functions.ts#L25) Function which handles any type of conversion. You can define a static method in your Contract Object Class.


# Scaffolded with 
The basic skeleton was scaffold's with a yeoman generator provided by IBM Block-Chain Team
https://github.com/IBM-Blockchain/generator-fabric


# Development Reference
https://github.com/IBM-Blockchain/vehicle-manufacture

