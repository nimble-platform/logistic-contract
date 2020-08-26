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
import { HistoricState } from '../ledger-api/state';
import { NotRequired } from '../utils/annotations';
import { Asset } from './asset';
import { Epc } from './epc';
import { IOrderDetails } from "../config/orderDetails";
import { Item } from './item';
import { DeliveryLocation } from '../locations/deilveryLocation';

@Object()
export class Order extends Asset {
    public static getClass() {
        return Asset.generateClass(Order.name);
    }

    @Property()
    public _order_details: IOrderDetails;

    @Property()
    public readonly record_time: number;

    @Property()
    public epc_list: Epc[];

    @Property()
    public item: Item;

    @Property()
    public delivery_location: DeliveryLocation;

    @Property()
    public note: string[];


    constructor(
        id: string,
        orderDetails: IOrderDetails, recordTime: number, epcList: Epc[], item: Item, deliveryLocation: DeliveryLocation,
        note: string[]
    ) {
        super(id, Order.name);

        this._order_details = orderDetails;
        this.record_time = recordTime;
        this.epc_list = epcList;
        this.delivery_location = deliveryLocation;
        this.item = item;
        this.note = note;
    }
}
