const graphql = require("graphql");
const serviceAccount = require("../config");
const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL,
    });
    
const db = admin.firestore(); 
// console.log(db.collection);
const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLBoolean,
    } = graphql;   

    // interface Results {
//   id: string;
//   // name: string;
//   // rating: string;
//   // vicinity: string;
// }

// type Users_history = {
//   // [x: string]: any;
//   id: string;
//   radius: string;
//   type: string;
//   results: [Results];
// };

// const HISTORY = gql`
//   query getUsersHistory($id: ID) {
//     users_history(id: $id) {
//       id
//       radius
//       type
//       results {
//         id
//         name
//         rating
//         vicinity
//       }
//     }
//   }
// `;

const User = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        email: {type: GraphQLString},
        search: {type: GraphQLList(StorageType)}
    })
});

const ViewPort = new GraphQLObjectType({
    name: "ViewPort",
    fields: () => ({
        northeast: {type: Location},
        southwest: {type: Location}
    })
});

const Location = new GraphQLObjectType({
    name: "Location",
    fields: () => ({
        lat: {type: GraphQLInt},
        lng: {type: GraphQLInt}
    })
});

const Geometry = new GraphQLObjectType({
    name: "Geometry",
    fields: () => ({
        location: {type: Location},
        view_port: {type: ViewPort}
    })
});

const OpenNow = new GraphQLObjectType({
    name: "OpenNow",
    fields: () => ({
        open_now: {type: GraphQLBoolean}
    })
});

const Photos = new GraphQLObjectType({
    name: "Photos",
    fields: () => ({
        height: {type: GraphQLInt},
        html_attributions: {type: GraphQLList(GraphQLString)},
        photo_reference: GraphQLString,
        width: GraphQLInt
    })
});

const Results = new GraphQLObjectType({
    name: "Results",
    fields: () => ({
        geometry: {type: Geometry},
        icon: {type: GraphQLString},
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        opening_hours: {type: OpenNow},
        photos: {type: GraphQLList(Photos)},
        place_id: {type: GraphQLString},
        reference: {type: GraphQLString},
        types: {type: GraphQLList(GraphQLString)},
        vicinity: {types: GraphQLString}
    })
});

const StorageType = new GraphQLObjectType({
    name: "Storage",
    fields: () => ({
       id: {type: GraphQLString},
       type: {type: GraphQLString},
       radius: {type: GraphQLString},
       results: {type: GraphQLList(Results)},
       user: {id: {type: GraphQLID}, email: {type: GraphQLString}}
    })
});


// const Search = new GraphQLObjectType({
//     name: "Search",
//     fields: () => ({
//        type: {type: GraphQLString},
//        radius: {type: GraphQLString},
//        results: {type: GraphQLList(Results)},
//     //    user: {type: User}
//     })
// });

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        users: {
            type: new GraphQLList(User),
            resolve(parent, args){
                return db
                .collection("data")
                .get()
                .then((snapshot) => {
                  console.log(snapshot.docs)
                  const strings = [];
                  snapshot.docs.map((data) => {
                    console.log(data);
                    // if (data.data().user.user_id === userId) {
                      const values = data.data();
                      strings.push({
                        radius: values.radius,
                        type: values.type,
                        email: values.user.email,
                        results: values.results
                        // radius: values.radius,
                      });
                    // }
                  });
                  return strings;
                })
            }
        //     history: {
        //         type: GraphQLList(StorageType),
        //         resolve(parent, args){
        //             const userId = args.user_id;
        //             return db
        //               .ref("data")
        //               .once("value")
        //               .then((snapshot) => {
        //                 const store = [];
        //                 snapshot.forEach((childSnapshot) => {
        //                   store.push({
        //                     id: childSnapshot.key,
        //                     ...childSnapshot.val(),
        //                   });
        //                 });
        //                 let user_store = store.filter((prevSearch) => {
        //                   return prevSearch.user.user_id === userId;
        //                 });
        //                 return user_store.reverse();
        //               })
        //               .catch((e) => console.error(e));
        //         }
        //     }
        },
        
    
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});



















































































// const schema = buildSchema(`
    // type Location {
    //     lat: Int
    //     lng: Int
    // }
    // type ViewPort {
    //     northeast: Location
    //     southwest: Location
    // }
    // type Photos {
    //     height: Int
    //     html_attributions: [String]
    //     photo_reference: String
    //     width: Int
    // }
//     type OpenNow {
//         open_now: Boolean
//     }
//     type Geometry {
//         location: Location
//         view_port: ViewPort
//     }
//     type Results {
//         geometry: Geometry
//         icon: String
//         id: String
//         name: String
//         opening_hours: OpenNow
//         photos: [Photos]
//         place_id: String
//         reference: String
//         types: [String]
//         vicinity: String
//     }
//     type Query {
//         result(userId: String): [Results]
//     }
// `);

// module.exports = schema;






































// const {buildSchema} = require('graphql');

// const schema = buildSchema(`
//   type Values {
//     id: String
//     name: String
//     vicinity: String
//   }
//   type User {
//     id: Int
//     email: String
//     values: [Values]
//   }
//   type Query {
//     user(userId: String): [Values]
//   }
// `);

// module.exports = schema;



























































const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Location {
    lat: Int
    lng: Int
  }
  type ViewPort {
    northeast: Location
    southwest: Location
  }
  type Photos {
    height: Int
    html_attributions: [String]
    photo_reference: String
    width: Int
  }
  type OpenNow {
    open_now: Boolean
  }
  type Geometry {
    location: Location
    view_port: ViewPort
  }
  type Values {
    geometry: Geometry
    icon: String
    id: String
    name: String
    opening_hours: OpenNow
    photos: [Photos]
    place_id: String
    reference: String
    types: [String]
    vicinity: String
  }
  type Search {
    id: String
    user_id: String
    radius: String
    type: String
    results: [Values]
  }
  type User {
    id: Int
    email: String
    values: [Values]
  }
  type Users {
    user: [User]
  }
  type Query {
    users(userId: String): [Search]
  }`);

module.exports = schema;