import {Reported} from './dt_reported';
import {PROJECT_ID} from '../apikey';

export class DeviceResponse {
  name: string;
  sensorId: string;
  type: string;
  labels: [string[]];
  reported: Reported;
}

export class DeviceListResponse {
  devices: DeviceResponse[];
}
