import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useTheme, useMediaQuery, makeStyles, Container, Paper, Divider, CircularProgress } from '@material-ui/core';
import Axios from 'axios';
import Swal from 'sweetalert2';

import ContextAPI from '../../../ContextAPI/ContextAPI';
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
    const { token } = useContext(ContextAPI);
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const classes = useStyles();
    const { paper, divider } = classes;
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        handleGetProperties();
    }, []);

    const handleGetProperties = () => {

        Axios({
            url: `${baseUrl}/property/get-sold-properties`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setData(res.data.properties)
                setLoader(false)
            })
            .catch(err => {
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
                    <h1>Sold out Properties</h1>
                    <Divider className={divider} />
                    {
                        loader ?
                            <div className={classes.centerContainer}>
                                <CircularProgress className={classes.circularProgress} />
                            </div>
                            : data.length > 0 ?
                                <Table property={data} getData={handleGetProperties} />
                                :
                                <h1 align="center">No data found</h1>
                    }
                </Paper>
            </Container>
        )
    } else {
        return (
            <Container maxWidth="md">
                <h1>Sold out Properties</h1>
                <Divider className={divider} />
                {
                    data.length > 0 ? data.map((el, i) => (
                        <Fragment key={i}>
                            <Card data={el} getData={handleGetProperties} />
                        </Fragment>
                    ))
                        :
                        <h1 align="center">No data found</h1>
                }
            </Container>
        )
    }
}