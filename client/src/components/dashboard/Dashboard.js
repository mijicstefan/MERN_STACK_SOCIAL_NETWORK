import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { loadUser } from "../../actions/auth";
import Navbar from "../navbar/Navbar";
import DataForm from "../userProfile/UserProfile";
import { Grid } from "@material-ui/core";
import PrivateRoute from "../routing/PrivateRoute";
import AllBloggers from "../teachers/AllBloggers";
import TeacherCard from "../teachers/TeacherCard";
import TeacherProfile from "../teachers/TeacherProfile";
// import UserProfile from "../userProfile/Notifications";
import Notifications from "../userProfile/Notifications";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AllBlogs from "../blogs/AllBlogs";
import UserProfile from "../userProfile/UserProfile";
import FeedPage from "../userProfile/FeedPage";
import CreateBlog from "../blogs/CreateBlog";
import ReadBlog from "../blogs/ReadBlog";
import { loadBlogs } from "../../actions/blog";
import { loadComments } from "../../actions/comments";
import { loadTeachers } from "../../actions/teachers";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter,
} from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   toolbar: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
// }));

const Dashboard = ({ getCurrentProfile, auth, profile, loadUser, loadTeachers }) => {
  //   const classes = useStyles();

  useEffect(()=>{
    loadBlogs();
    loadComments();
    loadTeachers();


  }, []);
  return (
    <BrowserRouter>
      <Fragment>
        <Grid container justify='center'>
          <Grid item xs={12}>
            <Navbar />
          </Grid>
          <Grid item xs={12}>
            <main>
              <div />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={FeedPage} />
                <PrivateRoute exact path="/myprofile" component={UserProfile} />
                <PrivateRoute exact path="/blogs" component={AllBlogs} />
                <PrivateRoute exact path="/newBlog" component={CreateBlog} />
                <PrivateRoute exact path="/readBlog" component={ReadBlog} />
                <PrivateRoute
                  exact
                  path="/notifications"
                  component={Notifications}
                />
                <PrivateRoute exact path="/bloggers" component={AllBloggers} />
                <PrivateRoute
                  exact
                  path="/categories"
                  component={Notifications}
                />
                <Grid item justify='space-around' xs={12}>
                  <PrivateRoute
                    eaxct
                    path="/teacherProfile"
                    component={TeacherProfile}
                  />
                </Grid>
              </Switch>
            </main>
          </Grid>
        </Grid>
      </Fragment>
    </BrowserRouter>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  loadUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state?.auth,
  profile: state?.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, loadUser, loadBlogs, loadTeachers })(
  Dashboard
);
