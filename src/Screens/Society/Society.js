import React, { Fragment, useState, useEffect } from 'react';
import { useTheme, useMediaQuery, makeStyles, Container, Paper, Divider, CircularProgress, Button } from '@material-ui/core';
import Axios from 'axios';

import Table from './Components/Table';
import baseUrl from '../../Util/baseUrl';

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
        height: "80vh"
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
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        handleGetProperty();
    }, []);

    const handleGetProperty = () => {

        Axios({
            url: `${baseUrl}/society/get-societies`,
            method: "GET",
            params: {
                type: "name town city category"
            }
        })
            .then(res => {
                console.log(res.data);
                setData(res.data.societies)
                setLoader(false)
            })
            .catch(err => {
                console.log(err);
                setLoader(false)
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
                            <Table property={data} getData={handleGetProperty} />
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
                    loader ?
                        <div className={classes.centerContainer}>
                            <CircularProgress className={classes.circularProgress} />
                        </div>
                        :
                        data.length > 0 ? data.map((el, i) => (
                            <Fragment key={i}>
                                <span>test</span>
                            </Fragment>
                        ))
                            :
                            <div className={classes.centerContainer}>
                                <h1 align="center">No data found</h1>
                            </div>
                }
            </Container>
        )
    }
}

