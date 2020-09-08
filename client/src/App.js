import React, { Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import UserDashboard from "./components/userProfile/UserDashboard";


import './App.css';


//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";



//Check if user token is ready and set x-auth headers
//and attach token to that with every future request.
if(localStorage.token) {
  setAuthToken(localStorage.token);
  console.log("User loaded and token is ready to use.");
}
else{
  setAuthToken(localStorage.token);
  console.log("Token is missing and auth header is deleted.");
}

const App = () => {

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    document.body.appendChild(link);

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href = "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap";
    document.body.appendChild(link2);

  }, []);

  

  useEffect(() => {
    console.log(`Loading user!`);
    store.dispatch(loadUser());
  }, []);
  
  return (
    <Provider store = {store}>
    <Router>
      <Fragment>
        <Navbar/>
        <Route exact path='/' component={ Landing }/>
        <section className="container">
          <Alert/>
          <Switch>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <PrivateRoute exact path="/myprofile" component={UserDashboard}/>
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
  );
};

export default App;
