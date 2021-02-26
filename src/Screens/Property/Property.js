import React from 'react';
import { useTheme, useMediaQuery, makeStyles, Container, Paper, Divider } from '@material-ui/core';

import Table from './Components/Table';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "30px 40px 40px 40px",
        backgroundColor: "#fff",
        borderRadius: 10,
        [theme.breakpoints.down('md')]: {
            padding: 0,
            boxShadow: "none",
        }
    },
    divider: {
        marginTop: 15,
        marginBottom: 30
    },
}));

export default function Property() {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const classes = useStyles();
    const { paper, divider } = classes;

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} className={paper}>
                <h1>Property List</h1>
                <Divider className={divider} />

                <Table />
            </Paper>
        </Container>
    )
}

