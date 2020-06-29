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

// const renderHistory = (id: string) => {
//   history.map((el) => {
//     if (el.id === id) {
//       setHistoryData(el);
//     }
//   });
// };


// {
//   users_history(id: "ccdOSPoIczgogFagQMANXwzal7x1"){
//     radius
//     type
//     results{
//       id
//     }
//   }
// }

// RETURNS CURRENT USER'S HISTORY
// database
//           .collection("users")
//           .get()
//           .then((querySnapshot) => {
//             let history;
//             let some = [];
//             querySnapshot.forEach((doc) => {
//               let user = doc.data();

//               console.log(doc.id, "==>", doc.data())
//               console.log({id: doc.id, ...doc.data()})
//               if (user.user_id === "ccdOSPoIczgogFagQMANXwzal7x1") {
//                 some.push({id: doc.id, ...doc.data().history});
//                 history = user.history
//               }
//               console.log(doc.data(), doc.id);
//             });
//             console.log(some);
//             console.log(history);
//             return history;
//           })
//           .catch((e) => console.log(e));

        // database
        // .collection("history")
        // .where("user_id", "==", "ccdOSPoIczgogFagQMANXwzal7x1")
        // .get()
        // .then((querySnapshot) => {
        //   let history= [];
        //   querySnapshot.docs.forEach((doc) => {
        //     history.push({ id: doc.id, ...doc.data() });
        //   });
        //   console.log(history);
        // })
        // .catch((error) => {
        //   console.log("Error getting documents: ", error);
        // });

        // Most current
        // database
        //   .collection("users")
        //   .get()
        //   .then((querySnapshot: any[]) => {
        //     let history;
        //     querySnapshot.forEach((doc: { data: () => any }) => {
        //       let user = doc.data();
        //       if (user.user_id === args.id) {
        //         history = user.history;
        //       }
        //     });
        //     console.log(history);
        //     return history;
        //   })
        //   .catch((e: any) => console.log(e));

// PREVIOUSLY WORKING
// database
//           .collection("users")
//           .get()
//           .then((querySnapshot) => {
//             let users= [];
//             querySnapshot.forEach((doc) => {
//               let user = doc.data();
//               users.push({
//                 email: user.email,
//                 user_id: user.user_id,
//                 history: user.history,
//               });
//             });
//             console.log(users);
//             return users;
//           })
//           .catch((e) => console.log(e));

