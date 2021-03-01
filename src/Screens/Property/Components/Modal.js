import React, { useState } from 'react';
import { makeStyles, Dialog, IconButton, Divider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStles = makeStyles(theme => ({
    container: {
        padding: "20px 20px 40px 20px",
        [theme.breakpoints.down('md')]: {
            padding: 10
        }
    },
    closeButton: {
        float: 'right'
    },
    divider: {
        margin: "15px 0 30px 0",
        [theme.breakpoints.down('md')]: {
            margin: "10px 0 20px 0",
        }
    }
}));

export default function Modal(props) {
    const classes = useStles();
    const { container, divider } = classes;
    const { children } = props;
    const [open, setOpen] = useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.history.push('/property')
    };

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            onClose={handleClose}
            open={open}
        >
            <div className={container}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Divider className={divider} />

                {children}
            </div>
        </Dialog>
    );
}