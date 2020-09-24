import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import ActiveAvatar from "../userProfile/ProfileAvatar";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import ScheduleRoundedIcon from "@material-ui/icons/ScheduleRounded";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import { logout } from "../../actions/auth";
import { loadUser } from "../../actions/auth";
import VideoCallRoundedIcon from "@material-ui/icons/VideoCallRounded";
import BookRoundedIcon from "@material-ui/icons/BookRounded";
import PostAddRoundedIcon from "@material-ui/icons/PostAddRounded";
import { withRouter } from "react-router-dom";
import NotificationsActiveRoundedIcon from "@material-ui/icons/NotificationsActiveRounded";
import { Badge } from "@material-ui/core";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Navbar = ({ user, logout, loadUser, state, history, newBlog }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // useEffect(()=>{
  //   loadUser();
  // }, []);

  const handleLogout = () => {
    console.log("User logged out.");
    logout();
    return <Redirect to="/login" />;
  };

  const handlePageRedirection = (e) => {
    const page = e.currentTarget.name;
    console.log("Tip page varijable je: ", typeof page);
    history.push("/dashboard");
  };

  let ntfCount;
  const setNtfCount = () => {
    if (newBlog) {
      ntfCount = 1;
      return ntfCount;
    } else {
      ntfCount = 0;
      return ntfCount;
    }
  };

  const resetNotifNumber = () => {
    ntfCount = 0;
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            UpSpot
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[user.name].map((text, index) => (
            <ListItem button key={text} component={Link} to="/myprofile">
              <ListItemIcon>
                <ActiveAvatar />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          {["Notifications"].map((text, index) => (
            <ListItem
              onClick={(e) => {
                resetNotifNumber();
              }}
              button
              key={text}
              component={Link}
              to="/notifications"
            >
              <ListItemIcon>
                <Badge badgeContent={setNtfCount()} color="error">
                  <NotificationsActiveRoundedIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          {["New Blog"].map((text, index) => (
            <ListItem
              name="/newBlog"
              button
              key={text}
              onClick={(e) => handlePageRedirection(e)}
              component={Link}
              to="/newBlog"
            >
              <ListItemIcon>
                <PostAddRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          {["Bloggers"].map((text, index) => (
            <ListItem button key={text} component={Link} to="/bloggers">
              <ListItemIcon>
                <GroupRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          {["Blogs"].map((text, index) => (
            <ListItem button key={text} component={Link} to="/blogs">
              <ListItemIcon>
                <BookRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Logout"].map((text, index) => (
            <ListItem button onClick={() => handleLogout()} key={text}>
              <ListItemIcon>
                <ExitToAppOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state?.auth?.user,
  state: state,
  newBlog: state?.notification?.newBlogNotification,
});

const ShowTheLocationWithRouter = withRouter(Navbar);
export default connect(mapStateToProps, { logout, loadUser })(
  ShowTheLocationWithRouter
);
