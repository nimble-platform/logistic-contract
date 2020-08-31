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
import { IState, State } from '../ledger-api/state';
import { StateList } from '../ledger-api/statelist';
import { AssetList } from '../lists/assetlist';
import { Order } from '../models/assets/order';

chai.should();
chai.use(sinonChai);

describe ('#Context', () => {
    let sandbox: sinon.SinonSandbox;

    let NimbleLogisticContext;

    let context;

    before(() => {
        cleanCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
        });
    });

    beforeEach(() => {

        NimbleLogisticContext = requireLogisticContext();

        sandbox = sinon.createSandbox();
        context = new NimbleLogisticContext();
    });

    afterEach(() => {
        mockery.deregisterAll();

        cleanCache();

        sandbox.restore();
    });

    after(() => {
        mockery.disable();
    });

    describe ('constructor', () => {
        it ('should set all the properties correctly', () => {
            context.orderList.should.be.instanceof(AssetList);
            testSupportedClasses(context.orderList, [Order]);
        });
    });

    describe ('setEvent', () => {
        it ('should set event on stub', () => {
            const mockState = sinon.createStubInstance(State);
            mockState.serialize.returns(JSON.stringify({some: 'object'}));

            context.stub = sinon.createStubInstance(ChaincodeStub);
            (context.stub as sinon.SinonStubbedInstance<ChaincodeStub>).getTxTimestamp.returns({
                getSeconds: () => {
                    return {
                        toInt: () => {
                            return 1;
                        },
                    };
                },
            });

            context.setEvent('some name', mockState as any);

            mockState.serialize.should.have.been.calledOnceWithExactly();
            (context.stub as sinon.SinonStubbedInstance<ChaincodeStub>).setEvent
                .should.have.been.calledOnceWithExactly('some name', Buffer.from(JSON.stringify({
                    some: 'object',
                    timestamp: 1000,
                })));
        });
    });
});

function testSupportedClasses(list: StateList<any>, expectedValues: Array<IState<any>>) {
    const listClasses = [];
    list.supportedClasses.forEach((value) => {
        listClasses.push(value);
    });

    listClasses.should.deep.equal(expectedValues);
}

function requireLogisticContext() {
    return require('./context').NimbleLogisticContext;
}

function cleanCache() {
    delete require.cache[require.resolve('./context')];
}
