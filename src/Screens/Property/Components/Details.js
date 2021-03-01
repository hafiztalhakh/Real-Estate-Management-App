import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, IconButton, Grid, CircularProgress, Divider, Chip, Menu, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarIcon from '@material-ui/icons/Star';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import BlockIcon from '@material-ui/icons/Block';

import Axios from 'axios';
import baseUrl from '../../../Util/baseUrl';
import Swal from 'sweetalert2';

const useStles = makeStyles(theme => ({
    // container: {
    //     padding: "20px 20px 40px 20px",
    //     [theme.breakpoints.down('md')]: {
    //         padding: 10
    //     }
    // },
    closeButton: {
        float: 'right'
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
        height: 500
    },
    circularProgress: {
        color: '#33c4ff',
        width: 80,
        height: 80
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
    },
    root: {
        backgroundColor: "transparent",
        boxShadow: "none",
        "& .MuiPaper-elevation8": {
            boxShadow: "none"
        }
    },
    iconButton: {
        backgroundColor: "#f5f5f5",
        "&:hover": {
            color: '#33c4ff',
            backgroundColor: "#edecec"
        }
    },
    publishButton1: {
        backgroundColor: "#f5f5f5",
        "&:hover": {
            color: 'green',
            backgroundColor: "#edecec"
        }
    },
    publishButton2: {
        backgroundColor: "#f5f5f5",
        color: 'green',
        "&:hover": {
            color: '#0000008a',
            backgroundColor: "#edecec"
        }
    },
    featuredButton1: {
        backgroundColor: "#f5f5f5",
        "&:hover": {
            color: '#dda71f',
            backgroundColor: "#edecec"
        }
    },
    featuredButton2: {
        backgroundColor: "#f5f5f5",
        color: '#dda71f',
        "&:hover": {
            color: '#0000008a',
            backgroundColor: "#edecec"
        }
    },
    removeButton: {
        backgroundColor: "#f5f5f5",
        "&:hover": {
            color: '#fd5a5a',
            backgroundColor: "#edecec"
        }
    }
}));

const formatter = new Intl.NumberFormat('ur', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0
});

