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

// Problem is not from here
const root = {
  Query: {
    // Returns an object which is correct, with a field value which is filled but graphQL returns null
    user: (parent: any, args: any) => {
      const userId = args.userId;
      let user: any;
      return database //This is correct as "return" resolves the promise
        .collection("users")
        .where("user_id", "==", userId)
        .get()
        .then((snapshot: any[]) => {
          snapshot.forEach((doc: { id: any; data: () => any }) => {
            console.log(doc.id, "==>", doc.data()); //Does not console shit!, might be something wrong with this after all?
            user = doc.data();
            return user;
          });
          return user;
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

app.get(
  "/graphql",
  expressGraphql({
    schema,
    rootValue: root,
    graphiql: true,
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
