const express = require("express");
const fetch = require("node-fetch");
const expressGraphql = require("express-graphql");
const schema = require("./schema/schema");
const admin = require("firebase-admin");
const serviceAccount = require("./config");
const app = express();

app.use(express.json());
app.use((req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
  // databaseAuthVariableOverride: {
  //   uid: "my-service-worker"
  // }
});

const db = admin.database();

// const userId = "OcIe1K17fzTz9sxN8jxGVshymFi2";
// db.ref("search")
//   .once("value")
//   .then((snapshot: any[]) => {
//     const store: any[] = [];
//     snapshot.forEach((childSnapshot: { key: any; val: () => any }) => {
//       if (childSnapshot.val().user_id === userId) {
//         let child_val = childSnapshot.val();
//         store.push(child_val.results);
//       }
//     });
//     console.log(store);
//     return store;
//   });

const get = (args: any) => {
  const userId = args.user_id;
  db.ref("search")
    .once("value")
    .then((snapshot: any[]) => {
      const store: any[] = [];
      snapshot.forEach((childSnapshot: { key: any; val: () => any }) => {
        if (childSnapshot.val().user_id === userId) {
          let child_val = childSnapshot.val();
          store.push(child_val.results);
        }
      });
      console.log(store);
      return store;
    })
    .catch((e: any) => console.log(e));
};

// console.log(get("OcIe1K17fzTz9sxN8jxGVshymFi2"));

const root = {
  result: get,
};

app.use(
  "/graphql",
  expressGraphql({
    schema,
    graphiql: true,
    rootValue: root,
  })
);

// app.get(
//   "/graphql",
//   expressGraphql({
//     graphiql: true,
//     schema: schema,
//     rootValue: root,
//   })
// );

app.get("/", (req: any, res: any) => {
  res.json({
    message: "Welcome, Seaven",
  });
});

app.post("/api", async (req: any, res: any) => {
  // console.log(req.body.latitude, req.body.longitude);

  const { latitude, longitude, radius = "2000", type = "hospital" } = req.body;

  const location = `${latitude}, ${longitude}`;
  // console.log(radius, type);

  let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.KEY}&location=${location}&radius=${radius}&type=${type}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  return res.json({
    ...data,
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`listening on ${PORT}`));
