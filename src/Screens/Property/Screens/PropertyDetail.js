import React, { Fragment } from 'react';
import { useTheme, useMediaQuery, Container } from '@material-ui/core';
import Modal from '../Components/Modal';
import Details from '../Components/Details';

export default function PropertyDetail(props) {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    if (isDesktop) {
        return (
            <Fragment>
                <Modal {...props}>
                    <Details {...props} />
                </Modal>
            </Fragment>
        )
    } else {
        return (
            <Container maxWidth="sm">
                <br/>
                <Details {...props} />
            </Container>
        )
    }
}

