import React, { Fragment } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";

import Dashboard from '../Screens/Dashboard/Dashboard';
import AddProperty from '../Screens/Property/Screens/AddProperty';
import UpdateProperty from '../Screens/Property/Screens/UpdateProperty';
import Property from '../Screens/Property/Screens/Property';
import PropertyDetails from '../Screens/Property/Screens/PropertyDetail';
import WebsiteListings from '../Screens/Property/Screens/WebsiteListings';
import FeaturedProperties from '../Screens/Property/Screens/FeaturedProperties';
import SoldOutProperties from '../Screens/Property/Screens/SoldOutProperties';
import Inbox from '../Screens/Emails/Screens/Inbox';
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
                path='/property'
                render={props => (
                    <Property {...props} />
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
                path='/property/update/:id'
                render={props => (
                    <UpdateProperty {...props} />
                )}
            />
            <Route
                exact
                path='/property/detail/:id'
                render={props => (
                    <PropertyDetails {...props} />
                )}
            />
            <Route
                exact
                path='/property/website-listings'
                render={props => (
                    <WebsiteListings {...props} />
                )}
            />
            <Route
                exact
                path='/property/featured'
                render={props => (
                    <FeaturedProperties {...props} />
                )}
            />
            <Route
                exact
                path='/property/sold-out'
                render={props => (
                    <SoldOutProperties {...props} />
                )}
            />
            <Route
                exact
                path='/inbox'
                render={props => (
                    <Inbox {...props} />
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