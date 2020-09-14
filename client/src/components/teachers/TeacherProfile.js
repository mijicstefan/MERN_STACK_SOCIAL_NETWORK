import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Paper, Grid, Typography, Chip } from "@material-ui/core";
import image from "../../img/math.jpg";
import VerifiedUserRoundedIcon from "@material-ui/icons/VerifiedUserRounded";
import EuroSymbolRoundedIcon from "@material-ui/icons/EuroSymbolRounded";
import { connect } from "react-redux";
import FreeTerms from "./FreeTermsTable";
import Rating from "./Rating";

function TeacherProfile({ teacherID, teachers }) {
  return (
    <div>
      {teachers.map(
        (t) =>
          t._id === teacherID && (
            <Fragment>
              <Grid container>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <img src={image} />
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container spacing={3}>
                      <Grid item>
                        <Typography variant="h4">{t.name}</Typography>
                        <VerifiedUserRoundedIcon /> <span style={{color:'green'}}>Verified Blogger</span>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item><b><i>{`"${t.biography}"`}</i></b></Grid>
                    </Grid>
                    <Grid container>
                      <Rating />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={5}>
                  <Typography variant='h2'>Recent feed</Typography>
                </Grid>
              </Grid>
            </Fragment>
          )
      )}
    </div>
  );
}

TeacherProfile.propTypes = {
  teacherID: PropTypes.string,
  teachers: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  teacherID: state?.teachers?.teacherSelectedID,
  teachers: state?.teachers?.teachers?.data,
});

export default connect(mapStateToProps, {})(TeacherProfile);
