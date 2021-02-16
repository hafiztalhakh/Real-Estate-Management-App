import React, { Component } from 'react';
import { Menu, List, ListItem, ListItemText, Badge } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import moment from 'moment';

const StyledBadge1 = withStyles(theme => ({
    badge: {
        right: -3,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
        backgroundColor: 'rgb(255,0,131)'
    },
}))(Badge);

const styles = theme => ({
    root: {
        flexGrow: 1,
        '& input': {
            height: '0px',
            marginLeft: 30
        }
    }
});

class Notification extends Component {

    state = {
        anchorEl: false,
        notifications: [
            {
                message : 'Checking 1st Notification'
            },
            {
                message : 'Checking 2nd Notification'
            },
            {
                message : 'Checking 3rd Notification'
            }
        ],
        unreadLength: 0,
    }


    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
        // this.handleMarkRead();
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    // componentDidMount() {
    //     let userData = localStorage.getItem("userData")
    //     userData = JSON.parse(userData);

    //     socket = io.connect(baseUrl);
    //     socket.emit("join");
    //     if (userData) {
    //         socket.emit("admin_join");
    //     }
    //     socket.on("notification", data => {
    //         if (data.action === "notification_recieved") {
    //             this.handleGetNotifications();
    //         }
    //     })
    //     this.handleGetNotifications();
    // }

    // handleGetNotifications = () => {
    //     const { token, role, department, userId } = this.context;

    //     Axios({
    //         url: `${baseUrl}/notification/get-notifications`,
    //         method: "POST",
    //         data: {
    //             role: role,
    //             department: department,
    //             userId,
    //         },
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         },
    //     }).then(res => {
    //         this.setState({
    //             notifications: res.data.notifications,
    //             unreadLength: res.data.unreadLength,
    //         })
    //     }).catch(err => {
    //         console.log("Error Fetching Notifications");
    //     })
    // }

    // handleMarkRead = () => {
    //     const { token, role, department, userId } = this.context;

    //     Axios({
    //         url: `${connectionString}/notification/mark-read`,
    //         method: "POST",
    //         data: {
    //             role: role,
    //             department: department,
    //             userId,
    //         },
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         },
    //     }).then(res => {
    //         this.handleGetNotifications();
    //     }).catch(err => {
    //         console.log("Error Fetching Notifications");
    //     })
    // }

    render() {
        const { classes } = this.props;
        const { anchorEl, notifications, unreadLength } = this.state;

        return (
            <div>
                <StyledBadge1 badgeContent={unreadLength} color="primary">
                    <NotificationsIcon
                        style={{ cursor: 'pointer' }}
                        onClick={this.handleClick}
                    />
                </StyledBadge1>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    style={{ marginTop: 40 }}
                >
                    <div>
                        {/* <h3>Notifications</h3> */}
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            className={classes.root}
                            style={{ maxWidth: 300, paddingLeft: 10 }}
                        >
                            {/* <ListItem onClick={this.handleMarkRead} button>
                                <ListItemText primary={
                                    <Typography style={{
                                        color: "blue"
                                    }}>
                                        Mark all notifications as Read
                                    </Typography>
                                } />
                            </ListItem> */}
                            <h1 style={{ fontSize: "1.5rem", marginLeft: 3, color: "#050505", fontWeight: 700 }}>Notifications</h1>
                            {
                                notifications && notifications.length > 0 &&
                                notifications.map((notification, index) => {
                                    return (
                                        <>
                                            <ListItem style={{
                                                paddingTop: 0,
                                                paddingBottom: 0,
                                                paddingLeft: 5,
                                            }}>
                                                <ListItemText primary={<label style={{ fontSize: 14 }}>{notification.message}</label>} secondary={
                                                    <span style={{ float: 'left', color: 'blue', fontSize: 12, marginTop: -7 }} >{
                                                        moment(notification.createdAt).format("MMM Do YYYY hh:mm A")
                                                    }</span>
                                                } />
                                            </ListItem>
                                        </>
                                    )
                                })
                            }
                        </List>
                    </div>
                </Menu >
            </div >
        )
    }
}

export default withStyles(styles)(Notification);
