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
import * as uuid from 'uuid/v5';
import { NetworkNameUUID } from '../../constants';

export function generateId(txId: string, ...additionalData: string[]) {
    return uuid(txId + ':' + additionalData.join(':'), NetworkNameUUID);
}

type Descriptor<T> = {
    [P in keyof T]: (v: any) => T[P];
};

export function pick<T>(v: any, d: Descriptor<T>): T {
    const ret: any = {};
    for (let key in d) {
        try {
            const val = d[key](v[key]);
            if (typeof val !== 'undefined') {
                ret[key] = val;
            }
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            throw new Error(`could not pick ${key}: ${msg}`);
        }
    }
    return ret;
}
