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
import { State } from '../../ledger-api/state';
import {NetworkName} from '../../../constants';

@ContractObject()
export class User extends State {

    public static parseJsonObjectToUserType(id: string, userDetails: any): User {
        return new User(
            id, userDetails.name, userDetails.user_id,
            userDetails.roles, userDetails.party_hjid,
            userDetails.party_name, userDetails.email, userDetails.peer_organization,
        );
    }

    public static getClass() {
        return User.generateClass(User.name);
    }

    public static generateClass(participantType: string): string {
        return NetworkName + '.users.'  + participantType;
    }

    @Property('id', 'string')
    private id: string;

    @Property()
    private name: string;

    @Property()
    public user_id: string;

    @Property('roles', 'string[]')
    public roles: string[];

    @Property()
    public party_hjid: string;

    @Property()
    public party_name: string;

    @Property()
    public email: string;

    @Property()
    public peer_organization: string;

    constructor(id: string, name: string, user_id: string, roles: string[], party_hjid: string,
                party_name: string, email: string, peer_organization: string) {
        super(User.generateClass(User.name), [id]);
        this.id = id;
        this.name = name;
        this.user_id = user_id;
        this.roles = roles;
        this.party_hjid = party_hjid;
        this.party_name = party_name;
        this.email = email;
        this.peer_organization = peer_organization;
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

    public hasRole(role: string): boolean {
        return this.roles.includes(role);
    }
}
