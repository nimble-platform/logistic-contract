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
import { NotRequired } from '../..//utils/annotations';
import { Location } from './location';

@Object()
export class OriginLocation extends Location {
    public static getClass() {
        return Location.generateClass(OriginLocation.name);
    }

    @Property()
    public readonly origin_location_identifier: string;

    @Property()
    public readonly city_name: string;

    @Property()
    public readonly region : string;

    @Property()
    public readonly postal_zone : string;

    @Property()
    public readonly building_number : string;

    @Property()
    public readonly country_name : string;


    constructor(
        id: string,
        cityName: string, region: string, postalZone: string, buildingNumber: string, countryName: string,
        OriginLocationIdentifier: string
    ) {
        super(id, OriginLocation.name);
        this.origin_location_identifier = OriginLocationIdentifier;
        this.city_name = cityName;
        this.region = region;
        this.postal_zone = postalZone;
        this.building_number = buildingNumber;
        this.country_name = countryName;
    }
}