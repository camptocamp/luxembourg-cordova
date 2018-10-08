run: run-android

run-android:
	CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL="https://services.gradle.org/distributions/gradle-4.4-all.zip" ANDROID_HOME=/home/${USER}/Android/Sdk `npm bin --global`/cordova run --keystore=$HOME/.android/debug.keystore --alias=androiddebugkey

run-ios:
	`npm bin --global`/cordova run ios --developmentTeam=FQ7KF94K32 --codeSignIdentity="iPhone Developer"  --buildFlag="-UseModernBuildSystem=0" --provisioningProfile=ba60da0c-974b-44d9-8e2d-2735a989a232 # does not work...

run-browser:
	browse www/index.html

xcode-open:
	open ./platforms/ios/HelloCordova.xcworkspace/
