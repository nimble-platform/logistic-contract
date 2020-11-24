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
import {pick} from '../../utils/functions';


@Object()
export class IOrderDetails {

    public static parseJsonString(jsonString: string): IOrderDetails {
        return pick<IOrderDetails>(JSON.parse(jsonString), {
            eventTimeZoneOffset: String,
            bizStep: String,
            readPoint: String,
            eventTime: Number,
            bizLocation: String,
            buyerId: String,
            manufacturerId: String,
            itemId: String,
            currentCustodian: String,
        });
    }
    @Property()
    public eventTimeZoneOffset: string;

    @Property()
    public bizStep: string;

    @Property()
    public readPoint: string;

    @Property()
    public eventTime: number;

    @Property()
    public bizLocation: string;

    @Property()
    public manufacturerId: string;

    @Property()
    public buyerId: string;

    @Property()
    public itemId: string;

    @Property()
    public currentCustodian: string;

    constructor(
        eventTimeZoneOffset: string,
        bizStep: string,
        readPoint: string,
        eventTime: number,
        bizLocation: string,
        buyerId: string,
        manufacturerId: string,
        itemId: string,
        currentCustodian: string,
    ) {
        this.eventTimeZoneOffset = eventTimeZoneOffset;
        this.bizStep = bizStep;
        this.readPoint = readPoint;
        this.eventTime = eventTime;
        this.bizLocation = bizLocation;
        this.buyerId = buyerId;
        this.manufacturerId = manufacturerId;
        this.itemId = itemId;
        this.currentCustodian = currentCustodian;
    }

}
