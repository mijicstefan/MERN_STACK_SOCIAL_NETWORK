import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Paper, Grid, Typography, Chip } from "@material-ui/core";
import image from "../../img/user-avatar.png";
import VerifiedUserRoundedIcon from "@material-ui/icons/VerifiedUserRounded";
import EuroSymbolRoundedIcon from "@material-ui/icons/EuroSymbolRounded";
import { connect } from "react-redux";
import FreeTerms from "./FreeTermsTable";
import Rating from "./Rating";
import BlogRecentFeed from "../blogs/BlogRecentFeed";
import { loadBlogs } from "../../actions/blog";
import { loadComments } from "../../actions/comments";

function TeacherProfile({ teacherID, teachers, blogs, loadBlogs, loadComments }) {

  useEffect(()=>{
    loadBlogs();
    loadComments();
  }, []);

  return (
    <div>
      {teachers.map(
        (t) =>
          t._id === teacherID && (
            <Fragment>
              <Grid container justify='center'>
                <Grid container spacing={6}>
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
                      <Grid item><b><i>{`"${t.biography.substring(0,150)}..."`}</i></b></Grid>
                    </Grid>
                    <Grid container>
                      <Rating />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container justify='flex-start' spacing={4}>
                <Grid item xs={5}>
                  <Typography variant='h5'><i>Recent feed</i></Typography>
                </Grid>
              </Grid>
              <Grid container spacing={6}>
                {blogs ? blogs.map(b => (
                  b.blogger._id === teacherID && <Grid item xs={12}><BlogRecentFeed blog={b}  blogName={b.blogName}/></Grid>
                )): (<Grid item> <p></p> </Grid>)}
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
  blogs: state?.blog?.allBlogs[0]
});

export default connect(mapStateToProps, { loadBlogs, loadComments })(TeacherProfile);
