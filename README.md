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
- CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL="https://services.gradle.org/distributions/gradle-4.4-all.zip" ANDROID_HOME=/home/${USER}/Android/Sdk `npm bin --global`/cordova platform add android
- Run `make run-android`
- In case of error, open in Android studio and adjust the "project properties" so that the sdk is specified; deploy to emulator or device using Android studio

An APK is available in the gh-pages branch, see https://camptocamp.github.io/luxembourg-cordova/v2018_09_20.apk

## iOS
- See https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html
- Run `make run-ios`
- Run `make xcode-open` and click the triangle
- On Apple only the authorized devices can install the app.


# POC state

## General
- issue with running the minified build of the website (unknown reason);

## Android
- on simulator: all OK
- on device:
  - start without internet was OK with geoadmin inside the iframe;
  - iframe <> cordova communication was OK

## iOS (default webview)
- on simulator:
  - start without internet was OK with geoadmin inside the iframe;
  - iframe <> cordova communication was OK
- on device (old iPad on iOS 9):
  - start without internet was OK with geoadmin inside the iframe;
  - iframe <> cordova communication could not be tested (browser too old: don't understand unminified const/let)
- Upcoming webview changes: https://cordova.apache.org/news/2018/08/01/future-cordova-ios-webview.html
