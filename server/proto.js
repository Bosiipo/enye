//   const urls = [
    // `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.KEY}&location=${location}&radius=2000&type=hospital`,
    // `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.KEY}&location=${location}&radius=2000&type=pharmacy`
// ];

// function checkStatus(response) {
//   if (response.ok) {
//       return Promise.resolve(response);
//   } else {
//       return Promise.reject(new Error(response.statusText));
//   }
// }

// Promise.all(urls.map(url =>
//   fetch(url)
//       .then(checkStatus)  // check the response of our APIs
//       .then(res => res.json())    // parse it to Json
//       .catch(error => console.log('There was a problem!', error))
//   ))
// .then(data => {
//   // assign to requested URL as define in array with array index.
//   const hospital = data[0];
//   const pharmacy = data[1];
//   let total = [...hospital, ...pharmacy];
//   console.log(total);
//   return total;
//   // return [...hospital, ...pharmacy];
// }).catch((e) => console.log(e));

  // let radius_value = await req.body.radius;
  // fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.KEY}&location=${location}&radius=2000&type=hospital`)
  // .then(res => res.json())
  // .then(data => console.log(data));

  // fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.KEY}&location=${location}&radius=2000&type=pharmacy&`)
  // .then(res => res.json())
  // .then(data => console.log(data));
  // debugger;

//   LOCATION

//  let location = await function() {
//     if ("geolocation" in navigator) {
//       // console.log("geolocation is available");
//       navigator.geolocation.getCurrentPosition((position) => {
//         let latitude = position.coords.latitude;
//         let longitude = position.coords.longitude;
//         return (latitude,longitude);
//       });
//     } else {
//       alert(
//         "This app needs to access your current location in order for it to work"
//       );
//       // window.location = "http://localhost:3000.com/";
//     }
//   };