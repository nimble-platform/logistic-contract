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
import {  Item } from '../models/assets/item'; // tslint:disable-line:max-line-length
import { NimbleLogisticContext } from '../utils/context';
import { generateId } from '../utils/functions';
import { BaseContract } from './base';
import { IOrderDetails } from '../models/config/orderDetails';
import { Location } from '../models/locations/location';

export class LogisticContract extends BaseContract {
    constructor() {
        super('logistic');
    }

    @Transaction()
    @Returns('Order')
    public async startLogisticProcess(
        ctx: NimbleLogisticContext, orderDetails: IOrderDetails, epcList: string[],
        itemIdentifier: Item, deliveryLocation: Location, originLocation: Location, note: string[], custodian: string,
    ): Promise<Order> {
        const numOrders = await ctx.orderList.count();

        const id = generateId(ctx.stub.getTxID(), 'ORDER_' + numOrders);

        const order = new Order(
            id, orderDetails,
            orderDetails.eventTime,
            epcList,
            itemIdentifier,
            deliveryLocation,
            originLocation,
            note,
            custodian,
        );

        await ctx.orderList.add(order);

        ctx.setEvent('PLACE_ORDER', order);

        return order;
    }

    @Transaction()
    @Returns('Order')
    public async changeTheCustodian(ctx: NimbleLogisticContext, orderId: string, newOrganization: string)
    : Promise<Order> {
        const order = await ctx.orderList.get(orderId);
        order.custodian = newOrganization;
        await ctx.orderList.update(order);
        ctx.setEvent('UPDATE_ORDER', order);
        return order;
    }

    @Transaction()
    @Returns('Order')
    public async getOrder(ctx: NimbleLogisticContext, orderId: string): Promise<Order> {
        const order = await ctx.orderList.get(orderId);
        ctx.setEvent('GET_ORDER', order);
        return order;
    }

    @Transaction()
    @Returns('Order')
    public async deleteOrder(ctx: NimbleLogisticContext, orderId: string): Promise<Order> {
        const order = await ctx.orderList.get(orderId);
        if ( order !== null ) {
          ctx.orderList.delete(orderId);
          ctx.setEvent('DELETE_ORDER', order);
          return order;
        }
    }

     // AssetExists returns true when asset with given ID exists in world state.
    @Transaction(false)
    @Returns('boolean')
    public async orderExists(ctx: NimbleLogisticContext, id: string): Promise<boolean> {
        const order = await ctx.orderList.get(id);
        return order !== null ? true : false ;
    }

}
