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

import { Context } from 'fabric-contract-api';
import { Order } from '../models/assets/order';
import { AssetList } from '../lists/assetlist';
import { PartyList } from '../lists/partylist';
import { UserList } from '../lists/userlist';
import { State } from '../ledger-api/state';
import { Party } from '../models/identities/party';
import { User } from '../models/identities/user';

export class NimbleLogisticContext extends Context {

    public readonly orderList: AssetList<Order>;
    public readonly partyList: PartyList;
    public readonly userList: UserList;

    constructor() {
        super();
        this.orderList = new AssetList(this, 'orders', [Order]);
        this.partyList = new PartyList(this, 'party', [Party]);
        this.userList = new UserList(this, 'user', [User]);
    }

    public setEvent(eventName: string, payload: State) {
        const buffer = payload.serialize();
        const json = JSON.parse(buffer.toString());
        json.timestamp = (this.stub.getTxTimestamp().seconds as any).toInt() * 1000;
        this.stub.setEvent(eventName, Buffer.from(JSON.stringify(json)));
    }
}
