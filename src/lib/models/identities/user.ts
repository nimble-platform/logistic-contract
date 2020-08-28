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
import { Identity } from './idenitiy';

@Object()
export class User extends Identity {
    public static getClass() {
        return Identity.generateClass(User.name);
    }

    @Property()
    public user_identification: string;

    @Property()
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
}
