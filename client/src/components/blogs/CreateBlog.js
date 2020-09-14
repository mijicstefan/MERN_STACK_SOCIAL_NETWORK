import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  TextField,
  Paper,
  TextareaAutosize,
  Fab,
  Button,
} from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { postBlog } from "../../actions/blog";
import { connect } from "react-redux";
import blog from "../../reducers/blog";
import img from "../../img/createBlog.svg";
import AlertMessage from "../layout/Alert";

const CreateBlog = ({ postBlog, userName }) => {
  const [blogData, setBlogData] = useState({
    blogName: "",
    category: "",
    content: "",
  });

  const handleBlogPost = (e) => {
    e.preventDefault();
    const { blogName, category, content } = blogData;
    console.log("post blog handler activated");
    postBlog(blogName, category, content);
  };

  const onChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
    console.log(blogData);
  };

  return (
    <div>
      <AlertMessage />
      <Grid container spacing={3} justify='space-between'>
        <Grid item xs={5}>
          <img src={img} />
        </Grid>
        <Grid item justify="center" xs={5}>
          <Typography variant="h3">
            {userName}, let's make a new Blog!
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify='flex-start' spacing={4}>
        <Grid item xs={3}>
          <TextField
            name="blogName"
            onChange={(e) => onChange(e)}
            id="standard-basic"
            label="Blog name"
            variant="standard"
            color="primary"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
          <Grid item xs={3}>
            <TextField
              name="category"
              onChange={(e) => onChange(e)}
              id="standard-basic"
              label="Category"
              variant="standard"
              color="primary"
            />
          </Grid>
        </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            onChange={(e) => onChange(e)}
            name="content"
            id="outlined-multiline-static"
            label="Blog Content"
            multiline
            rows={10}
            variant="outlined"
            fullWidth={true}
            placeholder="min. 500 letters."
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <Button
            onClick={(e) => handleBlogPost(e)}
            variant="contained"
            color="primary"
          >
            Publish Blog
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

CreateBlog.propTypes = {
  postBlog: PropTypes.func.isRequired,
  userName: PropTypes.string,
};

const mapStateToProps = (state) => ({
  userName: state.auth.user.name,
});

export default connect(mapStateToProps, { postBlog })(CreateBlog);
