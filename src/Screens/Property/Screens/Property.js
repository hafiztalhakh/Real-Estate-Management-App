import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useTheme, useMediaQuery, makeStyles, Container, Paper, Divider, CircularProgress } from '@material-ui/core';
import Axios from 'axios';
import Swal from 'sweetalert2';

import ContextAPI from '../../../ContextAPI/ContextAPI';
import baseUrl from '../../../Util/baseUrl';
import Table from '../Components/Table';
import Card from '../Components/Cards';
import Search from '../Components/Search';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "30px 40px 40px 40px",
        backgroundColor: "#fff",
        borderRadius: 10,
        [theme.breakpoints.down('md')]: {
            padding: 0,
            boxShadow: "none",
        }
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
        height: "50vh"
    },
    circularProgress: {
        color: '#33c4ff',
        width: 80,
        height: 80
    }
}));

export default function Property() {
    const { token } = useContext(ContextAPI);
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const classes = useStyles();
    const { paper, divider } = classes;
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([]);
    const [properties, setProperties] = useState([]);
    const [societies, setSocieties] = useState([]);

    useEffect(() => {
        handleGetProperties();
        handleGetSocities();
    }, []);

    const handleGetProperties = () => {

        Axios({
            url: `${baseUrl}/property/get-properties`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                type: "category type fileType area areaCategory society sector subSector demand reference referrer contact createdAt"
            }
        })
            .then(res => {
                setProperties(res.data.properties);
                setData(res.data.properties);
                setLoader(false)
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
    }

    const handleGetSocities = () => {

        Axios({
            url: `${baseUrl}/society/get-societies`,
            method: "GET",
            params: {
                type: "name sectors"
            }
        })
            .then(res => {
                setSocieties(res.data.societies);
            })
            .catch(err => {
                // console.log(err);
                if (err && err.response) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: "Internal server error while fetching socities"
                    })
                }
            })
    }

    const handleSearch = query => {
        setLoader(true);

        if (query) {
            query = query.toLowerCase();
            const filteredDataByCategory = properties.filter(property => property.category.toLowerCase().includes(query));
            const filteredDataByPropertyType = properties.filter(property => property.type.toLowerCase().includes(query));
            const filteredDataBySocities = properties.filter(property => property.society.toLowerCase().includes(query));
            const filteredDataBySectors = properties.filter(property => property.sector.toLowerCase().includes(query));
            const filteredDataBySubSectors = properties.filter(property => property.subSector.toLowerCase().includes(query));
            const filteredDataByReferrer = properties.filter(property => property.referrer.toLowerCase().includes(query));
            const filteredDataByArea = properties.filter(property => property.area.toLowerCase().includes(query));
            const filteredDataByDemand = properties.filter(property => property.demand === parseInt(query));
            const tempArr = [
                ...filteredDataByCategory,
                ...filteredDataByPropertyType,
                ...filteredDataBySocities,
                ...filteredDataBySectors,
                ...filteredDataBySubSectors,
                ...filteredDataByReferrer,
                ...filteredDataByArea,
                ...filteredDataByDemand
            ].sort((a, b) => { return (b.createdAt - a.createdAt) });

            if (tempArr.length > 0) {
                setData([...new Set(tempArr)]);   /* [...new Set(tempArr)] ==> "Reduces repeating values in array" */
                setLoader(false);
            } else {
                setData([]);
                setLoader(false);
            }

        }
    }

    const handleFilter = filter => {
        let { type, fileType, areaCategory, society, sector, minDemand, maxDemand } = filter;
        let filteredArr = [...properties];

        setLoader(true);

        if (type) {
            filteredArr = filteredArr.filter(el => el.type.toLowerCase() === type.toLowerCase());
        }
        if (fileType) {
            filteredArr = filteredArr.filter(el => el.fileType.toLowerCase() === fileType.toLowerCase());
        }
        if (areaCategory) {
            filteredArr = filteredArr.filter(el => el.areaCategory.toLowerCase() === areaCategory.toLowerCase());
        }
        if (society) {
            filteredArr = filteredArr.filter(el => el.society.toLowerCase() === society.toLowerCase());
        }
        if (sector) {
            filteredArr = filteredArr.filter(el => el.sector.toLowerCase() === sector.toLowerCase());
        }
        if (minDemand && maxDemand) {
            filteredArr = filteredArr.filter(el => el.demand >= parseInt(minDemand) && el.demand <= parseInt(maxDemand));
        } else if (minDemand) {
            Swal.fire({
                icon: "warning",
                title: "please enter maximum demand also"
            })
        } else if (maxDemand) {
            Swal.fire({
                icon: "warning",
                title: "please enter minimum demand also"
            })
        }

        const tempArr = filteredArr.sort((a, b) => { return (b.createdAt - a.createdAt) });

        if (tempArr.length > 0) {
            setData([...new Set(tempArr)]);
            setLoader(false);
        } else {
            setData([]);
            setLoader(false);
        }

    }

    const handleClearSearch = () => {
        setData([...properties]);
    }

    if (isDesktop) {
        return (
            <Container maxWidth="lg">
                <Paper elevation={3} className={paper}>
                    <h1>Property List</h1>
                    <Divider className={divider} />

                    <Search
                        searchHandler={handleSearch}
                        clearHandler={handleClearSearch}
                        societies={societies}
                        filterHandler={handleFilter}
                    />

                    {
                        loader ?
                            <div className={classes.centerContainer}>
                                <CircularProgress className={classes.circularProgress} />
                            </div>
                            :
                            <Table property={data} getData={handleGetProperties} />
                    }
                </Paper>
            </Container>
        )
    } else {
        return (
            <Container maxWidth="md">
                <h1>Property List</h1>
                <Divider className={divider} />

                <Search
                    searchHandler={handleSearch}
                    clearHandler={handleClearSearch}
                    societies={societies}
                    filterHandler={handleFilter}
                />

                {
                    data.map((el, i) => (
                        <Fragment key={i}>
                            <Card data={el} getData={handleGetProperties} />
                        </Fragment>
                    ))
                }
            </Container>
        )
    }
}

