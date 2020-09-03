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
export class NimbleContractException extends Error {
    public errorcode: number
    public stacktrace: Error

    constructor(errorcode: number, message: string, stacktrace?: Error) {
      super(message)

      this.errorcode = errorcode
      this.stacktrace = stacktrace
    }

    public getException() {
      return {
        errorcode: this.errorcode,
        message: this.message
      }
    }
  }

  export class AssetNotFoundException extends NimbleContractException {
    constructor(message: string) {
      super(404, message)
    }
  }


