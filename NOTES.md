- Loading Remote Content in the Cordova WebView is unsupported
https://cordova.apache.org/docs/en/8.x/guide/next/index.html#loading-remote-content
=> we should not try to access Cordova APIs from a remote website

- Using a WebView iframe is risky
https://cordova.apache.org/docs/en/8.x/guide/appdev/security/index.html#iframes-and-the-callback-id-mechanism
=> we should use an InAppBrowser instead and handle communication ourself

- no support for postMessage between inAppBrowser and WebView
https://issues.apache.org/jira/browse/CB-4897

- workaround using polling to pass messages between inAppBrowser and WebView
https://www.telerik.com/blogs/cross-window-communication-with-cordova%27s-inappbrowser
