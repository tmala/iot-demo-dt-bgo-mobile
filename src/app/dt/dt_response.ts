import {Reported} from './dt_reported';
import {PROJECT_ID} from '../apikey';

export class DeviceResponse {
  name: string;
  sensorId: string;
  type: string;
  labels: [string[]];
  reported: Reported;
  unit: string;
}

export class DeviceListResponse {
  devices: DeviceResponse[];
}
