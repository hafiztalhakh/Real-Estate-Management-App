import React, { Component, Fragment } from 'react';
//React Router
import { withRouter } from 'react-router-dom';
//Material UI
import { Container, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Typography, Dialog, AppBar, Toolbar, IconButton, Slide } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
//Icons
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
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
import ApartmentIcon from '@material-ui/icons/Apartment';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    listItem: {
        backgroundColor: '#fff',
    },
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

class Drawer extends Component {

    state = {
        open: false,
        isUserLoggedIn: true,
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleButtonPress = (path) => {
        this.props.history.push(path);
        this.handleClose();
    }

    renderMenu = () => {
        const { classes } = this.props;
        const { open, isUserLoggedIn } = this.state;

        return (
            <React.Fragment>
                <IconButton edge="start" onClick={this.handleClickOpen} aria-label="close">
                    <MenuIcon />
                </IconButton>
                <Dialog fullScreen open={open} onClose={this.handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar} style={{ backgroundColor: '#fff', fontFamily: '"Noto Sans KR", sans-serif', }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}>
                            <Typography
                                variant="h6"
                                onClick={() => this.props.history.push('/')}
                                style={{
                                    // fontFamily: '"Merienda One", cursive',
                                    alignItems: 'center',
                                    verticalAlign: 'middle',
                                    display: 'inline-flex',
                                    height: 60,
                                    color: '#0095FF',
                                    marginLeft: 10

                                }}>
                                Shaheer App
                            </Typography>
                            <IconButton edge="start" color="black" onClick={this.handleClose} aria-label="close">
                                <CloseIcon style={{ color: '#000' }} />
                            </IconButton>
                        </div>
                    </AppBar>
                    <Fragment>
                        <ListItem button onClick={() => { this.handleButtonPress('/') }}>
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
                            <ListItem button onClick={() => { this.handleButtonPress('/property') }}>
                                <ListItemIcon>
                                    <HomeIcon style={{ color: '#33C4FF' }} className="icons" />
                                </ListItemIcon>
                                <ListItemText primary="Property" />
                            </ListItem>
                            <ListItem button onClick={() => { this.handleButtonPress('/add-property') }}>
                                <ListItemIcon>
                                    <PostAddIcon style={{ color: '#33C4FF' }} className="icons" />
                                </ListItemIcon>
                                <ListItemText primary="Add Property" />
                            </ListItem>
                            <ListItem button onClick={() => { this.handleButtonPress('/website-listings') }}>
                                <ListItemIcon>
                                    <PlaylistAddCheckIcon style={{ color: '#33C4FF' }} className="icons" />
                                </ListItemIcon>
                                <ListItemText primary="Website Listings" />
                            </ListItem>
                            <ListItem button onClick={() => { this.handleButtonPress('/property/featured') }}>
                                <ListItemIcon>
                                    <StarIcon style={{ color: '#33C4FF' }} className="icons" />
                                </ListItemIcon>
                                <ListItemText primary="Featured Property" />
                            </ListItem>
                            <ListItem button onClick={() => { this.handleButtonPress('/property/sold-out') }}>
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
                            <ListItem button onClick={() => { this.handleButtonPress('/email') }}>
                                <ListItemIcon>
                                    <CreateIcon style={{ color: '#33C4FF' }} className="icons" />
                                </ListItemIcon>
                                <ListItemText primary="Compose E-Mail" />
                            </ListItem>
                            <ListItem button onClick={() => { this.handleButtonPress('/inbox') }}>
                                <ListItemIcon>
                                    <EmailIcon style={{ color: '#33C4FF' }} className="icons" />
                                </ListItemIcon>
                                <ListItemText primary="Inbox" />
                            </ListItem>
                            <ListItem button onClick={() => { this.handleButtonPress('/sent') }}>
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
                            <ListItem button onClick={() => { this.handleButtonPress('/societies') }}>
                                <ListItemIcon>
                                    <ApartmentIcon style={{ color: '#33C4FF' }} className="icons" />
                                </ListItemIcon>
                                <ListItemText primary="Societies" />
                            </ListItem>
                            <ListItem button onClick={() => { this.handleButtonPress('/add-society') }}>
                                <ListItemIcon>
                                    <CreateIcon style={{ color: '#33C4FF' }} className="icons" />
                                </ListItemIcon>
                                <ListItemText primary="Add Society" />
                            </ListItem>
                        </List>
                    </Fragment>
                </Dialog>
            </React.Fragment>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <AppBar
                position="fixed"
                className={classes.mobileAppBar}
                style={{ backgroundColor: '#fff', fontFamily: '"Noto Sans KR", sans-serif', }} >
                <Container maxWidth="sm">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography
                            variant="h6"
                            onClick={() => this.props.history.push('/')}
                            style={{
                                // fontFamily: '"Merienda One", cursive',
                                alignItems: 'center',
                                verticalAlign: 'middle',
                                display: 'inline-flex',
                                height: 60,
                                color: '#0095FF',
                                marginLeft: 10

                            }}>
                            Shaheer App
                        </Typography>
                        {this.renderMenu()}
                    </div>
                </Container>
            </AppBar>
        )
    }
}
export default withRouter(withStyles(styles)(Drawer));