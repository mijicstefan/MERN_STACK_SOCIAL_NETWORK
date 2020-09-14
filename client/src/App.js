import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import UserDashboard from "./components/userProfile/UserDashboard";
import "./App.css";

//Redux
import { Provider } from "react-redux";
import store from "./store";

//Auth actions
import { loadUser } from "./actions/auth";
import { loadTeachers } from "./actions/teachers";
import setAuthToken from "./utils/setAuthToken";
import { Grid } from "@material-ui/core";

//Check if user token is ready and set x-auth headers
//and attach token to that with every future request.
if (localStorage.token) {
  setAuthToken(localStorage.token);
  console.log("User loaded and token is ready to use.");
}

const App = () => {
  //Loading Scripts for material ui fonts and icons.
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    document.body.appendChild(link);

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href =
      "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap";
    document.body.appendChild(link2);

    console.log(store.getState());

    // if(store.getState().auth.isAuthenticated){
    //   store.dispatch(loadUser());
    // }

    // store.dispatch(loadTeachers());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Landing} />
          <Grid container>
            <Grid item xs={12}>
              <section className="container">
                <Switch>
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <PrivateRoute
                    exact
                    path="/myprofile"
                    component={UserDashboard}
                  />
                </Switch>
              </section>
            </Grid>
          </Grid>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
