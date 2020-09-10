import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Nav from './Nav';
import LandingContent from "./LandingContent";



const Landing = () => {
  return (
    <Fragment>
      <Nav/>
      <LandingContent/>
    </Fragment>
  );
};

export default Landing;
