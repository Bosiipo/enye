import React, { useState, useEffect } from "react";
import "./App.css";
import { HospitalProps, HistoryProps } from "./components/Interfaces";
import Search from "./components/Search";
import HospitalList from "./components/HospitalList";
import Navbar from "./components/Navbar";
import History from "./components/History";
import { makeStyles } from "@material-ui/core/styles";
import "./firebase/firebase";
import { database } from "./firebase/firebase";

const useStyles = makeStyles({
  main: {
    display: "flex",
  },
  forty: {
    width: "35%",
  },
  sixty: {
    width: "65%",
  },
});

const App: React.FC = () => {
  const classes = useStyles();
  const [radius, setRadius] = useState<number>(1);
  const [type, setType] = useState<string>("hospital");
  const [history, setHistory] = useState<Array<HistoryProps>>([]);
  const [hospitals, setHospitals] = useState<Array<HospitalProps>>([]);
  const [historyData, setHistoryData] = useState<HistoryProps>();

  // useEffect(() => {
  //   fetch("http://localhost:3001/")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);

  useEffect(() => {
    database
      .ref("data")
      .once("value")
      .then((snapshot) => {
        const store: any[] = [];
        snapshot.forEach((childSnapshot) => {
          store.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        // console.log(store);
        setHistory(store.reverse());
      });
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
        const response = await fetch(
          "https://enyee.herokuapp.com/api",
          options
        );
        const results = await response.json();
        setHospitals(results);
        setHistoryData(undefined);
        database.ref("data").push({
          type,
          radius: `${radius}km`,
          results: results.results,
        });
        database
          .ref("data")
          .once("value")
          .then((snapshot) => {
            const store: any[] = [];
            snapshot.forEach((childSnapshot) => {
              store.push({
                id: childSnapshot.key,
                ...childSnapshot.val(),
              });
            });
            // console.log(store);
            setHistory(store.reverse());
          });
      });
    } else {
      alert(
        "This app needs to access your current location in order for it to work"
      );
    }
  };

  const renderHistory = (id: string) => {
    history.map((el) => {
      if (el.id === id) {
        setHistoryData(el);
      }
    });
  };

  // useEffect(() => {
  //   renderHistory("-MA5lmqIrJMnY-dkkOy-");
  // });

  // history.map((hus) => console.log(hus.id));

  // console.log(history);

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
          />
          <History history={history} renderHistory={renderHistory} />
        </div>
        <div className={classes.sixty}>
          <HospitalList hospitals={hospitals} historyData={historyData} />
        </div>
      </div>
    </div>
  );
};

export default App;
