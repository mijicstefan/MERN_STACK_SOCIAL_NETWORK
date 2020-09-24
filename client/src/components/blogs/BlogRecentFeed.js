import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Redirect, Link } from "react-router-dom";
import { blogSelected } from "../../actions/blog";
import { connect } from "react-redux";
import InsertCommentRoundedIcon from "@material-ui/icons/InsertCommentRounded";
import PropTypes from "prop-types";
import { loadComments } from "../../actions/comments";
import { Chip, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
  },
  media: {
    height: 140,
  },
});

const MediaCard = ({
  blogName,
  blog,
  blogSelected,
  allComments,
  loadComments,
}) => {
  const classes = useStyles();

  const handleReadMore = (e) => {
    const blogID = [e.currentTarget.name];
    blogSelected(blogID);
  };

  useEffect(() => {
    loadComments();
  }, []);

  const calculateComments = () => {
    const commentsForBlog = allComments.flatMap((c) =>
      c.blogID === blog._id ? [] : c
    );
    console.log("comment arrays for blog: ", commentsForBlog);

    const realNumberOfComments = allComments.length - commentsForBlog.length;

    //   const numberOfComments = commentsForBlog.length;
    //   console.log('Broj komentara za ovaj blog je: ', numberOfComments);
    return realNumberOfComments;
  };
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component={Link}
          to={"/readBlog"}
          onClick={(e) => handleReadMore(e)}
          className={classes.media}
          image="https://source.unsplash.com/random"
          title={blogName}
          name={blog._id}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {blogName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {blog.content.substring(0, 150) + "..."}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container spacing={1}>
          <Grid item>
            <Button
              component={Link}
              to={"/readBlog"}
              variant="contained"
              onClick={(e) => handleReadMore(e)}
              name={blog._id}
              size="small"
              color="primary"
            >
              Read More
            </Button>
          </Grid>
          <Grid item>
            <InsertCommentRoundedIcon /> {calculateComments()} comments
          </Grid>
          <Grid item alignItems='flex-end'>
            <Chip clickable={true} label={blog.category} />
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

MediaCard.propTypes = {
  allComments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  allComments: state?.comments?.allComments,
});

export default connect(mapStateToProps, { blogSelected, loadComments })(
  MediaCard
);
