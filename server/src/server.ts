const express = require("express");
const fetch = require("node-fetch");
const schema = require("./schema");
const cors = require("cors");
const expressGraphql = require("express-graphql");
const app = express();

app.use(express.json());
app.use((req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(cors());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// create a new server
const PORT = process.env.PORT || 3001;

app.use(
  "/graphql",
  expressGraphql({
    schema,
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
  // console.log(data);

  return res.json({
    ...data,
  });
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
