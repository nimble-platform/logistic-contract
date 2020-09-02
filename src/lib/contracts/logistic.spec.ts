/*
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import * as chai from 'chai';
import { ChaincodeStub } from 'fabric-shim';
import * as mockery from 'mockery';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { Order } from '../models/assets/order';
import { Item } from '../models/assets/item';
import { AssetList } from '../lists/assetlist';
import { PartyList } from '../lists/partylist';
import { UserList } from '../lists/userlist';
import { Party } from '../models/identities/party';
import { Location } from '../models/locations/location';
import { User } from '../models/identities/user';
import { NimbleLogisticContext } from '../utils/context';
import { LogisticContract as LogisticContractImport } from './logistic';
import { originLocation, deliveryLocation, order } from './mock';

chai.should();
chai.use(sinonChai);

describe ('#LogisticContract', () => {
    let LogisticContract;

    let sandbox: sinon.SinonSandbox;
    let contract: LogisticContractImport;
    let ctx: sinon.SinonStubbedInstance<NimbleLogisticContext>;
    let stub: sinon.SinonStubbedInstance<ChaincodeStub>;

    let userList: sinon.SinonStubbedInstance<UserList>;
    let orderList: sinon.SinonStubbedInstance<AssetList<Order>>;

    let user: sinon.SinonStubbedInstance<User>;
    let party: sinon.SinonStubbedInstance<Party>;

    let generateIdStub: sinon.SinonStub;
    const knownMockItemId: string = 'f28756ce-1ac8-4eac-a3d8-82199f283908';

    const knownManufacturerId: string = '5e9ea4f7-5ad3-4bf1-b993-79cdd6d0e615';

    const knownItemHjid: string = '567218';

    const knownManufacturerPartyId: string = '43471';

    const knownProductName: string = 'aka_new_product';

    const knownrecordTime: number = 1522809211116;

    const knownepcId: string =  'TEST848777';

    const knowncustodian: string =  'AKA_Logistics';

    before(() => {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
        });
    });

    beforeEach(() => {
        generateIdStub = sinon.stub();

        mockery.registerMock('../utils/functions', {
            generateId: generateIdStub,
        });

        cleanCache();
        LogisticContract = requireLogisticContract();

        sandbox = sinon.createSandbox();

        contract = new LogisticContract();
        ctx = sinon.createStubInstance(NimbleLogisticContext);
        stub = sinon.createStubInstance(ChaincodeStub);
        userList = sinon.createStubInstance(UserList);
        orderList = sinon.createStubInstance(AssetList);

        party = sinon.createStubInstance(Party);
        user = sinon.createStubInstance(User);

        (ctx as any).userList = userList;
        (ctx as any).orderList = orderList;
        (ctx as any).stub = stub;
    });

    afterEach(() => {
        sandbox.restore();
    });

    after(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe ('placeOrder', () => {
        const item = new Item(
            knownMockItemId,
            knownItemHjid,
            knownManufacturerId,
            knownProductName,
            knownManufacturerPartyId,
        );

        it ('should place an order', async () => {
            orderList.count.returns(100);
            stub.getTxID.returns('some tx id');
            stub.getTxTimestamp.returns({
                getSeconds: () => {
                    return {
                        toInt: () => {
                            return 1;
                        },
                    };
                },
            });
            generateIdStub.withArgs('some tx id', 'ORDER_100').returns('some id');

            const expectedOrder = new Order(
                'some id', order, knownrecordTime, [knownepcId], item, deliveryLocation,
                originLocation, ['handle with care'], knowncustodian,
            );

            (await contract.startLogisticProcess(
                ctx as any, order, [knownepcId], item, deliveryLocation, originLocation,
                 ['handle with care'], knowncustodian,
            )).should.deep.equal(expectedOrder);
            orderList.add.should.have.been.calledOnceWithExactly(expectedOrder);
            ctx.setEvent.should.have.been.calledOnceWithExactly('PLACE_ORDER', expectedOrder);
        });
    });

    describe ('getOrder', () => {
        it ('should return when the order exists for the given order id', async () => {
            const fakeOrder = sinon.createStubInstance(Order);

            orderList.get.withArgs('some order id').resolves(fakeOrder);

            (await contract.getOrder(ctx as any, 'some order id')).should.deep.equal(
                fakeOrder,
            );
        });

        it ('should error when the order not exits for the given order id', async () => {
            const fakeOrder = sinon.createStubInstance(Order);

            (typeof await contract.getOrder(ctx as any, 'some order id')).should.be.equal('undefined');
        });
    });

    describe ('changeTheCustodian', () => {
        it ('should update the order', async () => {
            const fakeOrder = sinon.createStubInstance(Order);
            fakeOrder.custodian = 'exampleorg';
            const fakeSetter = sinon.stub();

            orderList.get.withArgs('some order id').resolves(fakeOrder);

            (await contract.changeTheCustodian(ctx as any, 'some order id', 'exampleorg'))
            .custodian.should.deep.equal('exampleorg');

            ctx.orderList.update.should.have.been.calledOnceWithExactly(fakeOrder);
        });
    });

    describe ('deleteOrder', () => {
        it ('should delete the order', async () => {
            const fakeOrder = sinon.createStubInstance(Order);

            orderList.get.withArgs('some order id').resolves(fakeOrder);

            (await contract.deleteOrder(ctx as any, 'some order id')).should.deep.equal(
                fakeOrder,
            );
            ctx.orderList.delete.should.have.been.calledOnceWithExactly('some order id');
        });
    });
});

function requireLogisticContract() {
    return require('./logistic').LogisticContract;
}

function cleanCache() {
    delete require.cache[require.resolve('./logistic.ts')];
}
