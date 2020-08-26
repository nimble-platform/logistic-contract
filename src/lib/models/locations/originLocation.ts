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
import { Location } from './location';

@Object()
export class OriginLocation extends Location {
    public static getClass() {
        return Location.generateClass(OriginLocation.name);
    }

    @Property()
    public readonly cityName: string;

    @Property()
    public readonly region : string;

    @Property()
    public readonly postalZone : string;

    @Property()
    public readonly buildingNumber : string;

    @Property()
    public readonly countryName : string;

    constructor(
        id: string,
        cityName: string, region: string, postalZone: string, buildingNumber: string, countryName: string
    ) {
        super(id, OriginLocation.name);

        this.cityName = cityName;
        this.region = region;
        this.postalZone = postalZone;
        this.buildingNumber = buildingNumber;
        this.countryName = countryName;
    }
}
