import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LocalHospitalRoundedIcon from "@material-ui/icons/LocalHospitalRounded";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";

const useStyles = makeStyles({
  parent: {
    // width: "60%",
    // display: "flex",
    // justifyContent: "flex-end",
  },
  p: {
    textAlign: "center",
  },
  list: {
    margin: "7px",
    borderRadius: "9px",
    padding: "15px",
    backgroundColor: "seagreen",
    color: "white",
  },
  cover: {
    display: "flex",
    justifyContent: "space-between",
  },
  hospital_name: {
    paddingTop: "19px",
    paddingLeft: "27px",
  },
  address: {
    paddingLeft: "30px",
  },
  icon: {
    color: "orange",
    fontSize: "60px",
    paddingTop: "24px",
    paddingRight: "20px",
  },
});

const HospitalList: React.FC<any> = ({ hospitals }) => {
  const classes = useStyles();
  return (
    <div className={classes.parent}>
      <Container maxWidth="sm">
        {hospitals && hospitals.length === 0 ? (
          <p className={classes.p}>Enter your search radius in metres</p>
        ) : (
          hospitals &&
          hospitals.results.map((result: any) => (
            <List key={result.id} className={classes.list}>
              <div className={classes.cover}>
                <h3 className={classes.hospital_name}>{result.name}</h3>
                <span>
                  {/* <FontAwesomeIcon icon="first-aid" className="icon" /> */}
                  <LocalHospitalRoundedIcon className={classes.icon} />
                </span>
              </div>

              <p className={classes.address}>Address: {result.vicinity}</p>
            </List>
          ))
        )}
      </Container>
    </div>
  );
};

export default HospitalList;
