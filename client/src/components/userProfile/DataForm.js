import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProfileAvatar from "./ProfileAvatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

const LayoutTextFields = ({ user }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.root}>
        <div>
          <Typography variant="h4" gutterBottom>
            Add or change data about your profile
          </Typography>
          <ProfileAvatar />
        </div>
      </div>
      <div className={classes.root}>
        <div>
          <TextField
            id="outlined-full-width"
            label="Name"
            style={{ margin: 8 }}
            placeholder="Enter your name"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={user.name}
          />
        </div>
      </div>
      <div className={classes.root}>
        <div>
          <TextField
            id="outlined-full-width"
            label="E-mail"
            style={{ margin: 8 }}
            placeholder="Enter your email"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={user.email}
          />
        </div>
      </div>
      <div className={classes.root}>
        <div>
          <TextField
            id="outlined-full-width"
            label="Short Biography"
            style={{ margin: 8 }}
            placeholder="Few words about yourself"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={user.biography}
          />
        </div>
      </div>
      <div className={classes.root}>
        <div>
          <TextField
            id="outlined-full-width"
            label="City"
            style={{ margin: 8 }}
            placeholder="City you live in"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </div>
      </div>
      <div className={classes.root}>
        <div>
          <TextField
            id="outlined-full-width"
            label="Country"
            style={{ margin: 8 }}
            placeholder="Country you live in"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </div>
      </div>
      <div className={classes.root}>
        <div>
          <TextField
            id="outlined-full-width"
            label="Street"
            style={{ margin: 8 }}
            placeholder="Enter your Street"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </div>
      </div>
      <div className={classes.root}>
        <Button color="primary" variant="contained" component="label">
          Upload Profile Photo
          <input type="file" style={{ display: "none" }} />
        </Button>
      </div>    
      <div className={classes.root}>
        <Button align="center" color="secondary" variant="contained" component="label">
          Save
          <input type="button" style={{ display: "none" }} />
        </Button>
      </div>
    </Fragment>
  );
};

LayoutTextFields.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user.data,
});

export default connect(mapStateToProps, {})(LayoutTextFields);
