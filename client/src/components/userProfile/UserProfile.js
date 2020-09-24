import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProfileAvatar from "./ProfileAvatar";
import Typography from "@material-ui/core/Typography";
import { Box, Grid, GridList } from "@material-ui/core";
import { updateUser } from "../../actions/crudUser";
import { loadUser } from "../../actions/auth";
import DropzoneArea from "../fileDropzone/Dropzone";
import img from "../../img/undraw_profile_6l1l.svg";
import AleertMessage from "../../components/layout/Alert";

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

const LayoutTextFields = ({ user, updateUser }) => {
  const classes = useStyles();

  // useEffect(() => {
  //   loadUser();
  // }, []);

  const [details, setDetails] = useState({
    name: "",
    email: "",
    biography: "",
  });

  const onChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { biography, email, name } = details;
    let id = user._id;
    updateUser(name, email, biography, id);
  };

  return (
    <Fragment>
    <AleertMessage/>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Add or change data about your profile
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div className={classes.root}>
        <Grid container justify="space-between" spacing={7}>
          <Grid item xs={5}>
            <Grid container spacing={3}>
              <TextField
                name="name"
                id="outlined-full-width"
                label="name"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                name="email"
                id="outlined-full-width"
                label="email"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid container spacing={3}>
              <TextField
                name="biography"
                id="outlined-full-width"
                label="Short Biography"
                style={{ margin: 8 }}
                fullWidth={true}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid container justify='space-evenly'>
              <Grid item xs={4}>
                <Button
                  style={{ margin: 15 }}
                  align="center"
                  color="primary"
                  variant="contained"
                  component="label"
                  onClick={(e) => onSubmit(e)}
                >
                  Save
                  <input type="button" style={{ display: "none" }} />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <img src={img} />
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

LayoutTextFields.propTypes = {
  user: PropTypes.object.isRequired,
  userId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  user: state?.auth?.user,
});

export default connect(mapStateToProps, { updateUser, loadUser })(
  LayoutTextFields
);
