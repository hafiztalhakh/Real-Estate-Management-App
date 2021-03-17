import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    paper: {
        width: "100%",
        padding: "30px 40px 40px 40px",
        backgroundColor: "#fff",
        borderRadius: 10,
        [theme.breakpoints.down('md')]: {
            padding: 0,
            boxShadow: "none",
        }
    },
    tableContainer: {
        fontFamily: 'inherit',
        // maxHeight: 400,
    },
    tableCellHead: {
        textAlign: 'left',
        padding: 10,
        fontWeight: 'bold'
    },
    tableCell: {
        textAlign: 'left',
        padding: 10
    },
}));

export default function MessageBody(props) {
    const { messages, getData } = props;
    const classes = useStyles();
    const { paper, tableCellHead, tableCell } = classes;

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} className={paper}>

                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={2} className={tableCellHead}>Date & Time:</Grid>
                    <Grid item xs={12} sm={12} md={9}>{moment().format("DD-MM-YYYY hh:mm:ss a")}</Grid>
                    <Grid item xs={12} sm={12} md={2} className={tableCellHead}>Name:</Grid>
                    <Grid item xs={12} sm={12} md={9}>Talha Ahmed Khalid</Grid>
                    <Grid item xs={12} sm={12} md={2} className={tableCellHead}>Email:</Grid>
                    <Grid item xs={12} sm={12} md={9}>hafiz.talhakh@gmail.com</Grid>
                    <Grid item xs={12} sm={12} md={2} className={tableCellHead}>Subject:</Grid>
                    <Grid item xs={12} sm={12} md={9}>Testing</Grid>
                    <Grid item xs={12} sm={12} md={2} className={tableCellHead}>Message:</Grid>
                    <Grid item xs={12} sm={12} md={9}>
                        <p style={{ whiteSpace: "pre-line", margin: 0 }}>We at Shaheer Enterprises present the largest selection of both commercial and residential properties to choose from. We deal in all kinds of sale, purchase and rent of both residential and commercial properties.
                        </p>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}