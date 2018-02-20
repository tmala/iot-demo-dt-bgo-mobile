# IoT Mobile DT Virtualsensor
This is a generic mobil-friendly web-app to interact with virtual sensors from Disruptive Technologies.
To identify the virtual sensors they need to be labeled with a label "virtual-sensor".
The label does not need any value, just the key.


## prerequisites
A file named apikey.ts must be present in src/app and contain the following
```
export const API_KEY = '<YOUR_DT_APIKEY>';
export const BASIC_AUTH = 'Basic <"usr:pwd" in Base64Encoding>';
export const PROJECT_ID = '<PROJECT_ID>';
```
The usr:pwd is created as a Service Account with the role "Project User".
If the service-account needs to perform administrative tasks as well, 
the service-account needs to be assigned a role that gives the needed authorization.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Deploy to RaspBerryPi on openHAB
Set the base_href to "/static/mobile/" and deploy the files under dist to /etc/openhab2/html/mobile/ on the pi
You have to create the directory /etc/openhab2/html/mobile

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
