import React, { Fragment } from 'react';
import Form from '../Components/Form';

export default function AddSociety(props) {

    return (
        <Fragment>
            <Form {...props} origin="new" />
        </Fragment>
    )
}

