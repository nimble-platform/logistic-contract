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
import './orderDetails';
import { HistoricState } from '../../ledger-api/state';
import { Asset } from '../assets/asset';
import { Item } from '../assets/item';
import { IOrderDetails } from '../assets/orderDetails';
import { Location } from '../locations/location';

@Object()
export class Order extends Asset {
    public static parseJsonObjectToOrderType(id:string, logisticProcess:any): Order{
        return new Order(
            id, [IOrderDetails.parseJsonString(logisticProcess.orderDetails)],
            logisticProcess.eventTime,
            logisticProcess.epcList,
            Item.parseJsonStringToItemType(logisticProcess.itemIdentifier),
            Location.parseJsonStringToLocationType(logisticProcess.deliveryLocation),
            Location.parseJsonStringToLocationType(logisticProcess.originLocation),
            logisticProcess.note,
            logisticProcess.custodian,
        );
    }
    public static getClass() {
        return Asset.generateClass(Order.name);
    }

    @Property('_order_details', 'IOrderDetails[]')
    private _order_details: IOrderDetails[];

    @Property()
    public readonly record_time: number;

    @Property('_epc_list', 'string[]')
    private _epc_list: string[];

    @Property()
    private _item_idetifier: Item;

    @Property()
    private _delivery_location_identifier: Location;

    @Property()
    private _origin_location_identifier: Location;

    @Property('_note', 'string[]')
    private _note: string[];

    @Property()
    private _custodian: string;

    constructor(
        id: string,
        order_details: IOrderDetails[], record_time: number, epc_list: string[], item_idetifier: Item,
        delivery_location_identifier: Location, origin_location_identifier: Location, note: string[],
        custodian: string,
    ) {
        super(id, Order.name);
        this._order_details = order_details;
        this.record_time = record_time;
        this._epc_list = epc_list;
        this._delivery_location_identifier = delivery_location_identifier;
        this._item_idetifier = item_idetifier;
        this._origin_location_identifier = origin_location_identifier;
        this._note = note;
        this._custodian = custodian;
    }

    get order_details(): IOrderDetails[] {return this._order_details;}

    set order_details(value: IOrderDetails[]) {this._order_details = value;}

    get epc_list(): string[] {return this._epc_list;}

    set epc_list(value: string[]) {this._epc_list = value;}

    get item_idetifier(): Item {return this._item_idetifier;}

    set item_idetifier(value: Item) {this._item_idetifier = value;}

    get delivery_location_identifier(): Location {return this._delivery_location_identifier;}

    set delivery_location_identifier(value: Location) {this._delivery_location_identifier = value;}

    get origin_location_identifier(): Location {return this._origin_location_identifier;}

    set origin_location_identifier(value: Location) {this._origin_location_identifier = value;}

    get note(): string[] {return this._note;}

    set note(value: string[]) {this._note = value;}

    get custodian(): string {return this._custodian;}

    set custodian(value: string) {this._custodian = value;}
}
