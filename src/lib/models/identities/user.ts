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
import { Object as ContractObject, Property } from 'fabric-contract-api';
import { Identity } from './idenitiy';
import { State } from '../../ledger-api/state';

@ContractObject()
export class User extends Identity {
    public static getClass() {
        return Identity.generateClass(User.name);
    }

    @Property()
    public user_identification: string;

    @Property('roles', 'string[]')
    public readonly roles: string[];

    @Property()
    public readonly organization_department: string;

    constructor(
        id: string,
        name: string, user_identification: string, roles: string[], organizationDepartment: string,
    ) {
        super(id, name, User.name);
        this.user_identification = user_identification;
        this.organization_department = organizationDepartment;
        this.roles = roles;
    }

    public hasRole(role: string): boolean {
        return this.roles.includes(role);
    }

    public serialize(): Buffer {
        const toSerialize = JSON.parse(State.serialize(this).toString());

        Object.keys(this).forEach((key) => {
            if (key.startsWith('_')) {
                Object.defineProperty(toSerialize, key.slice(1), Object.getOwnPropertyDescriptor(toSerialize, key));
                delete toSerialize[key];
            }
        });

        return Buffer.from(State.serialize(toSerialize));
    }
}
