import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LocalHospitalRoundedIcon from "@material-ui/icons/LocalHospitalRounded";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";

const useStyles = makeStyles({
  parent: {
    // height: "60%",
    // overflow: "scroll",
    // scrollbarThumb: "",
  },
  scroll: {
    overflowY: "scroll",
    overflowX: "hidden",
    height: "804px",
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
  minor: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: "30px",
    paddingRight: "20px",
  },
});

const HospitalList: React.FC<any> = ({
  hospitals,
  historyData,
  currentUser,
  signInStatus,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.parent}>
      <Container maxWidth="sm" className={classes.scroll}>
        {historyData === undefined ? (
          hospitals && hospitals.length === 0 ? (
            <p className={classes.p}>
              Your search results or history will appear here
            </p>
          ) : (
            hospitals &&
            hospitals.results.map((result: any) => (
              <List key={result.id} className={classes.list}>
                <div className={classes.cover}>
                  <h3 className={classes.hospital_name}>{result.name}</h3>
                  <span>
                    <LocalHospitalRoundedIcon className={classes.icon} />
                  </span>
                </div>

                <p className={classes.address}>Address: {result.vicinity}</p>
              </List>
            ))
          )
        ) : (
          historyData.results.map((result: any) => (
            <List key={result.id} className={classes.list}>
              <div className={classes.cover}>
                <h3 className={classes.hospital_name}>{result.name}</h3>
                <span>
                  <LocalHospitalRoundedIcon className={classes.icon} />
                </span>
              </div>

              <p className={classes.address}>Address: {result.vicinity}</p>
              <div className={classes.minor}>
                <span>
                  Rating:{" "}
                  {typeof result.rating === "number"
                    ? result.rating
                    : "Unavailable"}
                </span>
                {result.opening_hours ? (
                  <span>
                    Status:{" "}
                    {result.opening_hours.open_now === true ? "Open" : "Closed"}
                  </span>
                ) : (
                  <span>Status: Unavailable</span>
                )}
              </div>

              {/* <p className={classes.address}></p> */}
              {/* <p className={classes.address}>Address: {result.vicinity}</p> */}
            </List>
          ))
        )}
      </Container>
    </div>
  );
};

export default HospitalList;
