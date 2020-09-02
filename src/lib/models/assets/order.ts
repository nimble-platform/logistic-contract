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
import { Asset } from '../assets/asset';
import { Item } from '../assets/item';
import { IOrderDetails } from '../config/orderDetails';
import { Location } from '../locations/location';

@Object()
export class Order extends Asset {
    public static getClass() {
        return Asset.generateClass(Order.name);
    }

    @Property()
    public _order_details: IOrderDetails;

    @Property()
    public readonly record_time: number;

    @Property('epc_list', 'string[]')
    public epc_list: string[];

    @Property()
    public item_idetifier: Item;

    @Property()
    public delivery_location_identifier: Location;

    @Property()
    public origin_location_identifier: Location;

    @Property('note', 'string[]')
    public note: string[];

    @Property()
    public custodian: string;

    constructor(
        id: string,
        orderDetails: IOrderDetails, recordTime: number, epcList: string[], itemIdetifier: Item,
        deliveryLocationIdentifier: Location, originLocationIdentifier: Location, note: string[],
        custodian: string,
    ) {
        super(id, Order.name);
        this._order_details = orderDetails;
        this.record_time = recordTime;
        this.epc_list = epcList;
        this.delivery_location_identifier = deliveryLocationIdentifier;
        this.item_idetifier = itemIdetifier;
        this.origin_location_identifier = originLocationIdentifier;
        this.note = note;
        this.custodian = custodian;
    }
}
