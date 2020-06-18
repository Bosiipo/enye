import  * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAdS2u4z6IWxjPMBZMWz2p5ucv_etuAW-I",
    authDomain: "enye-1b834.firebaseapp.com",
    databaseURL: "https://enye-1b834.firebaseio.com",
    projectId: "enye-1b834",
    storageBucket: "enye-1b834.appspot.com",
    messagingSenderId: "444571101163",
    appId: "1:444571101163:web:71773cfd24cd953bb35bae",
    measurementId: "G-DXRCTL7Q16"
};

firebase.initializeApp(config);

const database = firebase.database();



database.ref().set({
    name: 'Bosipo',
    age: 22
});