const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLFloat,
} = graphql;

// FIRESTORE CONNECT
const admin = require("firebase-admin");
const serviceAccount = require("./config");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

const database = admin.firestore();

const Results = new GraphQLObjectType({
  name: "Results",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    vicinity: { type: GraphQLString },
  }),
});

const Search = new GraphQLObjectType({
  name: "Search",
  fields: () => ({
    id: { type: GraphQLID },
    radius: { type: GraphQLString },
    type: { type: GraphQLString },
    results: { type: GraphQLList(Results) },
  }),
});

// const User = new GraphQLObjectType({
//   name: "User",
//   fields: () => ({
//     user_id: { type: GraphQLID },
//     email: { type: GraphQLString },
//     history: { type: GraphQLList(Search) },
//   }),
// });

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    users_history: {
      type: GraphQLList(Search),
      args: { id: { type: GraphQLID } },
      resolve(parent: any, args: any) {
        // console.log(args.id);
        return database
          .collection("history")
          .where("user_id", "==", args.id)
          .get()
          .then((querySnapshot: { docs: any[] }) => {
            let history: any[] = [];
            querySnapshot.docs.forEach((doc: { id: any; data: () => any }) => {
              history.push({ id: doc.id, ...doc.data() });
            });
            // console.log(history);
            return history;
          })
          .catch((error: any) => {
            console.log("Error getting documents: ", error);
          });
      },
    },
  },
});

// "ccdOSPoIczgogFagQMANXwzal7x1"

module.exports = new GraphQLSchema({
  query: Query,
});

// CORRECT
// database
//   .collection("users")
//   .get()
//   .then((querySnapshot: any[]) => {
//     let users: any[] = [];
//     querySnapshot.forEach((doc: { data: () => any }) => {
//       let user = doc.data();
//       users.push({
//         email: user.email,
//         user_id: user.user_id,
//         history: user.history,
//       });
//     });
//     return users;
//   })
//   .catch((e: any) => console.log(e));
