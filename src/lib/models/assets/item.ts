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
import { NotRequired } from '../../utils/annotations';

@Object()
export class Item {
    @Property()
    public readonly manufacturers_item_identification: string;

    @Property()
    public readonly item_name : string;

    @Property()
    public readonly manufacturer_party : string;

    constructor(
        id: string,
        manufacturersItemIdentification: string, itemName: string, manufacturerParty: string
    ) {
        this.item_name = itemName;
        this.manufacturers_item_identification = manufacturerParty;
        this.manufacturer_party = manufacturerParty;
    }
}
