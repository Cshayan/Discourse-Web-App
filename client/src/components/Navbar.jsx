import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "../material";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOutUser } from "../actions/auth";
import PropTypes from "prop-types";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BookIcon from "@material-ui/icons/Book";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    margin: "0 5px",
    outline: "none",
  },
}));

const Navbar = ({ auth: { isAuthenticated, isLoading, user }, logOutUser }) => {
  const classes = useStyles();

  // Create authentication links - Links only be visible when user is logged in
  const authLinks = (
    <ul
      style={{
        listStyleType: "none",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <li>
        <a href="#!" className={classes.link}>
          <span>
            {" "}
            <AccountCircleIcon />{" "}
            {!isLoading && isAuthenticated && user ? user.name : ""}
          </span>
        </a>
      </li>
      <li>
        <a href="#!" onClick={logOutUser} className={classes.link}>
          <span>
            {" "}
            <ExitToAppIcon /> Logout
          </span>
        </a>
      </li>
    </ul>
  );

  // Create Guest links - Links only be visisble when user is not logged in
  const guestLinks = (
    <ul
      style={{
        listStyleType: "none",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <li>
        <Link to="/register" className={classes.link}>
          <LockOpenIcon /> Register
        </Link>
      </li>
      <li>
        <Link to="/login" className={classes.link}>
          <VpnKeyIcon /> Login
        </Link>
      </li>
      <li>
        <Link to="/about" className={classes.link}>
          <InfoIcon /> About
        </Link>
      </li>
    </ul>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">
              <BookIcon /> Discourse
            </Link>
          </Typography>
          {!isLoading && isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.prototype = {
  auth: PropTypes.object.isRequired,
  logOutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logOutUser })(Navbar);
