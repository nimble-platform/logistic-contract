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
import { IOrderDetails } from '../models/assets/orderDetails';
import {mockOrder, mockUser} from './mock';
import {User} from '../models/identities/user';
import {Roles} from '../../constants';

export class LogisticContract extends BaseContract {
    constructor() {
        super('logistic');
    }

    @Transaction()
    @Returns('Order')
    public async initLedger(ctx: NimbleLogisticContext): Promise<Order> {
        await ctx.orderList.add(mockOrder);
        await ctx.userList.add(mockUser);
        ctx.setEvent('PLACE_ORDER', mockOrder);
        ctx.setEvent('ADD_USER', mockUser);
        return mockOrder;
    }

    @Transaction()
    @Returns('Order')
    public async startLogisticProcess(
        ctx: NimbleLogisticContext, logistiProcess: string, userEmail: string): Promise<Order> {
        const user: User = await this.retrievesUserByEmail(ctx, userEmail);
        if (!user.hasRole(Roles.PURCHASER)) {
            throw new Error(`Only callers with role ${Roles.PUBLISHER} can get publish orders`);
        }
        const numOrders = await ctx.orderList.count();
        const id = generateId(ctx.stub.getTxID(), 'ORDER_' + numOrders);
        const order: Order = Order.parseJsonObjectToOrderType(id, JSON.parse(logistiProcess));
        await ctx.orderList.add(order);
        ctx.setEvent('PLACE_ORDER', order);
        return order;
    }

    @Transaction()
    @Returns('Order')
    public async changeTheCustodian(
        ctx: NimbleLogisticContext, orderId: string, newOrganization: string, newCustodianChangeEvent: string,
        userEmail: string)
        : Promise<Order> {
        const order: Order = await ctx.orderList.get(orderId);
        const user: User = await this.retrievesUserByEmail(ctx, userEmail);
        if (!order.involed_parties.includes(user.party_hjid) ||
            !(user.hasRole(Roles.PUBLISHER) || user.hasRole(Roles.PURCHASER))) {
            throw new Error(`Only callers provided in initial contract can change the custodian of an orders`);
        }
        order.custodian = newOrganization;
        order.order_details.push(IOrderDetails.parseJsonString(JSON.parse(newCustodianChangeEvent)));
        await ctx.orderList.update(order);
        ctx.setEvent('UPDATE_ORDER', order);
        return order;
    }

    @Transaction()
    @Returns('Order')
    public async getOrder(ctx: NimbleLogisticContext, orderId: string, userEmail: string): Promise<Order> {
        const order: Order = await ctx.orderList.get(orderId);
        const user: User = await this.retrievesUserByEmail(ctx, userEmail);
        if (!order.involed_parties.includes(user.party_hjid) ||
            !(user.hasRole(Roles.PUBLISHER) || user.hasRole(Roles.PURCHASER))) {
            throw new Error(`Only callers provided in initial contract can retrieve an order details`);
        }
        ctx.setEvent('GET_ORDER', order);
        return order;
    }

    @Transaction()
    @Returns('Order')
    public async deleteOrder(ctx: NimbleLogisticContext, orderId: string, userEmail: string): Promise<Order> {
        const order: Order = await ctx.orderList.get(orderId);
        const user: User = await this.retrievesUserByEmail(ctx, userEmail);
        if (!order.involed_parties.includes(user.party_hjid) ||
            !(user.hasRole(Roles.PUBLISHER) || user.hasRole(Roles.PURCHASER) || user.hasRole(Roles.PLATFORM_MANAGER))) {
            throw new Error(`Only callers provided in initial contract can retrieve an order details`);
        }
        ctx.orderList.delete(orderId);
        ctx.setEvent('DELETE_ORDER', order);
        return order;
    }

     // AssetExists returns true when asset with given ID exists in world state.
    @Transaction(false)
    @Returns('boolean')
    public async orderExists(ctx: NimbleLogisticContext, id: string): Promise<boolean> {
        const order: Order = await ctx.orderList.get(id);
        return order !== null ? true : false ;
    }

    public async retrievesUserByEmail(ctx: NimbleLogisticContext, email: string): Promise<User> {
        const user: User[] = await ctx.userList.query({
            selector: {email},
        });

        if (user.length > 0) {
            return user[0];
        }

        throw new Error(`Cannot get user. No user exists for email ${email}`);
    }

}
