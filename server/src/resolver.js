// const admin = require("firebase-admin");
// const serviceAccount = require("./config");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: process.env.DATABASE_URL
// });
  
// const db = admin.database();

// const get = (args: any) => {
//     const userId = args.user_id;
//     db.ref("search")
//       .once("value")
//       .then((snapshot: any[]) => {
//         const store: any[] = [];
//         snapshot.forEach((childSnapshot: { key: any; val: () => any }) => {
//           if (childSnapshot.val().user_id === userId) {
//             let child_val = childSnapshot.val();
//             store.push(child_val.results);
//           }
//         });
//         console.log(store);
//         return store;
//       })
//       .catch((e: any) => console.log(e));
//   };
// const root = {
//     hello: () => {
//       return 'Hello world!';
//     },
// };

// module.exports = root;