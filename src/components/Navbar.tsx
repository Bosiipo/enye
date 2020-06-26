import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "../firebase/firebase";

const useStyles = makeStyles({
  app_bar: {
    backgroundColor: "black",
    boxShadow: "none",
    padding: "10px 0px",
  },
  controls: {
    display: "flex",
  },
  parent_head: {
    width: "100%",
  },
  head: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    margin: "3px",
    padding: "7px",
    height: "fit-content",
    alignSelf: "center",
    fontSize: "smaller",
    color: "springgreen",
  },
});

interface Props {
  signOut: () => void;
  onRouteChange: (route: string) => void;
}

const Navbar: React.FC<Props> = ({ signOut, onRouteChange }) => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.app_bar}>
        <Toolbar>
          <div className={classes.parent_head}>
            <div className={classes.head}>
              <h4>
                In this COVID world that we live in, it is important that people
                can easily access medical assistance if need be...
              </h4>
              {auth.currentUser === null ? (
                <div className={classes.controls}>
                  {/* <button
                    
                  >
                    Register
                  </button> */}
                  <Button
                    size="small"
                    // variant="outlined"
                    color="primary"
                    className={classes.button}
                    onClick={() => onRouteChange("sign_up")}
                  >
                    Register
                  </Button>
                  <Button
                    size="small"
                    // variant="outlined"
                    color="secondary"
                    className={classes.button}
                    onClick={() => onRouteChange("login")}
                  >
                    Log In
                  </Button>
                </div>
              ) : (
                <Button
                  size="small"
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                  onClick={signOut}
                >
                  Sign Out
                </Button>
              )}
            </div>
            <div>
              <p>Locate all the hospitals within a given area.</p>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