export default function Details(props) {
    const classes = useStles();
    const { container,
        centerContainer,
        circularProgress,
        divider,
        price,
        contactAnchor,
        header,
        root,
        iconButton,
        publishButton1,
        publishButton2,
        featuredButton1,
        featuredButton2,
        removeButton
    } = classes;
    const { history, match, origin, hideModal } = props;
    const propertyId = match.params.id;
    const [data, setData] = useState({});
    const [loader, setLoader] = useState(true);
    const [anchorEl, setAnchorEl] = useState(false);

    useEffect(() => {

        Axios({
            url: `${baseUrl}/property/get-property`,
            method: "GET",
            params: {
                propertyId
            }
        })
            .then(res => {
                // console.log(res.data);
                setData(res.data.property)
                setLoader(false);
            })
            .catch(err => {
                console.log(err);
                setLoader(false)
            })

    }, [propertyId]);

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
                    // getData();
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

    const handleConfirmation = action => {
        if (origin === "modal") {
            hideModal();
        }

        handleHideMenu();
        Swal.fire({
            title: action === "sold" ? "Confirmation!" : 'Are you sure?',
            text: action === "sold" ? "Press confirm to proceed" : "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: action === "sold" ? "Confirm" : 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                if (action === "sold") {
                    handleMarkAsSold();
                } else {
                    handleDeleteProperty();

                }
            }
        })
    };

    const handleShowMenu = event => {
        setAnchorEl(event.currentTarget);
    }

    const handleHideMenu = () => {
        setAnchorEl(null)
    }

    const handlePropertyPublishToWebsite = status => {
        let tempUrl = "";

        if (status === "publish") {
            tempUrl = `${baseUrl}/property/publish-property-to-website`;
        } else {
            tempUrl = `${baseUrl}/property/remove-property-from-website`
        }
        if (origin === "modal") {
            hideModal();
        }

        handleHideMenu();
        Axios({
            url: tempUrl,
            method: "POST",
            data: {
                propertyId
            }
        })
            .then(res => {
                Swal.fire({
                    icon: "success",
                    title: status === "publish" ? "Published!" : "Removed!",
                    text: `${res.data.message}`
                }).then(() => {
                    history.push("/property");
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
    }


    const handleMarkAsFeatured = status => {
        let tempUrl = "";

        if (status === "featured") {
            tempUrl = `${baseUrl}/property/mark-as-featured`;
        } else {
            tempUrl = `${baseUrl}/property/unmark-featured-property`
        }
        if (origin === "modal") {
            hideModal();
        }

        handleHideMenu();
        Axios({
            url: tempUrl,
            method: "POST",
            data: {
                propertyId
            }
        })
            .then(res => {
                Swal.fire({
                    icon: "success",
                    title: status === "featured" ? "Featured!" : "Removed!",
                    text: `${res.data.message}`
                }).then(() => {
                    history.push("/property");
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
    }

    const handleMarkAsSold = () => {
        if (origin === "modal") {
            hideModal();
        }

        handleHideMenu();
        Axios({
            url: `${baseUrl}/property/mark-as-sold`,
            method: "POST",
            data: {
                propertyId
            }
        })
            .then(res => {
                Swal.fire({
                    icon: "success",
                    title: "Done!",
                    text: `${res.data.message}`
                }).then(() => {
                    history.push("/property");
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
    }

    return (
        <div className={container}>
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
                        classes={{ paper: root }}
                    >
                        <List>
                            <ListItem>
                                <IconButton
                                    title="Edit Property"
                                    className={iconButton}
                                    onClick={() => {
                                        history.push(`/property/update/${data._id}`);
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                            </ListItem>
                            <ListItem>
                                {
                                    data.isShowOnWebsite ?
                                        <IconButton
                                            title="Remove from Website"
                                            className={publishButton2}
                                            onClick={() => {
                                                handlePropertyPublishToWebsite("remove");
                                            }}
                                        >
                                            <PlaylistAddCheckIcon />
                                        </IconButton>
                                        :
                                        <IconButton
                                            title="Publish to Website"
                                            className={publishButton1}
                                            onClick={() => {
                                                handlePropertyPublishToWebsite("publish");
                                            }}
                                        >
                                            <PlaylistAddCheckIcon />
                                        </IconButton>
                                }
                            </ListItem>
                            <ListItem>
                                {
                                    data.isFeatured ?
                                        <IconButton
                                            title="Make it Featured"
                                            className={featuredButton2}
                                            onClick={() => {
                                                handleMarkAsFeatured("remove");
                                            }}
                                        >
                                            <StarIcon />
                                        </IconButton>
                                        :
                                        <IconButton
                                            title="Make it Featured"
                                            className={featuredButton1}
                                            onClick={() => {
                                                handleMarkAsFeatured("featured");
                                            }}
                                        >
                                            <StarIcon />
                                        </IconButton>
                                }
                            </ListItem>
                            <ListItem>
                                <IconButton
                                    title="Mark as Sold out"
                                    className={iconButton}
                                    onClick={() => {
                                        handleConfirmation("sold");
                                    }}
                                >
                                    <LoyaltyIcon />
                                </IconButton>
                            </ListItem>
                            <ListItem>
                                <IconButton
                                    title="Delete Property"
                                    className={removeButton}
                                    onClick={() => {
                                        handleConfirmation("delete");
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
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
                        </Grid>
                        <Divider className={divider} />

                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <strong>Description:</strong>
                                <p style={{ whiteSpace: "break-spaces", margin: 0 }}>{data.description}</p>
                            </Grid>
                        </Grid>
                    </Fragment>
            }
        </div>
    );
}