import React from 'react';
import { makeStyles, Container, Paper, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 10
    },
    divider: {
        marginTop: 15,
        marginBottom: 30
    },
    heading: {
        margin: "7px 0 10px 0px",
        textDecoration: "underline",
        textAlign: "Center"
    },
    list: {
        padding: 0
    },
    listItem: {
        margin: 0,
        padding: 0
    },
    listItemIcon: {
        minWidth: 30
    },
    price: {
        textAlign: 'right',
        color: 'green'
    },
    text: {
        fontSize: 14,
        color: '#666666'
    },
    listItemText: {
        fontSize: 13
    },
    contactAnchor: {
        textDecoration: "none",
        color: "inherit"
    }
}));

export default function CustomCard(props) {
    const classes = useStyles();
    const { paper, heading, list, listItem, listItemIcon, icon, listItemText, price, contactAnchor } = classes;
    const { data } = props;

    return (
        <Paper elevation={3} className={paper}>
            <h2 className={heading}> {data.category} {data.type} </h2>
            <List className={list} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ListItem className={listItem}>
                    <ListItemIcon className={listItemIcon}>
                        <MonetizationOnIcon className={icon} className="icons" />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography className={listItemText}>
                                <strong>Demand:</strong> <span className={price}>{data.demand}</span>
                            </Typography>
                        }
                    />
                </ListItem>
                <ListItem className={listItem}>
                    <ListItemIcon className={listItemIcon}>
                        <AspectRatioIcon className={icon} className="icons" />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography className={listItemText}>
                                <strong>Area:</strong> {data.area} yds
                            </Typography>
                        }
                    />
                </ListItem>
            </List>
            <List className={list}>
                <ListItem className={listItem}>
                    <ListItemIcon className={listItemIcon}>
                        <LocationOnIcon className={icon} className="icons" />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography className={listItemText}>
                                <strong>Location:</strong> {data.subSector}
                            </Typography>
                        }
                    />
                </ListItem>
                <ListItem className={listItem}>
                    <ListItemIcon className={listItemIcon}>
                        <PhoneAndroidIcon className={icon} className="icons" />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography className={listItemText}>
                                <strong>Contact Person: </strong> {data.contactPerson} <a href={`tel:${data.contact}`} className={contactAnchor}>({data.contact})</a>
                            </Typography>
                        }
                    />
                </ListItem>
                {/* <ListItem className={listItem}>
                        <ListItemIcon className={listItemIcon}>
                            <PhoneAndroidIcon className={icon} className="icons" />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography className={listItemText}>
                                    <strong>Contact: </strong> 
                                </Typography>
                            }
                        />
                    </ListItem> */}
            </List>
        </Paper>
    )
}

