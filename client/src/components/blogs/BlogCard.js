import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import image from "../../img/showcase.jpg";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { blogSelected } from "../../actions/blog";
import { Link } from "react-router-dom";
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const MediaCard = ({ blogSelected, blog }) => {
  const classes = useStyles();


  const handleClick = (e) => {
    console.log(`id kliknutog bloga je: ${[e.currentTarget.name]}`);
    blogSelected([e.currentTarget.name]);
  };


  if(blog.blogger.name){
    console.log('Ime blogera je: ', blog.blogger.name);
  }
  

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={blog.blogName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {blog.blogName.substring(0,16) + "..."}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <CreateRoundedIcon/> Author: {blog.blogger.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={(e) => handleClick(e)}
          size="small"
          variant='contained'
          color="primary"
          component={Link}
          to={"/readBlog"}
          name={blog._id}
        >
          Read
        </Button>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
    blog: PropTypes.object.isRequired,
    blogSelected: PropTypes.func.isRequired
};


const mapStateToProps = state => ({


});



export default connect(mapStateToProps, { blogSelected })(MediaCard);
