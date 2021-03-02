import React from 'react';
import clsx from 'clsx';
import { List, ListItem, ListItemIcon, Typography, ListItemText, IconButton, AppBar, Toolbar, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import Notifications from './Notifications';

const styles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    appBar: {
        backgroundColor: '#f5f5f5',
        color: '#1a1a1a',
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
    menuButtonHidden: {
        display: 'none',
    },
    mobileAppbarHeading: {
        justifyContent: 'center',
        alignItems: 'center,',
        display: 'inline-flex',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        }
    },
    webAppbarHeading: {
        // fontFamily: "'Merienda One', cursive !important",
        color: '#1a1a1a',
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center,',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            display: 'inline-flex',
        }
    },
    webAppbarButton: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        }
    },
}));

const drawerWidth = 240;

export default function Topbar(props) {

    const { toggleDrawer, open, handleSwitchUser } = props;
    const classes = styles();

    return (
        <AppBar position="absolute" color="default" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                {/* <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => { toggleDrawer(true) }}
                    className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton> */}
                <h2
                    className={classes.webAppbarHeading}
                >
                    Shaheer Enterprises
                </h2>
                {/* <Notifications />
                <List className={classes.webAppbarButton}>
                    <ListItem button onClick={handleSwitchUser}>
                        <ListItemIcon style={{ minWidth: 35 }}>
                            <PeopleIcon style={{ color: 'black', fontSize: 27 }} />
                        </ListItemIcon>
                        <ListItemText primary={<Typography
                            style={{
                                color: '#0095FF',
                                marginTop: 2,
                                fontWeight: 'bold',
                                width: 100,
                            }}>Switch User</Typography>}
                        />
                    </ListItem>
                </List> */}
            </Toolbar>
        </AppBar>
    )
}
