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
export class Location {

    public static parseJsonStringToLocationType(jsonString: string): Location {
        return pick<Location>(JSON.parse(jsonString), {
            id: String,
            city_name: String,
            region: String,
            postal_zone: String,
            building_number: String,
            country_name: String,
            location_identifier: String,
        });
    }

    @Property()
    public readonly id: string;

    @Property()
    public readonly location_identifier: string;

    @Property()
    public readonly city_name: string;

    @Property()
    public readonly region: string;

    @Property()
    public readonly postal_zone: string;

    @Property()
    public readonly building_number: string;

    @Property()
    public readonly country_name: string;

    constructor(
        id: string,
        city_name: string, region: string, postal_zone: string, building_number: string, country_name: string,
        location_identifier: string,
    ) {
        this.location_identifier = location_identifier;
        this.city_name = city_name;
        this.region = region;
        this.postal_zone = postal_zone;
        this.building_number = building_number;
        this.country_name = country_name;
    }
}
