import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Chip, Button } from "@material-ui/core";
import VerifiedUserRoundedIcon from "@material-ui/icons/VerifiedUserRounded";
import image from "../../img/math.jpg";
import Skeleton from "@material-ui/lab/Skeleton";
import { Link } from "react-router-dom";
import { teacherProfileSelected } from "../../actions/teachers";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const  RecipeReviewCard = ({ name, biography, createdAt, teacher, teacherProfileSelected }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  const handleClick = e => {
    console.log(`id kliknutog teachera je: ${[e.currentTarget.name]}`);
    teacherProfileSelected([e.currentTarget.name]);
  }

  return (
    <Card className={classes.root}>
      <VerifiedUserRoundedIcon />
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {name}
          </Avatar>
        }
        title={name}
        subheader={"teacher"}
      />
      <CardMedia className={classes.media} image={image} title={name} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {biography}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Chip label="Mathematics" />
        </IconButton>
        <IconButton aria-label="add to favorites">
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.margin}
            onClick={e=> handleClick(e)}
            component={Link} to={"/teacherProfile"}
            name={teacher._id}
          >
            See Profile
          </Button>
        </IconButton>
      </CardActions>
    </Card>
  );
}

RecipeReviewCard.propTypes = {
    name: PropTypes.string,
    biography: PropTypes.string,
    teacher: PropTypes.object,
    teacherProfileSelected: PropTypes.func
};


const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { teacherProfileSelected })(RecipeReviewCard);



