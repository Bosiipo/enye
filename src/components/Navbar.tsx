import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import MenuIcon from '@material-ui/icons/Menu';
// import IconButton from '@material-ui/core/IconButton';

const Navbar: React.FC = () => {
  return (
    <div>
      <AppBar
        position="static"
        style={{
          backgroundColor: "black",
          boxShadow: "none",
          padding: "10px 0px",
        }}
      >
        <Toolbar>
          <div className="header_logo">
            <div className="font_righteous header_logo_milky_way">
              <h4>
                In this COVID world that we live in, it is important that people
                can easily access medical assistance if need be...
              </h4>
            </div>
            <div
              className="header_logo_title"
              style={{
                letterSpacing: "1px",
              }}
            >
              {/* In this COVID world that we live in, it is important that people
              can easily access medical assistance if need be... */}
              <p>Locate all the hospitals within a given area.</p>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
