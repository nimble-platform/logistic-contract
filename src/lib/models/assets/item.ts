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
import { NotRequired } from '../utils/annotations';
import { Asset } from './asset';
import { Epc } from './epc';

@Object()
export class Item extends Asset {
    public static getClass() {
        return Asset.generateClass(Item.name);
    }

    @Property()
    public readonly manufacturersItemIdentification: string;

    @Property()
    public readonly itemName : string;

    @Property()
    public readonly manufacturerParty : string;

    constructor(
        id: string,
        manufacturersItemIdentification: string, itemName: string, manufacturerParty: string
    ) {
        super(id, Item.name);

        this.itemName = itemName;
        this.manufacturerParty = manufacturerParty;
        this.manufacturerParty = manufacturerParty;
    }
}
