import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MyLog } from './myLog';
import { DtApiV2Service } from './dt/dtapiv2.service';
import { Device, DeviceList } from './dt/dt_model';
import { PROJECT_ID } from './apikey';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})

export class AppComponent implements OnInit {
  private dtApiService: DtApiV2Service;
  public deviceArr: Device[] = new Array();
  public selectedDevice: Device = null;

  private static timestamp() {
    const d = new Date();
    let ret = d.getFullYear() + '-';
    ret +=  (d.getMonth() + 1 ) > 9 ? d.getMonth() + 1 + '' : '0' + (d.getMonth() + 1);
    ret += '-';
    ret += d.getDate() > 9 ? d.getDate() + '' : '0' + d.getDate();
    ret += 'T';
    ret += d.getHours() > 9 ? d.getHours() + '' : '0' + d.getHours();
    ret += ':';
    ret += d.getMinutes() > 9 ? d.getMinutes() + '' : '0' + d.getMinutes();
    ret += ':';
    ret += d.getSeconds() > 9 ? d.getSeconds() + '' : '0' + d.getSeconds();
    ret += '.';
    ret += d.getMilliseconds() + '';
    ret += '+0' + Math.abs(d.getTimezoneOffset() / 60);
    ret += ':00';
    return ret;
  }


  private static extractSensorIdFromName(name: string): string {
    const sensorID: string = name;
    const replaceMe: string = 'projects/' + PROJECT_ID + '/devices/';
    return sensorID.replace(replaceMe, '');
  }

  constructor(http: Http) {
    this.dtApiService = new DtApiV2Service(http);
    MyLog.setCurrentLoglevel(MyLog.LOGLEVEL_TRACE);
  }

  ngOnInit(): void {
    console.log('AppComponent initialized');
    // get All Virtual Sensors and populate array of SensorObjects
    this.dtApiService.getAllVirtualSensors()
      .subscribe(
        (res: DeviceList) => {
          let devRes: Device;
          for (devRes of res.devices) {
            console.log('SensorID: ' + devRes.name);
            devRes.sensorId = AppComponent.extractSensorIdFromName(devRes.name);
            if ( devRes.type === DtApiV2Service.SENSOR_TYPE_TEMPERATURE ) {
              if ( devRes.labels[DtApiV2Service.SENSOR_LABEL_BAROMETER] ) {
                devRes.unit = 'mbar';
                devRes.type = DtApiV2Service.SENSOR_TYPE_BAROMETER;
              } else {
                devRes.unit = '˚C';
              }

            }
            this.deviceArr.push(devRes);
          }
        },
        (error: any) => {
          console.error(' Error: ' + error);
          throw Error('Unable to get virtual sensors. Reason:' + error);
        },
        () => {
          console.log('HTTP request ended, hopefully with success');
        }
      );
  }

  toLocaleTime(ts: string): string {
    const d = new Date(ts);
    let ret = d.getDate() > 9 ? d.getDate() + '' : '0' + d.getDate();
    ret += '.';
    ret +=  (d.getMonth() + 1) > 9 ? d.getMonth() + 1 + '' : '0' + (d.getMonth() + 1);
    ret += '.';
    ret += d.getFullYear() + ' ';
    ret += d.getHours() > 9 ? d.getHours() + '' : '0' + d.getHours();
    ret += ':';
    ret += d.getMinutes() > 9 ? d.getMinutes() + '' : '0' + d.getMinutes();
    ret += ':';
    ret += d.getSeconds() > 9 ? d.getSeconds() + '' : '0' + d.getSeconds();
    return ret;
  }

  openInNewWindow(): void {
    window.open(window.location.href, 'popup', 'menubar=on,toolbar=on');
  }

  selectDevice(device: Device): void {
    this.selectedDevice = device;
  }

  set_vs_prox_present(sensorID: string): void {
    this.dtApiService.updateVirtualSensor_proximity_setObjectPresent(sensorID, DtApiV2Service.PROXIMITY_PRESENT)
      .subscribe(
        (res: any) => {
          if (MyLog.isInfo()) {
            console.log('VirtualSensor with thingId ' + sensorID + ' set to object_present = PRESENT, result: ' + res);
          }
          this.selectedDevice.reported.objectPresent.state = DtApiV2Service.PROXIMITY_PRESENT;
          this.selectedDevice.reported.objectPresent.updateTime = AppComponent.timestamp();
        },
        (error: any) => {
          if (MyLog.isError()) {
            console.error(' Error: ' + error);
          }
          throw Error('Unable to set virtual sensor with id ' + sensorID + ' reason:' + error);
        },
        () => {
          if (MyLog.isTrace()) {
            console.log('HTTP request ended, hopefully with success');
          }
        }
      );
  }

  set_vs_prox_not_present(sensorID: string): void {
    this.dtApiService.updateVirtualSensor_proximity_setObjectPresent(sensorID, DtApiV2Service.PROXIMITY_NOT_PRESENT)
      .subscribe(
        (res: any) => {
          if (MyLog.isInfo()) {
            console.log('VirtualSensor with thingId ' + sensorID + ' set to object_present = NOT_PRESENT, result: ' + res);
          }
          this.selectedDevice.reported.objectPresent.state = DtApiV2Service.PROXIMITY_NOT_PRESENT;
          this.selectedDevice.reported.objectPresent.updateTime = AppComponent.timestamp();
        },
        (error: any) => {
          if (MyLog.isError()) {
            console.error(' Error: ' + error);
          }
          throw Error('Unable to set virtual sensor with id ' + sensorID + ' reason:' + error);
        },
        () => {
          if (MyLog.isTrace()) {
            console.log('HTTP request ended, hopefully with success');
          }
        }
      );
  }

  set_vs_temp(sensorID: string, newTempStr: string): void {
    console.log('setting new temperature ' + newTempStr);
    this.dtApiService.updateVirtualSensor_temperature_setTemperature(sensorID, newTempStr)
      .subscribe(
        (res: any) => {
          if (MyLog.isInfo()) {
            console.log('VirtualSensor with thingId ' + sensorID + ' set to temperature = ' + newTempStr + ', result: ' + res);
          }
          this.selectedDevice.reported.temperature.updateTime = AppComponent.timestamp();
          this.selectedDevice.reported.temperature.value = Number.parseFloat(newTempStr);
        },
        (error: any) => {
          if (MyLog.isError()) {
            console.error(' Error: ' + error);
          }
          throw Error('Unable to set virtual sensor with id ' + sensorID + ' reason:' + error);
        },
        () => {
          if (MyLog.isTrace()) {
            console.log('HTTP request ended, hopefully with success');
          }
        }
      );
  }

  set_vs_touch(sensorID: string): void {
    this.dtApiService.updateVirtualSensor_touch_set(sensorID)
      .subscribe(
        (res: any) => {
          if (MyLog.isInfo()) {
            console.log('VirtualSensor with thingId ' + sensorID + ' set to touch, result: ' + res);
          }
          this.selectedDevice.reported.touch.updateTime = AppComponent.timestamp();
        },
        (error: any) => {
          if (MyLog.isError()) {
            console.error(' Error: ' + error);
          }
          throw Error('Unable to set virtual sensor with id ' + sensorID + ' reason:' + error);
        },
        () => {
          if (MyLog.isTrace()) {
            console.log('HTTP request ended, hopefully with success');
          }
        }
      );
  }

}
