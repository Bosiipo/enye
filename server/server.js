const express = require('express');
// const bodyParser = require('body-parser');
const fetch = require('node-fetch');
// const request = require('request');

const app = express();
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header("Access-Control-Allow-Origin","*")
  next();
});

app.get('/', (req, res) => {
 
    res.json({
        message: 'Welcome, Seaven'
    });
});

app.post('/api', async (req, res) => {
  // console.log(req.body.latitude, req.body.longitude);

  const { latitude, longitude, radius = '2000', type = 'hospital' } = req.body;

  const location = `${latitude}, ${longitude}`;
  // console.log(radius, type);

  let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.KEY}&location=${location}&radius=${radius}&type=${type}`

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  return res.json({
    ...data
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));