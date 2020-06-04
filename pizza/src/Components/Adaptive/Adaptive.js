import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
// import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import './style.css';
import {Link} from 'react-router-dom';
import '../Header/header.css';
// import cart from '../Header/img/supermarket.png';
// import {connect} from 'react-redux';
// import {setUser} from '../../actions/actionCreater';
// import CartIcon from "../CartIcon/CartIcon";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),

  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export default function PersistentDrawerRight(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const {user, amount} = props;
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false); 
  };

  return (
    <div className={classes.root}>
      {/* <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            <Link to="/"><li className="logo">
                    Dominos's Pizza
                </li></Link>
          </Typography>
          
        </Toolbar>
      </AppBar> */}
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon className="menu"/>
          </IconButton>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        id={!open ? "drawwer" : "non"}
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[{text:'Акції', link:"/sales"}, {text:'Піца', link:"/pizzas"}, {text:'Напої', link:"/drinks"}, {text:'Авторизація', link:"/login"}, {text:'Корзина', link:"/cart"}].map((item, index) => (
            <ListItem button key={item.text}>
              <ListItemIcon>{index === 0 ? <AttachMoneyIcon /> : index === 1 ? <LocalPizzaIcon /> : index === 2 ? <LocalDrinkIcon /> : index ===3 ? <PersonIcon /> : index===4 ? <ShoppingCartIcon /> : <InboxIcon />}</ListItemIcon>
              <Link className="links_adaptive" to={item.link}><ListItemText primary={item.text} /></Link>
              {/* <Link to={item.link}><Typography>{item.text}</Typography></Link> */}
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}

