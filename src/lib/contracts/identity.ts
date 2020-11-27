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

import { Param, Returns, Transaction } from 'fabric-contract-api';
import {  Order } from '../models/assets/order'; // tslint:disable-line:max-line-length
import { NimbleLogisticContext } from '../utils/context';
import { generateId } from '../utils/functions';
import { BaseContract } from './base';
import {mockOrder, mockUser} from './mock';
import {User} from '../models/identities/user';
import {Roles} from '../../constants';

export class IdentityContract extends BaseContract {
    constructor() {
        super('identity');
    }

    @Transaction()
    @Returns('User')
    public async initIdentityLedger(ctx: NimbleLogisticContext): Promise<User> {
        await ctx.userList.add(mockUser);
        ctx.setEvent('ADD_NEW_USER', mockUser);
        return mockUser;
    }

    @Transaction()
    @Returns('User')
    public async createNewIdentity(
        ctx: NimbleLogisticContext, userDetails: string,
    ): Promise<User> {
        const numUsers = await ctx.userList.count();
        const id = generateId(ctx.stub.getTxID(), 'USERS_' + numUsers);
        const user: User = User.parseJsonObjectToUserType(id, JSON.parse(userDetails));

        if (!await this.checkIdentityExistence(ctx, user)) {
            await ctx.userList.add(user);
            ctx.setEvent('ADD_NEW_USER', user);
            return user;
        }
    }

    @Transaction()
    @Returns('User')
    public async changeTheOrganizationOfIdentity(
        ctx: NimbleLogisticContext, userId: string, organizationId: string, orgnaizationName: string, userEmail: string)
        : Promise<User> {
        const user: User = await ctx.userList.get(userId);
        const cuser: User = await this.retrievesIdentityByEmail(ctx, userEmail);

        if (user.email.toString() !== userEmail && cuser.roles.includes(Roles.PLATFORM_MANAGER)) {
            throw new Error('User can be updated by the user or platform admins');
        }

        if (user !== null && user !== undefined) {
            user.party_hjid = organizationId;
            user.party_name = orgnaizationName;
            await ctx.userList.update(user);
            ctx.setEvent('UPDATE_USER', user);
            return user;
        }
    }

    @Transaction()
    @Returns('User')
    public async getIdentity(ctx: NimbleLogisticContext, userId: string): Promise<User> {
        const user: User = await ctx.userList.get(userId);
        ctx.setEvent('GET_USER', user);
        return user;
    }

    @Transaction()
    @Returns('User')
    public async deleteIdentity(ctx: NimbleLogisticContext, userId: string): Promise<User> {
        const user: User = await ctx.userList.get(userId);
        if ( user !== null ) {
            ctx.userList.delete(userId);
            ctx.setEvent('DELETE_ORDER', user);
            return user;
        }
    }

    @Transaction(false)
    @Returns('boolean')
    public async userExists(ctx: NimbleLogisticContext, id: string): Promise<boolean> {
        const user: User = await ctx.userList.get(id);
        return user !== null ? true : false ;
    }

    @Transaction()
    @Returns('User')
    public async retrievesIdentityByEmail(ctx: NimbleLogisticContext, email: string): Promise<User> {
        const user: User[] = await ctx.userList.query({
            selector: {email},
        });

        if (user.length > 0) {
            return user[0];
        }

        throw new Error(`Cannot get user. No user exists for email ${email}`);
    }

    @Transaction()
    @Returns('boolean')
    public async checkIdentityExistence(ctx: NimbleLogisticContext, cuser: User): Promise<boolean> {
        const user: User[] = await ctx.userList.query({
            selector: { email : cuser.email},
        });

        if (user.length > 0) {
            throw new Error(`User already registered to the platform with ${cuser.email}`);
        }

        const nuser: User[] = await ctx.userList.query({
            selector: { user_id : cuser.email},
        });

        if (nuser.length > 0) {
            throw new Error(`User already registered to the platform with nimble_user_id ${cuser.user_id}`);
        }
        return false;
    }
}
