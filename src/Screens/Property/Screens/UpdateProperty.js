import React, { Fragment, useContext, useEffect, useState } from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';
import Swal from 'sweetalert2';
import Axios from 'axios';

import baseUrl from '../../../Util/baseUrl';
import Form from '../Components/Form';
import ContextAPI from '../../../ContextAPI/ContextAPI';

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

export default function UpdateProperty(props) {
    const { token } = useContext(ContextAPI);
    const propertyId = props.match.params.id;
    const classes = useStyles();
    const [data, setData] = useState(null);
    const [loader, setLoader] = useState(true);

    useEffect(() => {

        Axios({
            url: `${baseUrl}/property/get-property`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                propertyId
            }
        })
            .then(res => {
                setData(res.data.property)
                setLoader(false);
            })
            .catch(err => {
                // console.log(err);
                setLoader(false);
                if (err && err.response) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: `${err.response.data.message}`
                    })
                }
            })

    }, [propertyId]);

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

