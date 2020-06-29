//  // Populate History
//  useEffect(() => {
//   if (currentUser !== undefined && currentUser !== null) {
//     // console.log(history); //Works
//     database
//       .collection("history")
//       .where("user_id", "==", currentUser.uid)
//       .get()
//       .then((querySnapshot) => {
//         let history: any[] = [];
//         querySnapshot.docs.forEach((doc) => {
//           history.push({ id: doc.id, ...doc.data() });
//         });
//         setHistory(history);
//       })
//       .catch((error) => {
//         console.log("Error getting documents: ", error);
//       });
//   }
// }, [currentUser, history]);

