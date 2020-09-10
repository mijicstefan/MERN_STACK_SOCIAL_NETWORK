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
              <Grid container spacing={6}>
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <img src={image} />
                  </Grid>
                  <Grid item xs={3}>
                    <Grid container>
                      <Grid item>
                        <Typography variant="h6">{t.name}</Typography>
                        <VerifiedUserRoundedIcon /> Verified Teacher
                      </Grid>
                      <Grid item>
                        <Rating />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    {t.hourlyRate} <EuroSymbolRoundedIcon /> / h
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Chip />
                </Grid>
                <Grid item xs={4}>
                  <Chip color="primary" label="algebra" />
                </Grid>
                <Grid item xs={4}>
                  <Chip color="primary" label="algebra" />
                </Grid>
                <Grid item xs={4}>
                  <Chip color="primary" label="algebra" />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <FreeTerms teacher={t} />
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
  teacherID: state.teachers.teacherSelectedID,
  teachers: state.teachers.teachers.data,
});

export default connect(mapStateToProps, {})(TeacherProfile);
