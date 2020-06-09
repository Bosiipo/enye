import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Search from "./components/Search";

const App: React.FC = () => {
  const [radius, setRadius] = useState("");

  const onChange = (event: any) => {
    setRadius(event.target.value);
  };

  const searchHospital = (event: any) => {
    const fencing_radius = event.target.value;

    console.log(fencing_radius);

    // const key = process.env.REACT_APP_API_KEY;
    const location = "6.465422, 3.406448";
    // console.log(fencing_radius, key, location);
    // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json
    //               `;

    fetch(
      `https://trueway-places.p.rapidapi.com/FindPlacesNearby?type=hospital&radius=${fencing_radius}&language=en&location=${location}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "trueway-places.p.rapidapi.com",
          "x-rapidapi-key":
            "7b6a221559msh553286b9eb206d8p11701fjsn6a252ea409a7",
        },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    // axios
    //   .get(url, {
    //     params: {
    //       location: location,
    //       radius: fencing_radius,
    //       type: "hospital",
    //       keyword: "hospital",
    //       key: key,
    //     },
    //   })
    //   .then((response) => console.log(response))
    //   .then((data: any) => console.log(data))
    //   .catch((err: any) => console.error(err));
  };

  return (
    <div className="App">
      <Search searchHospital={searchHospital} onChange={onChange} />
    </div>
  );
};

export default App;

// ?location=${location}
// &radius=${fencing_radius}
// &type=${"hospital"}
// $keyword=${"hospital"}
// &key=${key}
// , {
//   mode: "cors",
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "content-type": "application/json",
//   },
// }

// fetch("https://trueway-places.p.rapidapi.com/FindPlacesNearby?type=cafe&radius=150&language=en&location=37.783366%252C-122.402325", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "trueway-places.p.rapidapi.com",
// 		"x-rapidapi-key": "7b6a221559msh553286b9eb206d8p11701fjsn6a252ea409a7"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.log(err);
// });
