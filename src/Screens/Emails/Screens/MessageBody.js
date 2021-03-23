import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Typography, Button, Divider } from '@material-ui/core';
import moment from 'moment';

import ReplyIcon from '@material-ui/icons/Reply';

import ContextAPI from '../../../ContextAPI/ContextAPI';

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
    messageHeader: {
        display: 'flex',
        justifyContent: 'space-btween',
        width: '100%'
    },
    senderName: {
        display: 'inline-flex',
        fontSize: 16,
        fontWeight: 'bold'
    },
    senderEmail: {
        display: 'inline-flex',
        fontSize: 14,
        fontWeight: 'normal',
        marginLeft: 5,
        cursor: "pointer"
    },
    // messageBody: {
    //     margin
    // },
    messageBody: {
        fontSize: 14,
        whiteSpace: "pre-line",
        // margin: 0
    },
    messageActions: {
        margin: "20px 0"
    },
    icons: {
        color: '#676358'
    }
}));

export default function MessageBody(props) {
    const { inbox, token } = useContext(ContextAPI);
    const { match } = props;
    const messageId = match.params.id;
    const classes = useStyles();
    const { paper, messageHeader, senderName, senderEmail, messageBody, messageText, messageActions, icons } = classes;
    const [data, setData] = useState({});

    useEffect(() => {

        if (token && inbox && inbox.length > 0) {
            console.log(inbox);
            const tempArr = inbox.filter(message => messageId === message._id);
            console.log(tempArr)
            setData(tempArr[0]);
        }
    }, [inbox]);

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} className={paper}>

                <div>
                    <div>
                        <h1>{data.subject}</h1>
                    </div>
                    <div className={messageHeader}>
                        <div>
                            <Typography className={senderName}>{data.name}</Typography>
                            <Typography className={senderEmail}>{`<${data.email}>`}</Typography>
                        </div>
                        <div>
                            <p>
                                {
                                    moment().format("DD-MM-YYYY") === moment(data.createdAt).format("DD-MM-YYYY") ?
                                        `${moment(data.createdAt).format("hh:mm")}`  /*ago wala scene krna hai */
                                        :
                                        moment(data.createdAt).format("ddd, D MMM, hh:mm")
                                }
                            </p>
                        </div>
                    </div>
                    <div className={messageBody}>
                        <p className={messageText}>{data.message}</p>
                    </div>
                    <Divider />
                    <div className={messageActions}>
                        <Button
                            variant="outlined"
                            color="default"
                            style={{ textTransform: "capitalize", fontWeight: "bold" }}
                        >
                            <ReplyIcon className={icons} />   Reply
                        </Button>
                    </div>
                </div>

                {/* <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={2} className={tableCellHead}>Date & Time:</Grid>
                    <Grid item xs={12} sm={12} md={9}>{moment().format("DD-MM-YYYY hh:mm:ss a")}</Grid>
                    <Grid item xs={12} sm={12} md={2} className={tableCellHead}>Name:</Grid>
                    <Grid item xs={12} sm={12} md={9}>{data.name}</Grid>
                    <Grid item xs={12} sm={12} md={2} className={tableCellHead}>Email:</Grid>
                    <Grid item xs={12} sm={12} md={9}>hafiz.talhakh@gmail.com</Grid>
                    <Grid item xs={12} sm={12} md={2} className={tableCellHead}>Subject:</Grid>
                    <Grid item xs={12} sm={12} md={9}>Testing</Grid>
                    <Grid item xs={12} sm={12} md={2} className={tableCellHead}>Message:</Grid>
                    <Grid item xs={12} sm={12} md={9}>
                        <p style={{ whiteSpace: "pre-line", margin: 0 }}>We at Shaheer Enterprises present the largest selection of both commercial and residential properties to choose from. We deal in all kinds of sale, purchase and rent of both residential and commercial properties.
                        </p>
                    </Grid>
                </Grid> */}
            </Paper>
        </Container>
    );
}