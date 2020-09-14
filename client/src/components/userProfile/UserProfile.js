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
    city: "",
    country: "",
    street: "",
  });

  const onChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { city, country, street, biography, email, name } = details;
    const formatedAddress = city + "," + street + "," + country;
    console.log(`Formatirana Adresa je: ${formatedAddress}`);
    console.log(email, name);
    let id = user._id;
    let idIvana = "5f52de4400193b49a4be0795";
    console.log(
      `Id trenutnog usera je sada: ${id}, a Ivana Ivanovica je: ${idIvana}`
    );
    console.log(`Da li su id-evi isti: ${idIvana === id ? true : false}`);
    updateUser(name, email, formatedAddress, biography, id);
  };

  return (
    <Fragment>
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
        <Grid container justify="space-between" spacing={5}>
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
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid container justify="space-between" spacing={3}>
              <Grid item xs={3}>
                <TextField
                  name="city"
                  id="outlined-full-width"
                  label="City"
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
              <Grid item xs={3}>
                <TextField
                  name="country"
                  id="outlined-full-width"
                  label="Country"
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
              <Grid item xs={3}>
                <TextField
                  name="street"
                  id="outlined-full-width"
                  label="Street"
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
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <img src={img} />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
        <Grid item xs={2}>
          <Button
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
        <Grid item xs={2}>
          <DropzoneArea color="secondary" />
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
