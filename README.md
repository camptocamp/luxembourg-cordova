# Luxembourg website wrapper based on Cordova

The goal of this project is to provide a lightweight wrapper around the website.
Using Cordova allows the application to use the device persistent storage
instead (higher memory limit, no automatic reclaiming of space)...

## Pure web
- Run `make run-browser`


## Android
- You will need the Cordova installation and android SDK, see
  - https://cordova.apache.org/#getstarted
  - https://cordova.apache.org/docs/en/8.x/guide/platforms/android/index.html
...
- In Android studio you need to create an emulator (NexusS 22 is known to work)
- Run `make run-android`


## iOS
