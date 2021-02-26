import React, { Fragment } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";

import Dashboard from '../Screens/Dashboard/Dashboard';
import AddProperty from '../Screens/AddProperty/AddProperty';

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
        </Switch>
    );
}
export default withRouter(routes);