import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles, CircularProgress } from '@material-ui/core';
import Axios from 'axios';

import baseUrl from '../Util/baseUrl';

import MyContextAPI from '../ContextAPI/ContextAPI';
import Appbar from '../Components/Appbar';
import LeftDrawerMenu from '../Components/LeftDrawerMenu';
import Login from '../Screens/Login/Login';
import Routes from '../Routes/Routes';
import MobileMenu from '../Components/MobileMenu';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
});

class App extends Component {

    state = {
        token: null,
        user: {},
        open: true,
        isLoading: true,
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        const userData = JSON.parse(localStorage.getItem("userData"));

        if (token) {
            this.setState({
                isAuth: true,
                token,
                user: userData,
            });
        }
    }

    handleDrawerToggle = val => {
        this.setState({ open: val });
    }

    handleLogin = (credentials) => {
        this.setState({ isLoading: true });

        Axios({
            url: `${baseUrl}/autn/`,
            method: "POST",
            data: credentials,
        })
            .then((res) => {
                // console.log(res.data.employee.department)
                const userData = {
                    userId: res.data.employee._id,
                    username: res.data.employee.username,
                    role: res.data.employee.role,
                    department: res.data.employee.department,
                    center: res.data.employee.center,
                    centerId: res.data.employee.centerId,
                    fullName: res.data.employee.fullName,
                };

                this.setState(
                    {
                        isLoading: false,
                        isAuth: true,
                        token: res.data.token,
                        user: userData,
                    },
                    () => {
                        // const remainingTime = 3600000;
                        const expiry = new Date(new Date().getTime() + 3600000);
                        localStorage.setItem("expiry", expiry.toISOString());
                        localStorage.setItem("userData", JSON.stringify(userData));
                        localStorage.setItem("isUser", true);
                        localStorage.setItem("token", res.data.token);
                        this.setAutoLogout(3600000);
                    }
                );
            })
            .catch((err) => {
                this.setState({ isLoading: false, isAuth: false });
                swal.fire({
                    icon: "error",
                    title: "Laboratory Information System",
                    html:
                        '<strong><font color="red">Invalid Username or Password</font></strong>',
                });
            });
    };

    setAutoLogout = (time) => {
        setTimeout(() => {
            this.handleLogout();
        }, time);
    };

    handleSaveUser = data => {
        this.setState({
            token: data.token,
            user: data.admin
        });
    }

    handleLogout = data => {
        this.setState({
            token: null,
            user: null
        }, () => {
            window.location.replace("/");
            localStorage.removeItem("token");
            localStorage.removeItem("expiry");
        });
    }

    render() {

        const { open, isLoading, user, token } = this.state;
        const { classes, desktop } = this.props;

        if (!isLoading) {
            return (
                <div style={{
                    display: 'flex',
                    minHeight: '100vh',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <CircularProgress style={{ color: 'blue', height: 80, width: 80 }} />
                </div>
            );
        } else {

            return (
                <Fragment>
                    {!token ?
                        <Login loginHandler={this.handleGetUser} />
                        :
                        <MyContextAPI.Provider
                            value={{
                                token,
                                userId: user && user._id,
                                user,
                                saveUserHandler: this.handleSaveUser,
                                logoutHandler: this.handleLogout
                            }}
                        >
                            {
                                desktop ?
                                    <div className={classes.root}>
                                        <Appbar
                                            open={open}
                                            toggleDrawer={this.handleDrawerToggle}
                                            handleSwitchUser={this.switchUser}
                                        />
                                        <LeftDrawerMenu
                                            open={open}
                                            toggleDrawer={this.handleDrawerToggle}
                                        />
                                        <main className={classes.content}>
                                            <div className={classes.appBarSpacer} />
                                            <div className={classes.container}>
                                                <Routes />
                                            </div>
                                        </main>
                                    </div>
                                    :
                                    <div>
                                        <MobileMenu />

                                        <div style={{ height: 50 }} />

                                        <Routes />
                                        <div style={{ height: 20 }} />
                                    </div>
                            }
                        </MyContextAPI.Provider>
                    }
                </Fragment>
            );
        }
    }
}

export default withRouter(withStyles(styles)(App));
