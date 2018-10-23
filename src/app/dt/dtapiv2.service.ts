import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASIC_AUTH, PROJECT_ID } from '../apikey';

const API_URL = 'https://api.disruptive-technologies.com/v2/projects/';
const API_URL_VS = 'https://emulator.d21s.com/v2/projects/';
const API_DEVICES = '/devices?';
const API_DEVICE = '/devices/';
const API_PUBLISH = ':publish';
const FILTER_LABEL_VS = 'label_filters=virtual-sensor'; // checks for the presence of the label "virtual-sensor"

@Injectable()
export class DtApiV2Service {
  static PROXIMITY_PRESENT = 'PRESENT';
  static PROXIMITY_NOT_PRESENT = 'NOT_PRESENT';
  static SENSOR_TYPE_TEMPERATURE = 'temperature';
  static SENSOR_TYPE_BAROMETER = 'barometer';
  static SENSOR_TYPE_PROXIMITY = 'proximity';
  static SENSOR_TYPE_TOUCH = 'touch';
  static SENSOR_LABEL_VIRTUAL = 'virtual-sensor';
  static SENSOR_LABEL_BAROMETER = 'barometer';

  private virtualSensorsUrl = API_URL_VS + PROJECT_ID + API_DEVICE;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': BASIC_AUTH,
      'accept': 'text/json',
      'cache-control': 'no-cache'
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  public getAllVirtualSensors() {
    const myURL = API_URL + PROJECT_ID + API_DEVICES + FILTER_LABEL_VS;
    return this.httpClient.get( myURL, this.httpOptions );
  }

  public updateVirtualSensor_proximity_setObjectPresent(sensorID: string, objectPresent: string) {
    const url = this.virtualSensorsUrl + sensorID + API_PUBLISH;
    const postData = {
      'objectPresent': {
        'state': objectPresent
      }
    };
    return this.httpClient.post(url, postData, this.httpOptions);
  }

  public updateVirtualSensor_temperature_setTemperature(sensorID: string, newTempStr: string) {
    const url = this.virtualSensorsUrl + sensorID + API_PUBLISH;
    const newTemp: number = Number.parseFloat(newTempStr);
    const postData = {
      'temperature': {
        'value': newTemp
      }
    };
    return this.httpClient.post(url, postData, this.httpOptions);
  }

  public updateVirtualSensor_touch_set(sensorID: string) {
    const url = this.virtualSensorsUrl + sensorID + API_PUBLISH;
    const postData = {
      'touch': {}
    };
    return this.httpClient.post(url, postData, this.httpOptions);
  }

}
