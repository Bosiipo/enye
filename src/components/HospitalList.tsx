import React from "react";
import HospitalProps from "./Interfaces";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HospitalList: React.FC<HospitalProps> = (hospitals) => {
  //   const inputRef = useRef<HTMLInputElement>(null);
  console.log(hospitals);
  return (
    <div className="App">
      <Container maxWidth="sm">
        {hospitals.results.map((result) => (
          <List
            key={result.id}
            style={{
              margin: "7px",
              borderRadius: "9px",
              padding: "15px",
              backgroundColor: "seagreen",
              color: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h3
                style={{
                  paddingTop: "19px",
                  paddingLeft: "27px",
                }}
              >
                {result.poi.name}
              </h3>
              <span>
                <FontAwesomeIcon icon="first-aid" className="icon" />
              </span>
            </div>

            <p
              style={{
                paddingLeft: "30px",
              }}
            >
              Address: {result.address.freeformAddress},{" "}
              {result.address.country}
            </p>
          </List>
        ))}
      </Container>
    </div>
  );
};

export default HospitalList;
