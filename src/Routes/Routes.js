import React, { Fragment } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import Dashboard from '../Screens/Dashboard/Dashboard';

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
        </Switch>
    );
}
export default withRouter(routes);