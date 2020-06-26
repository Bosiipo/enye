import React, { useState, useEffect } from "react";
import "./App.css";
import { HospitalProps, HistoryProps, User } from "./components/Interfaces";
import Search from "./components/Search";
import HospitalList from "./components/HospitalList";
import Navbar from "./components/Navbar";
import History from "./components/History";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { makeStyles } from "@material-ui/core/styles";
import { database, auth } from "./firebase/firebase";
import firebase from "firebase";

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
  const [route, setRoute] = useState<string>(
    localStorage.getItem("route") || "login"
  );
  const [signInStatus, setSignInStatus] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [userId, setUserId] = useState<string>("");

  // Load user's data
  useEffect(() => {
    return onAuthStateChange();
  }, []);

  // Connect Server
  useEffect(() => {
    fetch("https://enyee.herokuapp.com/")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  // Local storage stores route state for page reload
  useEffect(() => {
    localStorage.setItem("route", route);
  }, [route]);

  // Populate History
  useEffect(() => {
    if (currentUser !== undefined && currentUser !== null) {
      database
        .collection("history")
        .where("user_id", "==", currentUser.uid)
        .get()
        .then((querySnapshot) => {
          let history: any[] = [];
          querySnapshot.docs.forEach((doc) => {
            history.push({ id: doc.id, ...doc.data() });
          });
          setHistory(history);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, [currentUser]);

  const onAuthStateChange = () => {
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          // User is signed in.
          user.getIdToken().then((accessToken) => {
            let user_details = {
              displayName: user.displayName,
              email: user.email,
              emailVerified: user.emailVerified,
              photoURL: user.photoURL,
              uid: user.uid,
              phoneNumber: user.phoneNumber,
              providerData: user.providerData,
              accessToken,
            };
            setSignInStatus("Signed in");
            setCurrentUser(user_details);
          });
        } else {
          // User is signed out.
          setSignInStatus("Signed out");
          setCurrentUser(null);
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };

  const handleSignUp = async (event: any) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      let cred: any = await auth.createUserWithEmailAndPassword(
        email.value,
        password.value
      );
      let data = await database.collection("users").add({
        user_id: cred.user.uid,
        email: cred.user.email,
        history: [],
      });
      // Store database generated id
      setUserId(data.id);
      onRouteChange("home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    auth
      .signInWithEmailAndPassword(email.value, password.value)
      .then((cred) => {
        onRouteChange("home");
      })
      .catch((error) => {
        alert("This user does not exist");
      });
    // Store this user's database generated id
    database
      .collection("users")
      .where("email", "==", email.value)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUserId(doc.id);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

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
        // https://enyee.herokuapp.com/api
        // http://localhost:3000/api
        const response = await fetch(
          "https://enyee.herokuapp.com/api",
          options
        );
        const results = await response.json();
        setHospitals(results);
        setHistoryData(undefined);
        // Save search data to database
        if (currentUser !== undefined && currentUser !== null) {
          let archive: any[] = [];
          database.collection("history").add({
            user_id: currentUser.uid,
            type,
            radius: `${radius}km`,
            results: results.results,
          });
          // Populate history for render
          database
            .collection("history")
            .where("user_id", "==", currentUser.uid)
            .get()
            .then((querySnapshot) => {
              querySnapshot.docs.forEach((doc) => {
                console.log(doc.data());
                archive.push({ id: doc.id, ...doc.data() });
              });
              console.log(archive);
              setHistory(archive);
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
          // how do i get doc(id)
          let user = database.collection("users").doc(userId);
          user.update({
            history: firebase.firestore.FieldValue.arrayUnion({
              type,
              radius: `${radius}km`,
              results: results.results,
            }),
          });
        } else {
          alert(
            "This app needs to access your current location in order for it to work"
          );
        }
      });
    }
  };

  // console.log(history);

  const renderHistory = (id: string) => {
    history.map((el) => {
      if (el.id === id) {
        setHistoryData(el);
      }
    });
  };

  // console.log(userId);

  const onRouteChange = (route: string) => {
    setRoute(route);
  };

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        alert("sign out successful");
        setCurrentUser(null);
        // setUserId("");
        onRouteChange("login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <Navbar signOut={signOut} onRouteChange={onRouteChange} />
      <div>
        {route === "sign_up" ? (
          <SignUp handleSignUp={handleSignUp} onRouteChange={onRouteChange} />
        ) : route === "login" ? (
          <Login handleLogin={handleLogin} onRouteChange={onRouteChange} />
        ) : (
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
              <HospitalList
                hospitals={hospitals}
                historyData={historyData}
                currentUser={currentUser}
                signInStatus={signInStatus}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
