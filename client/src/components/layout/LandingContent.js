import React from "react";
import PropTypes from "prop-types";
import { Typography, Grid, Button } from "@material-ui/core";
import svgLanding from "../../img/undraw_book_reading_kx9s.svg";
import { Link } from "react-router-dom";

function LandingContent(props) {
  return (
    <section class="landing">
      <div class="dark-overlay">
        <div class="landing-inner">
          <h1 class="x-large">UpSpot</h1>
          <p class="lead">
            Share what you have to share. 
          </p>
          <div class="buttons">
            <Grid container spacing={4}>
              <Grid item xs={5}>
                <Button variant="contained" color="primary">
                <Link to="/login">Login</Link>
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Button variant="contained" color='default'>
                  <Link to="/register">Register</Link>
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </section>
  );
}

LandingContent.propTypes = {};

export default LandingContent;
