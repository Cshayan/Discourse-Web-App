import React, { useEffect } from "react";
import {
  Navbar,
  Landing,
  Login,
  Register,
  Alert,
  PrivateRoute,
  Dashboard,
  About,
} from "./components/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { setAuthToken } from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import { TOKEN } from "./constants/constants";
import store from "./store/store";
import "./App.css";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

if (localStorage.getItem(TOKEN)) {
  setAuthToken(localStorage.getItem(TOKEN));
}

const App = () => {
  // useEffect - to run only once when component is mounted to load the user if token exists
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Alert />
        <ReactNotification />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route exact path="/about" component={About} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
