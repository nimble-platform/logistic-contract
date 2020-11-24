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
import 'reflect-metadata';
import { HistoricState } from '../../ledger-api/state';
import { Identity } from './idenitiy';
import { User } from './user';
import { State } from '../../ledger-api/state';

@ContractObject()
export class Party extends Identity {
    public static getClass() {
        return Identity.generateClass(Party.name);
    }

    @Property()
    public party_hjid: string;

    constructor(id: string, name: string, idenitityType: string, party_hjid: string) {
        super(id, name, idenitityType);
        this.party_hjid = party_hjid;
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
