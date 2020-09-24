import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import image from "../../img/user-avatar.png";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { teacherProfileSelected } from "../../actions/teachers";
import { Link } from "react-router-dom";


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const MediaCard = ({ teacherProfileSelected, teacher }) => {
  const classes = useStyles();

  const handleClick = (e) => {
    console.log(`id kliknutog blogera je: ${[e.currentTarget.name]}`);
    teacherProfileSelected([e.currentTarget.name]);
  };

  let biography = teacher.biography;
  console.log('biografije iz TeacherCard-a: ', biography);

  if(teacher.biography.length > 114){
    biography = teacher.biography.substring(0,114);
  }
  else{
    let biographyLen = teacher.biography.length;
    let charsToAdd = 114 - biographyLen;

    while(charsToAdd >= 0){
      biography += " ";
      charsToAdd -= 1;
    }
  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={teacher.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {teacher.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {biography}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={(e) => handleClick(e)}
          size="small"
          color="primary"
          component={Link}
          to={"/teacherProfile"}
          name={teacher._id}
          variant='contained'
        >
          See Profile
        </Button>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {

};


const mapStateToProps = state => ({


});



export default connect(mapStateToProps, { teacherProfileSelected })(MediaCard);
