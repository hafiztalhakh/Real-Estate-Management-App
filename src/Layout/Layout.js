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

        if (token) {
            this.handleGetUser(token);
        } else {
            this.setState({
                token: null,
                user: {}
            })
        }
    }

    handleGetUser = token => {
        this.setState({ isLoading: true });

        Axios({
            url: `${baseUrl}/admin/details`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {

                // const userData = {
                //     userId: res.data.employee._id,
                //     username: res.data.employee.username,
                //     fullName: res.data.employee.fullName,
                // };

                // this.setState(
                //     {
                //         isLoading: false,
                //         isAuth: true,
                //         token: res.data.token,
                //         user: userData,
                //     },
                //     () => {
                //         // const remainingTime = 3600000;
                //         const expiry = new Date(new Date().getTime() + 3600000);
                //         localStorage.setItem("expiry", expiry.toISOString());
                //         localStorage.setItem("userData", JSON.stringify(userData));
                //         localStorage.setItem("isUser", true);
                //         localStorage.setItem("token", res.data.token);
                //         this.setAutoLogout(3600000);
                //     }
                // );
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    isLoading: false,
                    token: null,
                    user: {}
                });
            });
    };

    setAutoLogout = time => {
        setTimeout(() => {
            this.handleLogout();
        }, time);
    };

    handleSaveUser = data => {
        console.log(data);
        this.setState({
            token: data.token,
            user: data.user
        });
        console.log(data);
    }

    handleLogout = () => {
        this.setState({
            token: null,
            user: {}
        }, () => {
            window.location.replace("/");
            localStorage.removeItem("token");
            localStorage.removeItem("expiry");
        });
    }

    handleDrawerToggle = val => {
        this.setState({ open: val });
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
                        <Login loginHandler={this.handleSaveUser} />
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
