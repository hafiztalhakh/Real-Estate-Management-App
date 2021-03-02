import React, { Fragment } from 'react';
import clsx from 'clsx';
import { Avatar, Drawer, IconButton, makeStyles } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Navigations from '../Components/Navigations';
// import userPic from '../Assets/Icons/male-user.svg';
import logo from '../Assets/Images/logo1.png';

const styles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        backgroundColor: '#f5f5f5',
        color: '#000',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    userDiv: { marginBottom: 20, margin: "0px auto 0px" },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),

    },
}));

const drawerWidth = 240;

const LeftDrawerMenu = (props) => {

    const { toggleDrawer, open } = props;
    const classes = styles();

    return (
        <Fragment>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    {/* <IconButton onClick={() => { toggleDrawer(false) }}>
                        <ChevronLeftIcon style={{ color: 'black' }} />
                    </IconButton> */}
                    <h3>Khalid A. Jabbar</h3>
                </div>
                <div className={classes.userDiv}>
                    <Avatar alt="avatar" src={logo} className={classes.large} />
                    {/* <Avatar> */}
                    {/* <img src={userPic} alt="avatar" /> */}
                    {/* </Avatar> */}
                </div>
                <Navigations />
            </Drawer>
        </Fragment>
    )
}
export default LeftDrawerMenu;