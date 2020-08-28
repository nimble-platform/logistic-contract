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
import { StateList } from '../../ledger-api/statelist';
import { User } from './user';
import { Identity } from './idenitiy';
import { Party } from './party';

chai.should();
chai.use(sinonChai);

describe ('#Party', () => {

    let sandbox: sinon.SinonSandbox;

    let generateClassStub: sinon.SinonStub;
    let party: Party;
    let user: User;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
        generateClassStub = sandbox.stub(Identity, 'generateClass').returns('some class');
        user = new User('some id', 'some name', '6113', ['some', 'roles'], 'manufacturing');

    });

    afterEach(() => {
        sandbox.restore();
    });

    describe ('getClass', () => {
        it ('should produce a class based on identity type', () => {
            Party.getClass().should.deep.equal('some class');
        });
    });

    describe ('constructor', () => {
        it ('should set all the properties correctly', () => {
            const makeKeyStub = sandbox.stub(State, 'makeKey').returns('some key');
            party = new Party('some party id', 'some party name', '6114', 'srilanka', [user]);

            (party as any).class.should.deep.equal('some class');
            (party as any).key.should.deep.equal('some key');
            party.id.should.deep.equal('some party id');
            party.name.should.deep.equal('some party name');
            party.party_identification.should.deep.equal('6114');
            party.person[0].should.deep.equal(user);
            generateClassStub.should.have.been.calledWith('Party');
            makeKeyStub.should.have.been.calledOnceWithExactly(['some party id']);
        });
    });

    describe ('serialize', () => {
        it ('should remove underscore properties and use non underscored version', () => {
            const expectedParty = {
                class: 'some class',
                en_origin: 'srilanka',
                id: 'some party id',
                key: 'some key',
                name: 'some party name',
                party_identification: '6114',
                person:  [user],
            };
            JSON.parse(party.serialize().toString()).should.deep.equal(expectedParty);
        });
    });
});
