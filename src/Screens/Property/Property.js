import React, { Fragment, useState } from 'react';
import { useTheme, useMediaQuery, makeStyles, Container, Paper, Divider } from '@material-ui/core';

import Table from './Components/Table';
import Card from './Components/Cards';

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
    const [data, setData] = useState([
        {
            category: "Residential",
            type: "Plot",
            sector: "Sector Y",
            subSector: "Y-1",
            area: "240 yds",
            demand: "50,00,000",
            contact: "03331234567",
            reference: "Saghir Estate",
        },
        {
            category: "Residential",
            type: "House",
            sector: "Sector X",
            subSector: "X-6",
            area: "240 yds",
            demand: "5,00,000",
            contact: "03331234567",
            reference: "Saghir Estate",
        },
        {
            category: "Commercial",
            type: "Plot",
            sector: "Sector Z",
            subSector: "Z-6",
            area: "100 yds",
            demand: "15,00,000",
            contact: "03331234567",
            reference: "Saghir Estate",
        }
    ]);

    if (isDesktop) {
        return (
            <Container maxWidth="lg">
                <Paper elevation={3} className={paper}>
                    <h1>Property List</h1>
                    <Divider className={divider} />
                    <Table property={data} />
                </Paper>
            </Container>
        )
    } else {
        return (
            <Container maxWidth="md">
                <h1>Property List</h1>
                <Divider className={divider} />
                {
                    data.map((el, i) => (
                        <Fragment key={i}>
                            <Card data={el} />
                        </Fragment>
                    ))
                }
            </Container>
        )
    }
}

