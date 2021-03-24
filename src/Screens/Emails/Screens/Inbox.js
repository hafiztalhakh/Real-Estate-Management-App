import React, { useContext, useState, useEffect } from 'react';
import { useTheme, useMediaQuery, makeStyles, Container, Paper, Divider, CircularProgress, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Axios from 'axios';
import ApartmentIcon from '@material-ui/icons/Apartment';
import Swal from 'sweetalert2';

import baseUrl from '../../../Util/baseUrl';
import Table from '../Components/Table';
import ContextAPI from '../../../ContextAPI/ContextAPI';
import { Link } from 'react-router-dom';

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

export default function Message(props) {
    const { token, inboxHandler } = useContext(ContextAPI);
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
            url: `${baseUrl}/message/get-messages`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.data.messages) {
                    setData(res.data.messages);
                    inboxHandler(res.data.messages);
                }
                setLoader(false);
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
                    <h1>Emails</h1>
                    {/* <Divider className={divider} /> */}
                    {
                        loader ?
                            <div className={classes.centerContainer}>
                                <CircularProgress className={classes.circularProgress} />
                            </div>
                            :
                            <Table messages={data} getData={handleGetSocieties} {...props} />
                    }
                </Paper>
            </Container>
        )
    } else {
        return (
            <Container maxWidth="md">
                <h1>Emails</h1>

                {
                    loader ?
                        <div className={classes.centerContainer}>
                            <CircularProgress className={classes.circularProgress} />
                        </div>
                        :
                        data.length > 0 ? data.map((el, i) => (
                            <ListItem key={i} disableGutters onClick={() => props.history.push(`/mail/${el._id}`)}>
                                <ListItemIcon>
                                    <ApartmentIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <strong>{el.name}</strong>
                                    }
                                    secondary={
                                        <span>{el.message.slice(0, 100)}</span>
                                    }
                                />
                            </ListItem>
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

