import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles, CircularProgress } from '@material-ui/core';

import MyContextAPI from '../ContextAPI/ContextAPI';
import Appbar from '../Components/Appbar';
import LeftDrawerMenu from '../Components/LeftDrawerMenu';
import Login from '../Screens/Login/Login';
import Routes from '../Routes/Routes';

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
                    {token ?
                        <Login loginHandler={this.handleGetUser} />
                        :
                        <MyContextAPI.Provider
                            value={{
                                user
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
                                    <Routes />
                            }
                        </MyContextAPI.Provider>
                    }
                </Fragment>
            );
        }
    }
}

export default withRouter(withStyles(styles)(App));
