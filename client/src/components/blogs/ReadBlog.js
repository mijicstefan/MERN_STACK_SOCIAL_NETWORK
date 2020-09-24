import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Paper,
  Grid,
  Typography,
  Chip,
  Avatar,
  Divider,
  TextField,
  Button,
} from "@material-ui/core";
import image from "../../img/math.jpg";
import VerifiedUserRoundedIcon from "@material-ui/icons/VerifiedUserRounded";
import Skeleton from '@material-ui/lab/Skeleton';
import { loadComments, addComment} from "../../actions/comments";
import userAvatarIMG from "../../img/user-avatar.png";



function ReadBlog({ blogID, blogs, user, loadComments, allComments, addComment }) {
  console.log("Blogs from ReadBlogs Component: ", blogs);
  console.log("Blog Selected id iz ReadBlogs Componenete: ", blogID);


  const [comment, setComment] = useState({
    commentInput: '',
    from: user,
    toBlog: blogID
  });



  const onChange = e => {
    setComment({...comment, [e.target.name]: e.target.value });
    console.log(comment);
    
  };

  useEffect(()=>{
    loadComments();
  }, []);

  const handleAddComment = () => {
    const { commentInput, toBlog } = comment;
    addComment(commentInput, blogID);
  }


  

  const imgStyle = {
    maxHeight:800,
    maxWidth:1000,
  };




  return (
    <div>
      {blogs &&
        blogs.map(
          (b) =>
            b._id === blogID && (
              <Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <img style={imgStyle} src='https://source.unsplash.com/random' />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography color="textPrimary" variant="h3">
                      {b.blogName}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography color="textSecondary" variant="h6">
                      Author: {b.blogger.name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography display='block' variant='h5' fontStyle="oblique" color="textPrimary">
                      {b.content}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h3">Comments</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Write your comment here"
                      multiline
                      rows={4}
                      variant="outlined"
                      fullWidth={true}
                      color='primary'
                      name='commentInput'
                      onChange={e => onChange(e)}
                    />
                  </Grid>
                  <Grid item>
                    <Button onClick={e => handleAddComment()} color='primary' variant='contained'>Add comment</Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper elevation={3} m={4} variant="outlined">
                      {allComments && allComments.map((c) => c.blogID === blogID && (
                        <Fragment>
                          <Paper elevation={2} m={4} variant="contained">
                            <Grid container justify="flex-start">
                              <Grid item xs={1}>
                                <Avatar
                                  alt="Remy Sharp"
                                  src={userAvatarIMG}
                                />
                              </Grid>
                              <Grid item xs={4}>
                                <Typography variant="h5" color="textPrimary">
                                  {c.blogger.name}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={12}>
                                <Typography variant="h6" color="textSecondary">
                                  {c.content}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Paper>
                          <Divider />
                        </Fragment>
                      ))}
                    </Paper>
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
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  allComments: PropTypes.array,
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  blogID: state?.blog?.selectedBlogID,
  blogs: state?.blog?.allBlogs[0],
  user: state?.auth?.user,
  allComments: state?.comments?.allComments
});

export default connect(mapStateToProps, { loadComments, addComment })(ReadBlog);
