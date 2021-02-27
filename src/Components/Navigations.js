import React from 'react';
import { withRouter } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';
import StarIcon from '@material-ui/icons/Star';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import CreateIcon from '@material-ui/icons/Create';
import EmailIcon from '@material-ui/icons/Email';
import SendIcon from '@material-ui/icons/Send';
import ApartmentIcon from '@material-ui/icons/Apartment';

const useStyles = makeStyles(theme =>({
    root:{
        height: "72vh",
        overflowY: "auto",
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        "&::-webkit-scrollbar": {
            display: 'none',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
        }
    }
}));

function Navigations(props) {
    const { history } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ListItem button onClick={() => { history.push('/') }}>
                <ListItemIcon>
                    <DashboardIcon style={{ color: '#33C4FF' }} className="icons" />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <List
                subheader={
                    <ListSubheader>
                        Property
                    </ListSubheader>
                }
            >
                <ListItem button onClick={() => { history.push('/property') }}>
                    <ListItemIcon>
                        <HomeIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Property" />
                </ListItem>
                <ListItem button onClick={() => { history.push('/add-property') }}>
                    <ListItemIcon>
                        <PostAddIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Add Property" />
                </ListItem>
                <ListItem button onClick={() => { history.push('/website-listings') }}>
                    <ListItemIcon>
                        <PlaylistAddCheckIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Website Listings" />
                </ListItem>
                <ListItem button onClick={() => { history.push('/property/featured') }}>
                    <ListItemIcon>
                        <StarIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Featured Property" />
                </ListItem>
                <ListItem button onClick={() => { history.push('/property/sold-out') }}>
                    <ListItemIcon>
                        <LoyaltyIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Sold out Property" />
                </ListItem>
            </List>
            <List
                subheader={
                    <ListSubheader>
                        Emails
                    </ListSubheader>
                }
            >
                <ListItem button onClick={() => { history.push('/email') }}>
                    <ListItemIcon>
                        <CreateIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Compose E-Mail" />
                </ListItem>
                <ListItem button onClick={() => { history.push('/inbox') }}>
                    <ListItemIcon>
                        <EmailIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                </ListItem>
                <ListItem button onClick={() => { history.push('/sent') }}>
                    <ListItemIcon>
                        <SendIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Sent" />
                </ListItem>
            </List>
            <List
                subheader={
                    <ListSubheader>
                        Societies
                    </ListSubheader>
                }
            >
                <ListItem button onClick={() => { history.push('/socieites') }}>
                    <ListItemIcon>
                        <ApartmentIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Societies" />
                </ListItem>
                <ListItem button onClick={() => { history.push('/add-society') }}>
                    <ListItemIcon>
                        <CreateIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Add Society" />
                </ListItem>
            </List>
        </div>
    );
}

export default withRouter(Navigations);