import  * as firebase from 'firebase';
import * as firebaseui from 'firebaseui'; 
import "firebase/firestore";
import 'firebase/auth';


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

export const database = firebase.firestore();

export const auth = firebase.auth();

// console.log((database.collection("users").get().then((querySnapshot) => {
//   querySnapshot.docs.forEach((doc) => {
//     console.log(doc.data());
//     // archive.push({ id: doc.id, ...doc.data() });
//   });
// })));


// FAIR
// let user = database.collection("users").doc("uA2JiJSe4udM9ovRtRCQ").get()
//   .then((doc) => console.log(doc.data()))
//   .catch(function(error) {
//     console.log("Error getting document:", error);
//   });



// IMPORTANT UPDATES DATA INTO THE USER HISTORY
// let userId = "uA2JiJSe4udM9ovRtRCQ";
// let userr = database.collection("users").doc(userId).get()
//   // Returns the correct thing
  // .then((doc) => console.log(doc.data()))
  // .catch(function(error) {
  //   console.log("Error getting document:", error);
  // });

// userr.update({
//   history: firebase.firestore.FieldValue.arrayUnion({
//             // user_id: currentUser.uid,
//             type: "clinic",
//             radius: `2km`,
//             results: results.results,
//           })
// })

// Test for return in GraphQL
// let user;

// const trial = async() => {
//   try {
//     let user;
//     const db = await database.collection("users")
//   .where("user_id", "==", "iQLuz0nrPYQbelo21VnKyCT2CWq1")
//   .get();
//   const resolution = await db.forEach((doc) => {
//     user = doc.data();
//     return user
//   });
//   // Why undefined?
//   console.log(resolution);
//   } catch (error) {
//     console.log(user);
//   }
// }

// trial();
// console.log(trial()); //Returns a promise

let user;
database
            .collection("users")
            .where("user_id", "==", "iQLuz0nrPYQbelo21VnKyCT2CWq1")
            .get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                console.log(doc.data());
                user = doc.data();
              });
              console.log(user);
              return user
            }).catch(e => console.log(e))

console.log(user);

const userId = "iQLuz0nrPYQbelo21VnKyCT2CWq1"

// database.collection("history").where("user_id", "==", userId).get()
// .then((querySnapshot) => {
//   querySnapshot.forEach((doc) => 
//     console.log(doc.data())
//   )
// }).catch(e => console.log(e))




