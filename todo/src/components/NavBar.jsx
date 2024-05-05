import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "./NavBar.css";
import { useSelector } from "react-redux";

function NavBar() {
  const user = useSelector((state) => state.user);
  const userName = user.length > 0 ? user[0] : null;
  return (
    <div className="NavBar d-flex">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: "#232f3e" }}>
          <Toolbar>
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ textAlign: "center" }}
              className="navbar-typography"
            >
              Redux To-Do-Application
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ color: "white" }}>{userName}</div>
      </Box>
    </div>
  );
}

export default NavBar;
