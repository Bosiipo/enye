import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
// import MenuIcon from '@material-ui/icons/Menu';
// import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  app_bar: {
    backgroundColor: "black",
    boxShadow: "none",
    padding: "10px 0px",
  },
});

const Navbar: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.app_bar}>
        <Toolbar>
          <div>
            <div>
              <h4>
                In this COVID world that we live in, it is important that people
                can easily access medical assistance if need be...
              </h4>
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
