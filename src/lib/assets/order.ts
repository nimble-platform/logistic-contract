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

@Object()
export class Order extends Asset {
    public static getClass() {
        return Asset.generateClass(Order.name);
    }

    @Property()
    public readonly eventTimeZoneOffset: string;

    @Property()
    public readonly bizStep: string;

    @Property()
    public readonly recordTime: number;

    @Property()
    public readonly readPoint: string;

    @Property()
    public readonly custodian: string;

    @Property()
    public readonly eventTime: number;

    @Property()
    public readonly bizLocation: string;

    @Property()
    public epcList: Epc[];

    constructor(
        id: string,
        eventTimeZoneOffset: string, bizStep: string, recordTime: number, readPoint: string,
        custodian: string, eventTime: number, bizLocation: string, epcList: Epc[]
    ) {
        super(id, Order.name);

        this.eventTimeZoneOffset = eventTimeZoneOffset;
        this.bizStep = bizStep;
        this.recordTime = recordTime;
        this.readPoint = readPoint;
        this.custodian = custodian;
        this.eventTime = eventTime;
        this.bizLocation = bizLocation;
        this.epcList = epcList;
    }

    public addEpcId(id: string, epc_code: string){
        this.epcList.push(new Epc(id, epc_code));
    }

    public removeEpcId(epc_code: string){
        this.epcList = this.epcList.filter(epc => epc.epc_code != epc_code);
    }
}
