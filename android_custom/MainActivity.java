/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package io.cordova.hellocordova;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;

import org.apache.cordova.*;

public class MainActivity extends CordovaActivity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        super.init(); // Initialize appView, since it's only initialized inside loadUrl by default
        WebView view = (WebView) this.appView.getView();
        WebSettings settings = view.getSettings(); // get WebView settings
        String appCachePath = this.getCacheDir().getAbsolutePath(); // Set path to appcache
        settings.setAppCachePath(appCachePath);
        settings.setAllowFileAccess(true); // Let browser write files - doesn't work without this
        settings.setAppCacheEnabled(true); // Enable app cache

        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
    }
}
