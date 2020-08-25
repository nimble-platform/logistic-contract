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

@Object()
export class Order extends Asset {
    public static getClass() {
        return Asset.generateClass(Order.name);
    }

    @Property()
    public _orderDetails: IOrderDetails;

    @Property()
    public readonly recordTime: number;

    @Property()
    public epcList: Epc[];

    constructor(
        id: string,
        orderDetails: IOrderDetails, recordTime: number, epcList: Epc[]
    ) {
        super(id, Order.name);

        this._orderDetails = orderDetails;
        this.recordTime = recordTime;
        this.epcList = epcList;
    }

    public addEpcId(id: string, epc_code: string){
        this.epcList.push(new Epc(id, epc_code));
    }

    public removeEpcId(epc_code: string){
        this.epcList = this.epcList.filter(epc => epc.epc_code != epc_code);
    }
}
