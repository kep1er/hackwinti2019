// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyCIngA5ejZRx3JiRw6B5ZLrLEZpaCOaIF8",
        authDomain: "hackwinti2019.firebaseapp.com",
        databaseURL: "https://hackwinti2019.firebaseio.com",
        projectId: "hackwinti2019",
        storageBucket: "hackwinti2019.appspot.com",
        messagingSenderId: "961664874246"
    },
    dialogflow: {
        hackwinti2019bot: 'e9201f59ad444c24ba82848610cde608'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
