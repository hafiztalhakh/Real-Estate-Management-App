import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Typography, Button, Divider } from '@material-ui/core';
import moment from 'moment';
import Axios from 'axios';
import ReplyIcon from '@material-ui/icons/Reply';
import ForwardIcon from '@material-ui/icons/Forward';

import ContextAPI from '../../../ContextAPI/ContextAPI';
import baseUrl from '../../../Util/baseUrl';
import Reply from '../Components/Reply';

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
    subjectLine: {
        fontWeight: 'normal'
    },
    messageHeader: {
        display: 'flex',
        justifyContent: 'space-between',
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
    const { paper, subjectLine, messageHeader, senderName, senderEmail, messageBody, messageText, messageActions, icons } = classes;
    const [data, setData] = useState({});
    // const [dataTime, setDateTime] = useState(null);
    const [noMessageScreen, setNoMessageScreen] = useState(false);
    const [showReplyForm, setShowReply] = useState(false);

    useEffect(() => {

        if (token && inbox && inbox.length > 0) {
            const tempArr = inbox.filter(message => messageId === message._id);
            setData(tempArr[0]);
            // let tempDate = null;
            // let x = null;
            // var a = moment();
            // var b = moment(tempArr[0].createdAt);

            // if (moment().format("DD-MM-YYYY") === moment(tempArr[0].createdAt).format("DD-MM-YYYY")) {
            //     tempDate = moment(tempArr[0].createdAt).format("hh:mm");
            //     let secondsSpent = a.diff(b, 'seconds');
            //     let minutesSpent = a.diff(b, 'minutes');
            //     let hoursSpent = a.diff(b, 'hours');
            //     if (secondsSpent < 60) {
            //         x = secondsSpent;
            //     }
            //     else if (minutesSpent < 60) {
            //         x = minutesSpent
            //     }
            //     else {
            //         x = hoursSpent
            //     }
            // }
            // else {
            //     tempDate = moment(tempArr[0].createdAt).format("ddd, D MMM, hh:mm");
            //     let daysSpent = a.diff(b, 'days');
            //     let weeksSpent = a.diff(b, 'weeks');
            //     let monthsSpent = a.diff(b, 'months');
            //     let yearsSpent = a.diff(b, 'years');


            //     if (daysSpent < 7) {
            //         x = daysSpent
            //     }
            //     else if (weeksSpent < 7) {
            //         x = weeksSpent
            //     }
            //     else if (monthsSpent < 30) {
            //         x = monthsSpent
            //     }
            //     else {
            //         x = yearsSpent
            //     }
            // }
            // setDateTime(x);

        } else {

            Axios({
                url: `${baseUrl}/message/get-message`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    messageId
                }
            }).then(res => {
                if (res.data.message) {
                    setData(res.data.message);
                }

            }).catch(err => {
                console.log(err);
                setNoMessageScreen(true);
            })
        }
    }, [inbox]);

    const handleHideForm = () => {
        setShowReply(false);
    }
    return (
        <Container maxWidth="lg">
            <Paper elevation={3} className={paper}>
                {
                    !noMessageScreen ?
                        <div>
                            <div>
                                <h1 className={subjectLine}>{data.subject}</h1>
                            </div>
                            <div className={messageHeader}>
                                <div>
                                    <Typography className={senderName}>{data.name}</Typography>
                                    <Typography className={senderEmail}>{`<${data.email}>`}</Typography>
                                </div>
                                <div>
                                    <Typography>
                                        {
                                            moment().format("DD-MM-YYYY") === moment(data.createdAt).format("DD-MM-YYYY") ?
                                                `${moment(data.createdAt).format("hh:mm")}`  /*ago wala scene krna hai */
                                                :
                                                moment(data.createdAt).format("ddd, D MMM, hh:mm")
                                        }
                                    </Typography>
                                </div>
                            </div>
                            <div className={messageBody}>
                                <p className={messageText}>{data.message}</p>
                            </div>

                            {
                                showReplyForm ?
                                    < Reply email={data.email} hideForm={handleHideForm} />
                                    :
                                    <div className={messageActions}>
                                        <Divider style={{ margin: "30px 0" }} />
                                        <Button
                                            variant="outlined"
                                            color="default"
                                            style={{ textTransform: "capitalize", fontWeight: "bold" }}
                                            onClick={() => { setShowReply(true) }}
                                        >
                                            <ReplyIcon className={icons} />   Reply
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="default"
                                            style={{ textTransform: "capitalize", fontWeight: "bold", marginLeft: 10 }}
                                        >
                                            <ForwardIcon className={icons} />   Forward
                                        </Button>

                                    </div>
                            }

                        </div>
                        :
                        <h1>No Message</h1>
                }
            </Paper>
        </Container>
    );
}