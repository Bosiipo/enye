const express = require("express");
const fetch = require("node-fetch");
const expressGraphql = require("express-graphql");
const schema = require("./schema");
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

const database = admin.firestore();

const root = {
  User: {
    email: () => {
      database
        .collection("users")
        .get()
        .then((querySnapshot: any) => {
          let email;
          querySnapshot.docs.map((doc: any) => {
            email = doc.data().email;
          });
          return email;
        });
    },
  },
  Query: {
    users: async () => {
      return await database
        .collection("users")
        .get()
        .then((querySnapshot: any) => {
          let data: any[] = [];
          querySnapshot.forEach((doc: any) => {
            // console.log(doc.id, " => ", doc.data());
            data.push({ id: doc.id, ...doc.data() });
          });
          console.log(data);
          return data;
        })
        .catch((e: any) => console.log(e));
    },
  },
};

app.use(
  "/graphql",
  expressGraphql({
    schema,
    graphiql: true,
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
