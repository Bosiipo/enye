import React, { useState, useEffect } from "react";
import "./App.css";
import { HospitalProps } from "./components/Interfaces";
import Search from "./components/Search";
import HospitalList from "./components/HospitalList";
import Navbar from "./components/Navbar";
import History from "./components/History";
import { makeStyles } from "@material-ui/core/styles";
import "./firebase/firebase";

const useStyles = makeStyles({
  main: {
    display: "flex",
  },
  forty: {
    width: "35%",
    // padding: "60px",
    border: "2px solid black",
  },
  sixty: {
    width: "65%",
  },
});

const App: React.FC = () => {
  const classes = useStyles();
  const [radius, setRadius] = useState<number>(1);
  const [type, setType] = useState<string>("hospital");
  const [hospitals, setHospitals] = useState<Array<HospitalProps>>([]);

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  const searchHospital = async (radius: number) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const data = { latitude, longitude, type, radius: radius * 1000 };
        const options = {
          method: "POST",
          mode: "cors" as RequestMode,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        const response = await fetch("http://localhost:3001/api", options);
        const results = await response.json();
        setHospitals(results);
        console.log(results);
      });
    } else {
      alert(
        "This app needs to access your current location in order for it to work"
      );
    }
    // console.log("===>(inside searchHospital)", hospitals);
  };

  // console.log("===>(outside searchHospital)", hospitals);

  return (
    <div className="App">
      <Navbar />
      <div className={classes.main}>
        <div className={classes.forty}>
          <Search
            searchHospital={searchHospital}
            onChangeRadius={(e) => setRadius(Number(e.target.value))}
            onChangeType={(e) => setType(e.target.value)}
            radius={radius}
            // className={classes.forty}
          />
          <History />
        </div>
        <div className={classes.sixty}>
          <HospitalList hospitals={hospitals} />
        </div>
      </div>
    </div>
  );
};

export default App;
