import React, { useState } from "react";
import "./App.css";
// import Button from "@material-ui/core/Button";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";
import HospitalProps from "./components/Interfaces";
import Search from "./components/Search";
import List from "./components/List";

const hospital = {
  type: "",
  id: "",
  score: null,
  info: "",
  entityType: "",
  poi: {
    name: "",
    categorySet: [{ id: null }],
    categories: [],
    classifications: [{ code: "", names: [{ nameLocale: "", name: "" }] }],
  },
  address: {
    streetNumber: "",
    streetName: "",
    municipalitySubdivision: "",
    municipality: "",
    countrySecondarySubdivision: "",
    countryTertiarySubdivision: "",
    countrySubdivision: "",
    postalCode: "",
    extendedPostalCode: "",
    countryCode: "",
    country: "",
    countryCodeISO3: "",
    freeformAddress: "",
    countrySubdivisionName: "",
    localName: "",
  },
  position: {
    lat: null,
    lon: null,
  },
  mapcodes: [
    {
      type: "",
      fullMapcode: "",
      territory: "",
      code: "",
    },
  ],
  viewport: {
    topLeftPoint: {
      lat: null,
      lon: null,
    },
    btmRightPoint: {
      lat: null,
      lon: null,
    },
  },
  entryPoints: [
    {
      type: "",
      functions: [""],
      position: {
        lat: null,
        lon: null,
      },
    },
  ],
  addressRanges: {
    rangeLeft: "",
    rangeRight: "",
    from: {
      lat: null,
      lon: null,
    },
    to: {
      lat: null,
      lon: null,
    },
  },
  dataSources: {
    chargingAvailability: {
      id: "",
    },
    geometry: {
      id: "",
    },
    poiDetails: [
      {
        id: "",
        sourceName: "",
      },
    ],
  },
};

const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [radius, setRadius] = useState<string>("");
  const [hospitals, setHospitals] = useState<HospitalProps>(hospital);

  const onChange = (event: any) => {
    setRadius(event.target.value);
  };

  const searchHospital = (event: any) => {
    const fencing_radius = Number(event.target.value);

    console.log(fencing_radius, typeof fencing_radius);

    const key = process.env.REACT_APP_API_KEY;
    const location = "6.465422, 3.406448";
    // const lat = 6.465422;
    // const long = 3.406448;
    let obj = {
      type: "CIRCLE",
      position: location,
      radius: fencing_radius,
    };
    let json_obj = JSON.stringify(obj);
    // console.log(JSON.stringify(obj));

    fetch(
      "https://api.tomtom.com/search/2/categorySearch/hospital.json?key=" +
        key +
        "&geometryList=[" +
        json_obj +
        "]"
    )
      .then((res) => res.json())
      .then((data) => {
        data.results.forEach((result: any) => {
          setHospitals(result);
          return <List key={result.id} {...result} />;

          // console.log(result);
        });
      })
      .catch((e) => console.log(e));
  };

  // console.log(hospitals);

  return (
    <div className="App">
      <Search searchHospital={searchHospital} onChange={onChange} />
      <List {...hospitals} />
    </div>
  );
};

export default App;
