import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Layout from './Layout/Layout';
import './App.css';

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Nunito-Regular',
            'sans-serif'
        ].join(','),
    }
});

class App extends Component {

    render() {
        window.scrollTo(0, 0);

        return (
            <React.Fragment>
                <ThemeProvider theme={theme}>
                    <Layout />
                </ThemeProvider>
            </React.Fragment>
        )
    }
}

export default withRouter(App);

