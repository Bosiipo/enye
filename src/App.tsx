import React, { useState, useEffect } from "react";
import "./App.css";
import { HospitalProps } from "./components/Interfaces";
import Search from "./components/Search";
import HospitalList from "./components/HospitalList";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const [radius, setRadius] = useState<string>("1");
  const [hospitals, setHospitals] = useState<Array<HospitalProps>>([]);
  const [cord, setCord] = useState<string>("");

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if ("geolocation" in navigator) {
      console.log("geolocation is available");
      navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        setCord(`${latitude}, ${longitude}`);
      });
    } else {
      console.log("geolocation is not available");
    }
  };

  console.log(cord);
  // console.log(lat, long);

  const searchHospital = (event: any) => {
    const key = process.env.REACT_APP_API_KEY;
    let obj = {
      type: "CIRCLE",
      position: cord,
      radius,
    };
    let json_obj = JSON.stringify(obj);

    fetch(
      "https://api.tomtom.com/search/2/categorySearch/hospital.json?key=" +
        key +
        "&geometryList=[" +
        json_obj +
        "]"
    )
      .then((res) => res.json())
      .then((data) => {
        setHospitals(data.results);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="App">
      <Navbar />
      <Search
        searchHospital={searchHospital}
        onChange={(e) => setRadius(e.target.value)}
        radius={radius}
      />
      <HospitalList hospitals={hospitals} />
    </div>
  );
};

export default App;
