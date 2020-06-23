import  * as firebase from 'firebase';
import * as firebaseui from 'firebaseui'; 

import 'firebase/auth';
// import firebase from 'firebase/app';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP__MEASUREMENT_ID
};

firebase.initializeApp(config);
const ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    signInSuccessUrl: 'http://localhost:3000',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
      window.location.assign('<your-privacy-policy-url>');
    }
  };

if (ui.isPendingRedirect()) {
    ui.start('.App', uiConfig);
}

export const database = firebase.database();

export const auth = firebase.auth();

