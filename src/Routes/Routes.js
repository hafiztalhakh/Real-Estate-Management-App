import React, { Fragment } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";

import Dashboard from '../Screens/Dashboard/Dashboard';
import AddProperty from '../Screens/AddProperty/AddProperty';
import Property from '../Screens/Property/Property';

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
                path='/add-property'
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
        </Switch>
    );
}
export default withRouter(routes);