import React, { useState, Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import FaceIcon from '@material-ui/icons/Face';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

//Serach input
import SearchInput from '../searchInput/SearchLessons';
//Subjects List
import AlignementList from "../list/list";

//Subject Button
import SubjectButton from "../subjectButtons/SubjectButton";

//Profile FormData
import DataForm from "../userProfile/DataForm";
import UserDashboard from "../userProfile/UserDashboard";

//Connect to state
import { connect } from "react-redux";
import GreetingMessage from '../greetingMessage/GreetingMessage';

// onClick={() => toggleSections({...section, profileView:!section['profileView']})}



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Sidebar = ({ userName }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  //Setting view state switches
  // const [section, toggleSections] = useState({
  //   profileView: false,
  //   notificationView: false,
  //   helpView: false,
  //   teachersView: false,
  //   subjectsView: false,
  //   scheduledLessonsView: false,
  //   homeView: false
  // });


  const [section, toggleSections] = useState([
      {
        name: 'profileView',
        value: false
      },
      {
        name: 'notificationView',
        value: false
      },
      {
        name: 'helpView',
        value: false
      },
      {
        name: 'teachersView',
        value: false
      },
      {
        name: 'subjectsView',
        value: false
      },
      {
        name: 'scheduledLessonsView',
        value: false
      },
      {
        name: 'homeView',
        value: false
      }
    ]
  );


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const handleSectionViews = (e) => {
    const name1 = [e.currentTarget.dataset.name][0];
    console.log(`Kliknuto je dugme: ${name1}`);
    toggleSections([...section].map(view => view.name === name1 ? {...view, value: true} : {...view, value:false}));
    handleDrawerClose();
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
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            {[userName].map((text, index) => (
                <ListItem data-name='profileView' onClick={ handleSectionViews } button key={text}>
                <ListItemIcon><AccountCircleIcon/></ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            ))}
          {['Notifications'].map((text, index) => (
            <ListItem data-name='notificationView' onClick={ handleSectionViews } button key={text}>
              <ListItemIcon><Badge badgeContent={4} color="error"><NotificationsActiveIcon/></Badge></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))},
          {['Home'].map((text, index) => (
            <ListItem data-name='homeView' button key={text}>
              <ListItemIcon><HomeRoundedIcon/></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          {['Help'].map((text, index) => (
            <ListItem data-name='helpView' button key={text}>
              <ListItemIcon><ContactSupportIcon/></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          {['Logout'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon><ExitToAppIcon/></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Teachers'].map((text, index) => (
            <ListItem data-name='teachersView' button key={text}>
              <ListItemIcon><FaceIcon/></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          {['Subjects'].map((text, index) => (
            <ListItem name='subjectsView' button key={text}>
              <ListItemIcon><DnsRoundedIcon/></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          {['Scheduled Lessons'].map((text, index) => (
            <ListItem name='scheduledLessonsView' button key={text}>
              <ListItemIcon><ScheduleRoundedIcon/></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {section[0].value && <UserDashboard/>}
      </main>
    </div>
  );
}

Sidebar.propTypes = {
    userName: PropTypes.string,
};

const mapStateToProps = state => ({
    userName: state.auth.user.data.name
});




export default connect(mapStateToProps, {})(Sidebar);
