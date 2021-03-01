import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Dialog, IconButton, Grid, CircularProgress, Divider, Chip, Menu, List, ListItem, ListItemText } from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Axios from 'axios';
import baseUrl from '../../../Util/baseUrl';
import Swal from 'sweetalert2';

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
    text: {
        fontFamily: '"Merienda One", cursive',
        fontSize: 16,
        color: '#666666'
    },
    divider: {
        margin: "15px 0 30px 0",
        [theme.breakpoints.down('md')]: {
            margin: "10px 0 20px 0",
        }
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
    },
    price: {
        textAlign: 'right',
        color: 'green'
    },
    contactAnchor: {
        textDecoration: "none",
        color: "inherit"
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const formatter = new Intl.NumberFormat('ur', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0
});

export default function Modal(props) {
    const classes = useStles();
    const { container, centerContainer, circularProgress, divider, price, link, contactAnchor, header } = classes;
    const { children, propertyId, getData } = props;
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});
    const [loader, setLoader] = useState(true);
    const [anchorEl, setAnchorEl] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);

        Axios({
            url: `${baseUrl}/property/get-property`,
            method: "GET",
            params: {
                propertyId
            }
        })
            .then(res => {
                console.log(res.data);
                setData(res.data.property)
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

    const handleDeleteProperty = () => {

        Axios({
            url: `${baseUrl}/property/delete-property`,
            method: "DELETE",
            params: {
                propertyId
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
                handleDeleteProperty();
            }
        })
    };

    const handleShowMenu = event => {
        setAnchorEl(event.currentTarget);
    }

    const handleHideMenu = () => {
        setAnchorEl(null)
    }

    return (
        <Fragment>
            <div onClick={handleClickOpen}>
                {children}
            </div>
            <Dialog
                fullWidth
                maxWidth="md"
                onClose={handleHideMenu}
                open={open}
            >
                <div className={container}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {/* <div>
                            <Link to={`/property/update/${propertyId}`} className={link}>
                                <IconButton className={classes.closeButton} onClick={handleClose}>
                                    <EditIcon />
                                </IconButton></Link>
                            <IconButton className={classes.closeButton} onClick={handleConfirmation}>
                                <DeleteIcon />
                            </IconButton>
                        </div> */}
                        <IconButton className={classes.closeButton} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Divider className={divider} />

                    <div className={header}>
                        <h1 style={{ margin: 0 }}>Property Details</h1>
                        <div>
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleShowMenu}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleHideMenu}
                                getContentAnchorEl={null}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <List>
                                    <ListItem button onClick={() => { console.log("test") }}>
                                        <ListItemText primary="Print worksheet" />
                                    </ListItem>
                                    <ListItem button onClick={() => { handleHideMenu() }}>
                                        <ListItemText primary="Show pending entries" />
                                    </ListItem>
                                    <ListItem button onClick={() => { handleHideMenu() }}>
                                        <ListItemText primary="Show in-progress entries" />
                                    </ListItem>
                                    <ListItem button onClick={() => { handleHideMenu() }}>
                                        <ListItemText primary="Show verified entries" />
                                    </ListItem>
                                    <ListItem button onClick={() => { handleHideMenu() }}>
                                        <ListItemText primary="Show ready to print entries" />
                                    </ListItem>
                                    <ListItem button onClick={() => { handleHideMenu() }}>
                                        <ListItemText primary="Show all entries" />
                                    </ListItem>
                                </List>
                            </Menu>
                        </div>
                    </div>

                    <Divider className={divider} />

                    {
                        loader ?
                            <div className={centerContainer}>
                                <CircularProgress className={circularProgress} />
                            </div>
                            :
                            <Fragment>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={6}>
                                        <strong>Title:</strong> {data.title}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <strong>Condition:</strong>
                                        <Chip
                                            label={data.condition}
                                            style={{ backgroundColor: "#33c4ff", color: "#fff", marginLeft: 10 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <strong>Demand:</strong> <span className={price}>{formatter.format(data.demand)}</span>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <strong>Area:</strong> {data.area} yards
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <strong>Plot Number:</strong> {data.plotNumber}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <strong>Society:</strong> {data.society}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <strong>Sector/Block:</strong> {data.sector}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {data.subSector && <Fragment><strong>Sub-Sector:</strong> {data.subSector}</Fragment>}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <strong>Town:</strong> {data.town}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <strong>City:</strong> {data.city}
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <strong>Complete Address:</strong> {data.completeAddress}
                                    </Grid>
                                </Grid>
                                <Divider className={divider} />

                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={3}>
                                        <strong>Category:</strong> {data.category}
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <strong>Type:</strong> {data.type}
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <strong>File Type:</strong> {data.fileType}
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <strong>Area Category:</strong> {data.areaCategory}
                                    </Grid>
                                </Grid>
                                <Divider className={divider} />

                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={3}>
                                        <strong>Road Width:</strong> {data.roadWidth}
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <strong>Location:</strong> {data.location}
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <strong>Park Facing:</strong> {data.parkFacing ? "Yes" : "No"}
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <strong>Corner:</strong> {data.corner ? "Yes" : "No"}
                                    </Grid>
                                </Grid>
                                <Divider className={divider} />

                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={3}>
                                        <strong>Floors:</strong> {data.floors}
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <strong>Bedrooms:</strong> {data.bedrooms}
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <strong>Bathrooms:</strong> {data.bathrooms}
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <strong>Vehicle Space:</strong> {data.garage}
                                    </Grid>
                                </Grid>
                                <Divider className={divider} />

                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={3}>
                                        <strong>Reference:</strong> {data.reference}
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <strong>{(data.reference === "Direct" || data.reference === "Newspaper") ? "Seller" : "Referrer"}:</strong> {data.referrer}
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <strong>Contact:</strong> <a href={`tel:${data.contact}`} className={contactAnchor}>{data.contact}</a>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <strong>Description:</strong>
                                        <p style={{ whiteSpace: "break-spaces", margin: 0 }}>{data.description}</p>
                                    </Grid>
                                </Grid>
                            </Fragment>
                    }
                </div>
            </Dialog>
        </Fragment >
    );
}