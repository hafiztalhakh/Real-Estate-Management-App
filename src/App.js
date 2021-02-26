import React from 'react';
import { withRouter } from 'react-router-dom'
import { useTheme, useMediaQuery } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Layout from './Layout/Layout';
import './App.css';

const customTheme = createMuiTheme({
    typography: {
        fontFamily: [
            'Nunito-Regular',
            'sans-serif'
        ].join(','),
    }
});

const App = () => {
    window.scrollTo(0, 0);
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <React.Fragment>
            <ThemeProvider theme={customTheme}>
                <Layout desktop={isDesktop} />
            </ThemeProvider>
        </React.Fragment>
    )
}

export default withRouter(App);

