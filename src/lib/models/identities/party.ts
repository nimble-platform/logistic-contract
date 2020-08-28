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
import { Object, Property } from 'fabric-contract-api';
import 'reflect-metadata';
import { HistoricState } from '../../ledger-api/state';
import { NotRequired } from '../../utils/annotations';
import { Identity } from './idenitiy';
import { User } from './user';

@Object()
export class Party extends Identity {
    public static getClass() {
        return Identity.generateClass(Party.name);
    }

    @Property()
    public party_identification: string;

    @Property()
    public readonly en_origin: string;

    @Property()
    public readonly person: User[];

    constructor(
        id: string,
        name: string, partyIdentification: string, enOrigin: string, person: User[]
    ) {
        super(id, name, Party.name);
        this.party_identification = partyIdentification;
        this.en_origin = enOrigin;
        this.person = person;
    }
}
