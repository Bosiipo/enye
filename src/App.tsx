import React, { useState } from "react";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFirstAid } from "@fortawesome/free-solid-svg-icons";
import { HospitalProps } from "./components/Interfaces";
import Search from "./components/Search";
import HospitalList from "./components/HospitalList";
import Navbar from "./components/Navbar";

const hospital = [
  {
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
  },
];

library.add(faFirstAid);

const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [radius, setRadius] = useState<string>("1");
  const [hospitals, setHospitals] = useState<Array<HospitalProps>>([]);

  const searchHospital = (event: any) => {
    // const fencing_radius = Number(event.target.value);

    // console.log(fencing_radius, typeof fencing_radius);

    const key = process.env.REACT_APP_API_KEY;
    const location = "6.465422, 3.406448";
    let obj = {
      type: "CIRCLE",
      position: location,
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
