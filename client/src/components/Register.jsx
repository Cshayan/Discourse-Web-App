import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button, Card, CardContent } from "../material/index";
import registerImg from "../assests/register.png";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../actions/auth";

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
    height: "80%",
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

const Register = ({ registerUser, isAuthenticated }) => {
  const classes = useStyles();

  // useState
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Destructure formData
  const { name, email, password } = formData;

  // onChangeHandler
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // onSubmitHandler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    registerUser({ name, email, password });
  };

  // redirect to dashboard anytime if the user is authenticated
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} sm={12} lg={6} style={{ textAlign: "center" }}>
          <img src={registerImg} alt="hero" className={classes.img} />
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h4">Register for a new account</Typography>{" "}
              <br />
              <p>Let's get started. Provide the following details.</p>
              <form
                className={classes.form}
                onSubmit={(e) => onSubmitHandler(e)}
              >
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => onChangeHandler(e)}
                  className={classes.input}
                  placeholder="Your name"
                />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => onChangeHandler(e)}
                  className={classes.input}
                  placeholder="Your email"
                />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => onChangeHandler(e)}
                  className={classes.input}
                  placeholder="Your password"
                />
                <Button type="submit" className={classes.registerBtn}>
                  Register
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

// Proptypes
Register.prototype = {
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { registerUser })(Register);
