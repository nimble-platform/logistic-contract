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
import { User } from './user';
import { Identity } from './idenitiy';

chai.should();
chai.use(sinonChai);

describe ('#User', () => {

    let sandbox: sinon.SinonSandbox;

    let generateClassStub: sinon.SinonStub;
    let user: User;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
        generateClassStub = sandbox.stub(Identity, 'generateClass').returns('some class');

    });

    afterEach(() => {
        sandbox.restore();
    });

    describe ('getClass', () => {
        it ('should produce a class based on identity type', () => {
            User.getClass().should.deep.equal('some class');
        });
    });

    describe ('constructor', () => {
        it ('should set all the properties correctly', () => {
            const makeKeyStub = sandbox.stub(State, 'makeKey').returns('some key');
            user = new User('some id', 'some name', '6113', ['some', 'roles'], 'manufacturing');

            (user as any).class.should.deep.equal('some class');
            (user as any).key.should.deep.equal('some key');
            (user as any).roles.should.deep.equal(['some', 'roles']);
            user.id.should.deep.equal('some id');
            user.name.should.deep.equal('some name');
            user.user_identification.should.deep.equal('6113');
            user.organization_department.should.deep.equal('manufacturing');
            generateClassStub.should.have.been.calledOnceWithExactly('User');
            makeKeyStub.should.have.been.calledOnceWithExactly(['some id']);
        });
    });

    describe ('hasRole', () => {
        it ('should return true when role is in role list', () => {
            user.hasRole('roles').should.deep.equal(true);
        });

        it ('should return false when role is in role list', () => {
            user.hasRole('not roles').should.deep.equal(false);
        });
    });

    describe ('serialize', () => {
        it ('should remove underscore properties and use non underscored version', () => {
            const expectedUser = {
                class: 'some class',
                id: 'some id',
                key: 'some key',
                name: 'some name',
                organization_department: 'manufacturing',
                roles: ['some', 'roles'],
                someOtherProperty: 'some other value',
                someProperty: 'some value',
                user_identification: '6113',
            };

            (user as any)._someOtherProperty = 'some other value';
            (user as any).someProperty = 'some value';

            JSON.parse(user.serialize().toString()).should.deep.equal(expectedUser);
        });
    });
});
