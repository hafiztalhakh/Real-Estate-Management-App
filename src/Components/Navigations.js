import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AddIcon from '@material-ui/icons/Add';
import CategoryIcon from '@material-ui/icons/Category';
import BrandingWatermarkIcon from '@material-ui/icons/BrandingWatermark';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';
import StarIcon from '@material-ui/icons/Star';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import CreateIcon from '@material-ui/icons/Create';
import EmailIcon from '@material-ui/icons/Email';
import SendIcon from '@material-ui/icons/Send';

function Navigations(props) {
    const { history } = props;

    return (
        <Fragment>
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
                <ListItem button onClick={() => { history.push('/add-category') }}>
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
                <ListItem button onClick={() => { history.push('/add-brand') }}>
                    <ListItemIcon>
                        <PlaylistAddCheckIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Website Listings" />
                </ListItem>
                <ListItem button onClick={() => { history.push('/add-product') }}>
                    <ListItemIcon>
                        <StarIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Featured Property" />
                </ListItem>
                <ListItem button onClick={() => { history.push('/orders/all') }}>
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
                <ListItem button onClick={() => { history.push('/add-sub-category') }}>
                    <ListItemIcon>
                        <CreateIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Compose E-Mail" />
                </ListItem>
                <ListItem button onClick={() => { history.push('/add-category') }}>
                    <ListItemIcon>
                        <EmailIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                </ListItem>
                <ListItem button onClick={() => { history.push('/add-brand') }}>
                    <ListItemIcon>
                        <SendIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Sent" />
                </ListItem>
            </List>
        </Fragment>
    );
}

export default withRouter(Navigations);