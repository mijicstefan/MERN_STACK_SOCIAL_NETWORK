import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Paper, Grid, Typography, Chip } from "@material-ui/core";
import image from "../../img/math.jpg";
import VerifiedUserRoundedIcon from "@material-ui/icons/VerifiedUserRounded";
import { connect } from "react-redux";

function ReadBlog({ blogID, blogs }) {

  console.log('Blogs from ReadBlogs Component: ', blogs);  
  console.log('Blog Selected id iz ReadBlogs Componenete: ', blogID);
  return (
    <div>
      {blogs && blogs.map(
        (b) =>
          b._id === blogID && (
            <Fragment>
              <Grid container>
                <Grid item xs={10}>
                  <img src={image}/>
                </Grid>
              </Grid>
            </Fragment>
          )
      )}
    </div>
  );
}

ReadBlog.propTypes = {
  blogID: PropTypes.string,
  blogs: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  blogID: state?.blog?.selectedBlogID,
  blogs: state?.blog?.allBlogs[0]
});

export default connect(mapStateToProps, {})(ReadBlog);
