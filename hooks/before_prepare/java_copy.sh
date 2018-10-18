#!/bin/bash
[ -e ./platforms/android ] && cp android_custom/MainActivity.java ./platforms/android/app/src/main/java/io/cordova/hellocordova/MainActivity.java
exit 0
