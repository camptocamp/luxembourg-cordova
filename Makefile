run: run-android

run-android:
	CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL="https://services.gradle.org/distributions/gradle-4.4-all.zip" ANDROID_HOME=/home/${USER}/Android/Sdk `npm bin --global`/cordova run

run-browser:
	browse www/index.html
