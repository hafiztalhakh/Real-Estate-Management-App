import React, { Fragment, useEffect, useState } from 'react';
import { useTheme, useMediaQuery, makeStyles, Container, Paper, Divider, CircularProgress } from '@material-ui/core';
import Axios from 'axios';
import Swal from 'sweetalert2';

import baseUrl from '../../../Util/baseUrl';
import Table from '../Components/Table';
import Card from '../Components/Cards';

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
    centerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: "50vh"
    },
    circularProgress: {
        color: '#33c4ff',
        width: 80,
        height: 80
    }
}));

export default function Property() {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const classes = useStyles();
    const { paper, divider } = classes;
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([
        {
            category: "Residential",
            type: "Plot",
            sector: "Sector Y",
            subSector: "Y-1",
            area: "240 yds",
            demand: "50,00,000",
            reference: "Direct",
            contactPerson: "Hammad Usmani",
            contact: "03331234567",
        },
        {
            category: "Residential",
            type: "House",
            sector: "Sector X",
            subSector: "X-6",
            area: "240 yds",
            demand: "5,00,000",
            reference: "Saghir Estate",
            contactPerson: "Saghir Bhai",
            contact: "03331234567",
        },
        {
            category: "Commercial",
            type: "Plot",
            sector: "Sector Z",
            subSector: "Z-6",
            area: "100 yds",
            demand: "15,00,000",
            reference: "Direct",
            contactPerson: "Muhammad Hamza",
            contact: "03331234567",
        }
    ]);

    useEffect(() => {
        handleGetProperties();
    }, []);

    const handleGetProperties = () => {

        Axios({
            url: `${baseUrl}/property/get-properties`,
            method: "GET",
            params: {
                type: "category type location area demand reference referrer contact"
            }
        })
            .then(res => {
                console.log(res.data);
                setData(res.data.properties)
                setLoader(false)
            })
            .catch(err => {
                console.log(err);
                setLoader(false);
                if (err && err.response) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: `${err.response.data.message}`
                    })
                }
            })
    }

    if (isDesktop) {
        return (
            <Container maxWidth="lg">
                <Paper elevation={3} className={paper}>
                    <h1>Property List</h1>
                    <Divider className={divider} />
                    {
                        loader ?
                            <div className={classes.centerContainer}>
                                <CircularProgress className={classes.circularProgress} />
                            </div>
                            :
                            <Table property={data} />
                    }
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

