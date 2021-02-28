import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';
import Swal from 'sweetalert2';
import Axios from 'axios';

import baseUrl from '../../../Util/baseUrl';
import Form from '../Components/Form';

const useStyles = makeStyles((theme) => ({
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

export default function UpdateSociety(props) {
    const societyId = props.match.params.id;
    const classes = useStyles();
    const [data, setData] = useState(null);
    const [loader, setLoader] = useState(true);

    useEffect(() => {

        Axios({
            url: `${baseUrl}/society/get-society`,
            method: "GET",
            params: {
                societyId
            }
        })
            .then(res => {
                console.log(res.data);
                setData(res.data.society)
                setLoader(false);
            })
            .catch(err => {
                console.log(err);
                setLoader(false)
            })

    }, [societyId]);

    return (
        <Fragment>
            {
                loader ?
                    <div className={classes.centerContainer}>
                        <CircularProgress className={classes.circularProgress} />
                    </div>
                    :
                    <Form {...props} origin="update" data={data} />
            }
        </Fragment>
    )
}

