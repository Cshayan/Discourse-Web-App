import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button, Card, CardContent } from "../material/index";
import loginImg from "../assests/login.png";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../actions/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "5rem",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  img: {
    width: "80%",
    height: "40%",
  },
  registerBtn: {
    backgroundColor: "#341f97",
    color: "#fff",
    "&:hover": {
      opacity: "0.9",
      backgroundColor: "#341f97",
      color: "#fff",
    },
  },
  input: {
    width: "90%",
    padding: "0.5rem",
    margin: "7px 0",
    border: "2px solid #341f97",
  },
  form: {
    margin: "10px 0",
  },
}));

const Login = ({ loginUser, isAuthenticated }) => {
  const classes = useStyles();

  // useState
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Destructure formData
  const { email, password } = formData;

  // onChangeHandler
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // onSubmitHandler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    loginUser({ email, password });
  };

  // redirect to dashboard anytime if the user is authenticated
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} sm={12} lg={6} style={{ textAlign: "center" }}>
          <img src={loginImg} alt="hero" className={classes.img} />
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h4">Login to your account.</Typography>{" "}
              <br />
              <p>Welcome back. Start exploring.</p>
              <form
                className={classes.form}
                onSubmit={(e) => onSubmitHandler(e)}
              >
                <input
                  type="email"
                  className={classes.input}
                  placeholder="Your email"
                  name="email"
                  value={email}
                  onChange={(e) => onChangeHandler(e)}
                />
                <input
                  type="password"
                  name="password"
                  className={classes.input}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => onChangeHandler(e)}
                />
                <Button type="submit" className={classes.registerBtn}>
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

Login.prototype = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(Login);
