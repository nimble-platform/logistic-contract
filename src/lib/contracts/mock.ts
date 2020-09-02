
import { Location } from '../models/locations/location';

const knownOriginLocationId: string = '2474a477-81e5-49cc-98d2-9f24739b3a76';

const knownDeliveryLocationId: string = '73846972-8fec-4885-9920-f4020e466f44';

const knownMockItemId: string = 'f28756ce-1ac8-4eac-a3d8-82199f283908';

const knownManufacturerId: string = '5e9ea4f7-5ad3-4bf1-b993-79cdd6d0e615';

const knownItemHjid: string = '567218';

const knownManufacturerPartyId: string = '43471';

const knownProductName: string = 'aka_new_product';

const knownrecordTime: number = 1522809211116;

const knownepcId: string =  'TEST848777';

export const originLocation = new Location(
    knownOriginLocationId,
    'Negambo',
    'Colombo',
    '1050',
    '453',
    'Srilanka',
    '345',
);

export const deliveryLocation = new Location(
    knownDeliveryLocationId,
    'Nugegoda',
    'Colombo',
    '1234',
    '45',
    'Srilanka',
    '678',
);

export const order  = {
    bizLocation: 'urn:epc:id:sgln:bizLocation.PodComp.2',
    bizStep: 'urn:epcglobal:cbv:bizstep:other',
    buyerId: '6785',
    eventTime: knownrecordTime,
    eventTimeZoneOffset: '-06:00',
    itemId: knownItemHjid,
    manufacturerId: knownManufacturerPartyId ,
    readPoint: 'urn:epc:id:sgln:readPoint.PodComp.1',
};
