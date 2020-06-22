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
});

const db = admin.firestore();

const get = (args: any) => {
  const userId = args.user_id;
  return db
    .ref("data")
    .once("value")
    .then((snapshot: any[]) => {
      const store: any[] = [];
      snapshot.forEach((childSnapshot: { key: any; val: () => any }) => {
        store.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      let user_store = store.filter((prevSearch) => {
        return prevSearch.user.user_id === userId;
      });
      return user_store.reverse();
    })
    .catch((e: any) => console.error(e));
};

const root = {
  result: get,
};

app.get(
  "/graphql",
  expressGraphql({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.use(
  "/",
  expressGraphql({
    schema: schema,
    rootValue: root,
  })
);

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
