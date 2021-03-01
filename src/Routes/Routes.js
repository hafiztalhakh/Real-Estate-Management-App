import React, { Fragment } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";

import Dashboard from '../Screens/Dashboard/Dashboard';
import AddProperty from '../Screens/Property/Screens/AddProperty';
import Property from '../Screens/Property/Screens/Property';
import AddSociety from '../Screens/Society/Screens/AddSociety';
import UpdateSociety from '../Screens/Society/Screens/UpdateSociety';
import Society from '../Screens/Society/Screens/Society';

const routes = () => {

    return (
        <Switch>
            <Route
                exact
                path='/'
                render={props => (
                    <Dashboard {...props} />
                )}
            />
            <Route
                exact
                path='/property/new'
                render={props => (
                    <AddProperty {...props} />
                )}
            />
            <Route
                exact
                path='/property'
                render={props => (
                    <Property {...props} />
                )}
            />

            <Route
                exact
                path='/societies'
                render={props => (
                    <Society {...props} />
                )}
            />
            <Route
                exact
                path='/society/new'
                render={props => (
                    <AddSociety {...props} />
                )}
            />
            <Route
                exact
                path='/society/update/:id'
                render={props => (
                    <UpdateSociety {...props} />
                )}
            />
        </Switch>
    );
}
export default withRouter(routes);