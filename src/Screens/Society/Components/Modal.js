import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Dialog, IconButton, Grid, CircularProgress, Divider } from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Axios from 'axios';
import baseUrl from '../../../Util/baseUrl';
import Swal from 'sweetalert2';
import ContextAPI from '../../../ContextAPI/ContextAPI';

const useStles = makeStyles(theme => ({
    closeButton: {
        float: 'right'
    },
    text: {
        fontFamily: '"Merienda One", cursive',
        fontSize: 16,
        color: '#666666'
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
        height: 200
    },
    circularProgress: {
        color: '#33c4ff',
        width: 80,
        height: 80
    },
    root: {
        paddingTop: 7
    },
    link: {
        textDecoration: "none",
        color: "inherit"
    }
}));

export default function Modal(props) {
    const { token } = useContext(ContextAPI);
    const classes = useStles();
    const { centerContainer, circularProgress, divider, root, link } = classes;
    const { children, societyId, getData } = props;
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});
    const [loader, setLoader] = useState(true);

    const handleClickOpen = () => {
        setOpen(true);

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
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteSociety = () => {

        Axios({
            url: `${baseUrl}/society/delete-society`,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                societyId
            }
        })
            .then(res => {
                Swal.fire({
                    icon: "success",
                    title: "Deleted!",
                    text: `${res.data.message}`
                }).then(() => {
                    getData();
                })
            })
            .catch(err => {
                console.log(err);
                if (err && err.response) {
                    Swal.fire({
                        icon: "success",
                        title: "Saved!",
                        text: `${err.response.data.message}`
                    })
                }
            })
    };

    const handleConfirmation = () => {
        setOpen(false);

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteSociety();
            }
        })
    }

    return (
        <Fragment>
            <div onClick={handleClickOpen}>
                {children}
            </div>
            <Dialog
                fullWidth
                maxWidth="sm"
                onClose={handleClose}
                open={open}
            >
                <div style={{ padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <Link to={`/society/update/${societyId}`} className={link}>
                                <IconButton className={classes.closeButton} onClick={handleClose}>
                                    <EditIcon />
                                </IconButton></Link>
                            <IconButton className={classes.closeButton} onClick={handleConfirmation}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                        <IconButton className={classes.closeButton} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Divider className={divider} />

                    {
                        loader ?
                            <div className={centerContainer}>
                                <CircularProgress className={circularProgress} />
                            </div>
                            :
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}>
                                    <strong>Name:</strong> {data.name}

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <strong>Town:</strong> {data.town}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <strong>City:</strong> {data.city}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <strong>Category:</strong> {data.category}
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <strong>Sectors/Block:</strong>
                                    <TreeView
                                        // className={classes.root}
                                        defaultCollapseIcon={<ExpandMoreIcon />}
                                        defaultExpandIcon={<ChevronRightIcon />}
                                    >
                                        {
                                            data.sectors.length > 0 && data.sectors.map((el, i) => {
                                                if (el.subSectors && el.subSectors.length > 0) {
                                                    return (
                                                        <TreeItem key={i} classes={{ root: root }} nodeId={el.name} label={el.name}>
                                                            {
                                                                el.subSectors.map((subEl, index) => (
                                                                    <TreeItem key={index} nodeId={subEl} label={subEl} />
                                                                ))
                                                            }
                                                        </TreeItem>
                                                    )
                                                } else {
                                                    return (
                                                        <TreeItem key={i} classes={{ root: root }} nodeId={el.name} label={el.name} />
                                                    )
                                                }

                                            })
                                        }
                                    </TreeView>
                                </Grid>
                            </Grid>
                    }
                </div>
            </Dialog>
        </Fragment>
    );
}