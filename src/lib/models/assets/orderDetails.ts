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
    private _eventTimeZoneOffset: string;

    @Property()
    private _bizStep: string;

    @Property()
    private _readPoint: string;

    @Property()
    private _eventTime: number;

    @Property()
    private _bizLocation: string;

    @Property()
    private _manufacturerId: string;

    @Property()
    private _buyerId: string;

    @Property()
    private _itemId: string;

    @Property()
    private _currentCustodian: string;

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
        this._eventTimeZoneOffset = eventTimeZoneOffset;
        this._bizStep = bizStep;
        this._readPoint = readPoint;
        this._eventTime = eventTime;
        this._bizLocation = bizLocation;
        this._buyerId = buyerId;
        this._manufacturerId = manufacturerId;
        this._itemId = itemId;
        this._currentCustodian = currentCustodian;
    }

    get eventTimeZoneOffset(): string {
        return this._eventTimeZoneOffset;
    }

    set eventTimeZoneOffset(value: string) {
        this._eventTimeZoneOffset = value;
    }

    get bizStep(): string {
        return this._bizStep;
    }

    set bizStep(value: string) {
        this._bizStep = value;
    }

    get readPoint(): string {
        return this._readPoint;
    }

    set readPoint(value: string) {
        this._readPoint = value;
    }

    get eventTime(): number {
        return this._eventTime;
    }

    set eventTime(value: number) {
        this._eventTime = value;
    }

    get bizLocation(): string {
        return this._bizLocation;
    }

    set bizLocation(value: string) {
        this._bizLocation = value;
    }

    get manufacturerId(): string {
        return this._manufacturerId;
    }

    set manufacturerId(value: string) {
        this._manufacturerId = value;
    }

    get buyerId(): string {
        return this._buyerId;
    }

    set buyerId(value: string) {
        this._buyerId = value;
    }

    get itemId(): string {
        return this._itemId;
    }

    set itemId(value: string) {
        this._itemId = value;
    }

    get currentCustodian(): string {
        return this._currentCustodian;
    }

    set currentCustodian(value: string) {
        this._currentCustodian = value;
    }
}
