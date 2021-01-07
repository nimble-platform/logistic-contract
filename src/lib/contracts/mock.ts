
import { Location } from '../models/locations/location';
import { IOrderDetails } from '../models/assets/orderDetails';
import {Item} from '../models/assets/item';
import {Order} from '../models/assets/order';
import {User} from '../models/identities/user';

const knownOriginLocationId: string = '2474a477-81e5-49cc-98d2-9f24739b3a76';

const knownDeliveryLocationId: string = '73846972-8fec-4885-9920-f4020e466f44';

const knownMockItemId: string = 'f28756ce-1ac8-4eac-a3d8-82199f283908';

const knownManufacturerId: string = '5e9ea4f7-5ad3-4bf1-b993-79cdd6d0e615';

const knownItemHjid: string = '567218';

const knownManufacturerPartyId: string = '43471';

const knownProductName: string = 'aka_new_product';

const knownRecordTime: number = 1522809211116;

const knownEpcId: string =  'TEST848777';

const knownCustodian: string =  'AKA_Logistics';

const originLocation: Location = new Location(
    knownOriginLocationId,
    'Negambo',
    'Colombo',
    '1050',
    '453',
    'Srilanka',
    '345',
);

const deliveryLocation: Location = new Location(
    knownDeliveryLocationId,
    'Nugegoda',
    'Colombo',
    '1234',
    '45',
    'Srilanka',
    '678',
);

const item: Item = new Item(
    knownMockItemId,
    knownItemHjid,
    knownManufacturerId,
    knownProductName,
    knownManufacturerPartyId,
);

const orderDetails: IOrderDetails[]  = [
 new IOrderDetails('-06:00',
     'urn:epcglobal:cbv:bizstep:other',
     'urn:epc:id:sgln:bizLocation.PodComp.2',
     knownRecordTime,
     'urn:epc:id:sgln:readPoint.PodComp.1',
     '6785',
     knownManufacturerPartyId,
     knownItemHjid,
     'AKA Logistics'),
];

export const mockOrder: Order = new Order(
    'some id43', orderDetails, knownRecordTime, [knownEpcId], item, deliveryLocation,
    originLocation, ['handle with care'], knownCustodian, ['41920', '41921', '41922', '41923'],
);

export const  mockUser: User = new User(
    'some id35', 'perera Ayesh', 'nimble-id', ['platform_manager', 'purchaser', 'publisher'],
    '41922', 'Ayesh logistics', 'akayeshmantha@gmail.com', 'nimble',
);
