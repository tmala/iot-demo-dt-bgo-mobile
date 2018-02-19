import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BASIC_AUTH, PROJECT_ID } from './apikey';
import { DeviceResponse, DeviceListResponse } from './dt/dt_response';

const API_URL = 'https://api.disruptive-technologies.com/v2beta1/projects/';
const API_URL_VS = 'https://api.disruptive-technologies.com/emulator/v2beta1/projects/';
const API_DEVICES = '/devices?';
const API_DEVICE = '/devices/';
const API_STREAM_ALL = 'devices:stream?';
const API_PUBLISH = ':publish';
const FILTER_LABEL_VS = 'label_filters=virtual-sensor%3D'; // 'virtual-sensor=' UrlEncoded

@Injectable()
export class DtApiV2Service {
  private deviceUrl = API_URL + PROJECT_ID + API_DEVICE;
  private virtualSensorsUrl = API_URL_VS + PROJECT_ID + API_DEVICE;

  private getHeaders() {
    const headers = new Headers();
    headers.append('authorization', BASIC_AUTH);
    headers.append('accept', 'text/json');
    headers.append('cache-control', 'no-cache');
    return headers;
  }

  constructor(private http: Http) {
  }

  public getAllVirtualSensors(): any {
    return this.http.get(API_URL + PROJECT_ID + API_DEVICES + FILTER_LABEL_VS, {headers: this.getHeaders()})
      .map(res => res.json());
  }

  public updateVirtualSensor_proximity_setObjectPresent(sensorID: string, objectPresent: string): any {
    const url = this.virtualSensorsUrl + sensorID + API_PUBLISH;
    const postParams = JSON.stringify( {
      'objectPresent': {
        'objectPresent': {
          'state': objectPresent
        }
      }
    });
    return this.http.post(url, postParams, { headers: this.getHeaders() })
      .map(res => res.json());
  }

  public updateVirtualSensor_temperature_setTemperature(sensorID: string, newTempStr: string): any {
    const url = this.virtualSensorsUrl + sensorID + API_PUBLISH;
    const newTemp: number = Number.parseFloat(newTempStr);
    const setTempRequest = {
      'temperature': {
        'temperature': {
          'value': newTemp
        }
      }
    };
    const postParams = JSON.stringify( {
      'temperature': {
        'temperature': {
          'value': 21
        }
      }
    });
    return this.http.post(url, setTempRequest, { headers: this.getHeaders() })
      .map(res => res.json());
  }

  public updateVirtualSensor_touch_set(sensorID: string): any {
    const url = this.virtualSensorsUrl + sensorID + API_PUBLISH;
    const postParams = JSON.stringify( {
      'touch': {
        'touch': {}
      }
    });
    return this.http.post(url, postParams, { headers: this.getHeaders() })
      .map(res => res.json());
  }

}
