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
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { NetworkName } from '../../../constants';
import { State } from '../../ledger-api/state';
import { Identity } from './idenitiy';

chai.should();
chai.use(sinonChai);

describe ('#Identity', () => {

    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe ('generateClass', () => {
        it ('should produce a class based on org type', () => {
            Identity.generateClass('someIdentityType').should.deep.equal(NetworkName + '.identity.someIdentityType');
        });
    });

    describe ('constructor', () => {
        it ('should set all the properties correctly', () => {
            const generateClassStub = sandbox.stub(Identity, 'generateClass').returns('some class');
            const makeKeyStub = sandbox.stub(State, 'makeKey').returns('some key');

            const org = new Identity('some id', 'some name', 'some identity type');

            (org as any).class.should.deep.equal('some class');
            (org as any).key.should.deep.equal('some key');
            org.id.should.deep.equal('some id');
            org.name.should.deep.equal('some name');
            generateClassStub.should.have.been.calledOnceWithExactly('some identity type');
            makeKeyStub.should.have.been.calledOnceWithExactly(['some id']);
        });
    });
});
