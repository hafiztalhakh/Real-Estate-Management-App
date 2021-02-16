import React from 'react';
import { withRouter } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AddIcon from '@material-ui/icons/Add';
import CategoryIcon from '@material-ui/icons/Category';
import BrandingWatermarkIcon from '@material-ui/icons/BrandingWatermark';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

function Navigations(props) {
    const { history } = props;

    return (
        <React.Fragment>
            <List>
                <ListItem button onClick={() => { history.push('/') }}>
                    <ListItemIcon>
                        <DashboardIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button onClick={() => { history.push('/add-category') }}>
                    <ListItemIcon>
                        <CategoryIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Category" />
                </ListItem>
                <ListItem button onClick={() => { history.push('/add-sub-category') }}>
                    <ListItemIcon>
                        <FolderOpenIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Sub-Category" />
                </ListItem>
                <ListItem button onClick={() => { history.push('/add-brand') }}>
                    <ListItemIcon>
                        <BrandingWatermarkIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Brand" />
                </ListItem>
                <ListItem button onClick={() => { history.push('/add-product') }}>
                    <ListItemIcon>
                        <AddIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Products" />
                </ListItem>
                <ListItem button onClick={() => { history.push('/orders/all') }}>
                    <ListItemIcon>
                        <ReceiptIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Orders" />
                </ListItem>
                <ListItem button onClick={() => { history.push('/customers') }}>
                    <ListItemIcon>
                        <PeopleIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Customers" />
                </ListItem>
                <ListItem button onClick={() => { history.push('/vendors') }}>
                    <ListItemIcon>
                        <PeopleIcon style={{ color: '#33C4FF' }} className="icons" />
                    </ListItemIcon>
                    <ListItemText primary="Vendors" />
                </ListItem>
            </List>
        </React.Fragment>
    );
}

export default withRouter(Navigations);