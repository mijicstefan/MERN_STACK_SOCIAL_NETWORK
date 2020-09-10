import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import DataForm from "../userProfile/DataForm";
import { connect } from "react-redux";
import NotificationsActiveRoundedIcon from "@material-ui/icons/NotificationsActiveRounded";
import ProfileAvatar from "../userProfile/ProfileAvatar";
import Notifications from "../userProfile/Notifications";
import Badge from "@material-ui/core/Badge";
import { createMuiTheme } from "@material-ui/core/styles";
import ScheduleIcon from '@material-ui/icons/Schedule';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import FormatListNumberedRtlRoundedIcon from '@material-ui/icons/FormatListNumberedRtlRounded';
import { loadTeachers } from "../../actions/teachers";
import TeacherProfile from "../teachers/TeacherProfile";
import { logout } from "../../actions/auth";
import { useHistory } from "react-router-dom";

//Private Routing
import PrivateRoute from "../routing/PrivateRoute";

//Teachers Component
import AllTeachers from "../teachers/AllTeachers";
import { Button } from "@material-ui/core";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const handleLogout = e => {
    props.logout();
    console.log('User logged out.');
    history.push('/login');
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {[props.userName].map((text, index) => (
          <ListItem key={text} component={Link} to={"/myProfile"}>
            <ListItemIcon>
              <ProfileAvatar />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        {["Notifications"].map((text, index) => (
          <ListItem key={text} component={Link} to={"/notifications"}>
            <ListItemIcon>
              <Badge badgeContent={10} max={999} color="error">
                <NotificationsActiveRoundedIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        {["Logout"].map((text, index) => (
          <ListItem key={text} component={Button} onClick={e => handleLogout(e)}>
            <ListItemIcon >
                <ExitToAppRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Scheduled Lessons"].map((text, index) => (
          <ListItem key={text} component={Link} to={"/myProfile"}>
            <ListItemIcon>
              <ScheduleIcon/>
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        {["Teachers"].map((text, index) => (
          <ListItem key={text} component={Link} to={"/teachers"}>
            <ListItemIcon>
              <FaceRoundedIcon/>
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        {["Categories"].map((text, index) => (
          <ListItem key={text} component={Link} to={"/categories"}>
            <ListItemIcon>
              <FormatListNumberedRtlRoundedIcon/>
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            UpSpot
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/" render={() => <div>Home Page</div>} />
            <PrivateRoute exact path="/MyProfile" component={DataForm} />
            <Route path="/notifications" render={() => <Notifications />} />
            <Route path="/teachers" render={() => <AllTeachers />} />
            <Route path="/categories" render={() => <Notifications />} />
            <Route path="/teacherProfile" render={() => <TeacherProfile />} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  // /**
  //  * Injected by the documentation to work in an iframe.
  //  * You won't need it on your project.
  //  */
  // container: PropTypes.instanceOf(
  //   typeof Element === "undefined" ? Object : Element
  // )

  userName: PropTypes.string.isRequired,
  loadTeachers: PropTypes.func.isRequired,
  logout: PropTypes.func,
};

const mapStateToProps = (state) => ({
  userName: state.auth.user.data.name,
});

export default connect(mapStateToProps, { loadTeachers, logout })(ResponsiveDrawer);
