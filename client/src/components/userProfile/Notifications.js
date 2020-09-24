import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import SnackBar from "../layout/Snackbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FiberNewRoundedIcon from "@material-ui/icons/FiberNewRounded";
import emptyNotifImage from "../../img/emptyNotifications.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const AlignItemsList = ({ newBlogNotif, blogAuthor, notifList }) => {
  const classes = useStyles();

  return (
    <div>
      {newBlogNotif ? (
        <Grid container justify='center'>
          <Grid item xs={12}>
            <List className={classes.root}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={newBlogNotif.blogName} />
                </ListItemAvatar>
                <ListItemText
                  primary="You added a new post."
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {newBlogNotif.blogger.name}
                      </Typography>
                      <br />
                      createdAt:
                      {newBlogNotif.createdAt}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      ) : (
        <Fragment>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h1">No new notifications.</Typography>
            </Grid>
            <Grid item xs={6}>
              <img src={emptyNotifImage}/>
            </Grid>
          </Grid>
        </Fragment>
      )}
    </div>
  );
};

AlignItemsList.propTypes = {
  newBlogNotif: PropTypes.object,
  notifList: PropTypes.array,
};

const mapStateToProps = (state) => ({
  newBlogNotif: state?.notification?.newBlogNotification,
  notifList: state?.notificationi?.notificationList,
});

export default connect(mapStateToProps, {})(AlignItemsList);
