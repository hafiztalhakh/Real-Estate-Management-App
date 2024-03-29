import React, { Fragment, useState, useEffect } from 'react';
import { useTheme, useMediaQuery, makeStyles, Container, Paper, Divider, CircularProgress, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Axios from 'axios';
import ApartmentIcon from '@material-ui/icons/Apartment';
import Swal from 'sweetalert2';

import baseUrl from '../../../Util/baseUrl';
import Table from '../Components/Table';
import Modal from '../Components/Modal';

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

export default function Society() {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const classes = useStyles();
    const { paper, divider } = classes;
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        handleGetSocieties();
    }, []);

    const handleGetSocieties = () => {

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
                    <h1>Societies List</h1>
                    <Divider className={divider} />
                    {
                        loader ?
                            <div className={classes.centerContainer}>
                                <CircularProgress className={classes.circularProgress} />
                            </div>
                            :
                            <Table property={data} getData={handleGetSocieties} />
                    }
                </Paper>
            </Container>
        )
    } else {
        return (
            <Container maxWidth="md">
                <h1>Societies List</h1>
                <Divider className={divider} />
                {
                    loader ?
                        <div className={classes.centerContainer}>
                            <CircularProgress className={classes.circularProgress} />
                        </div>
                        :
                        data.length > 0 ? data.map((el, i) => (
                            <Modal societyId={el._id} getData={handleGetSocieties}>
                                <ListItem key={i} disableGutters>
                                    <ListItemIcon>
                                        <ApartmentIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={
                                        <strong>{el.name}</strong>
                                    }
                                    />
                                </ListItem>
                            </Modal>
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

