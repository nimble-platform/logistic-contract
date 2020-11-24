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
export class Item {

    public static parseJsonStringToItemType(jsonString: string): Item {
        return pick<Item>(JSON.parse(jsonString), {
            id: String,
            item_identification: String,
            manufacturers_item_identification: String,
            item_name: String,
            manufacturer_party: String,
        });
    }

    @Property()
    public readonly id: string;

    @Property()
    public readonly item_identification: string;

    @Property()
    public readonly manufacturers_item_identification: string;

    @Property()
    public readonly item_name: string;

    @Property()
    public readonly manufacturer_party: string;

    constructor(
        id: string, item_identification: string,
        manufacturers_item_identification: string, item_name: string, manufacturer_party: string,
    ) {
        this.id = id;
        this.item_identification = item_identification;
        this.item_name = item_name;
        this.manufacturers_item_identification = manufacturers_item_identification;
        this.manufacturer_party = manufacturer_party;
    }
}
