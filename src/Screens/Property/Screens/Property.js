import React, { Fragment, useEffect, useState } from 'react';
import { useTheme, useMediaQuery, makeStyles, Container, Paper, Divider, CircularProgress } from '@material-ui/core';
import Axios from 'axios';
import Swal from 'sweetalert2';

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
                console.log(err);
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
                console.log(err);
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

        if (query) {
            //     const filteredByType = properties.filter(el => type ? el.type.toLowerCase() === type.toLowerCase() : null);
            // const filteredByFileType = properties.filter(el => fileType ? el.fileType.toLowerCase() === fileType.toLowerCase() : null);
            // const filteredByAreaCategory = properties.filter(el => areaCategory ? el.areaCategory.toLowerCase() === areaCategory.toLowerCase() : null);
            // const filteredBySociety = properties.filter(el => society ? el.society.toLowerCase() === society.toLowerCase() : null);
            // const filteredBySector = properties.filter(el => sector ? el.sector.toLowerCase() === sector.toLowerCase() : null);

            const filteredDataByCategory = properties.filter(property => {
                return property.category.toLowerCase().includes(query.toLowerCase());
            });
            const filteredDataByPropertyType = properties.filter(property => {
                return property.type.toLowerCase().includes(query.toLowerCase());
            });
            const filteredDataBySocities = properties.filter(property => {
                return property.society.toLowerCase().includes(query.toLowerCase());
            });
            const filteredDataBySectors = properties.filter(property => {
                return property.sector.toLowerCase().includes(query.toLowerCase());
            });
            const filteredDataBySubSectors = properties.filter(property => {
                return property.subSector.toLowerCase().includes(query.toLowerCase());
            });
            const filteredDataByReferrer = properties.filter(property => {
                return property.referrer.toLowerCase().includes(query.toLowerCase());
            });
            const filteredDataByArea = properties.filter(property => {
                return property.area.toLowerCase().includes(query.toLowerCase());
            });
            const filteredDataByDemand = properties.filter(property => {
                return property.demand.toString().toLowerCase().includes(parseInt(query));
            });

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

            if (tempArr.length > 0)
                setData([...new Set(tempArr)]);   /* [...new Set(tempArr)] ==> "Reduces repeating values in array" */
            else
                setData([]);
        }
    }

    const handleFilter = filter => {
        let { type, fileType, areaCategory, society, sector } = filter;
        let filteredArr = [...properties];

        // Axios({
        //     url: `${baseUrl}/property/get-filtered-property`,
        //     method: "GET",
        //     params: {
        //         selectThese: "category type fileType area areaCategory society sector subSector demand reference referrer contact createdAt",
        //         type,
        //         fileType,
        //         areaCategory,
        //         society,
        //         sector
        //     }
        // })
        //     .then(res => {
        //         setData(res.data.properties);
        //         setLoader(false)
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         setLoader(false);
        //         if (err && err.response) {
        //             Swal.fire({
        //                 icon: "error",
        //                 title: "Error!",
        //                 text: `${err.response.data.message}`
        //             })
        //         }
        //     })


        const filteredByType = properties.filter(el => type ? el.type.toLowerCase() === type.toLowerCase() : null);
        const filteredByFileType = properties.filter(el => fileType ? el.fileType.toLowerCase() === fileType.toLowerCase() : null);
        const filteredByAreaCategory = properties.filter(el => areaCategory ? el.areaCategory.toLowerCase() === areaCategory.toLowerCase() : null);
        const filteredBySociety = properties.filter(el => society ? el.society.toLowerCase() === society.toLowerCase() : null);
        const filteredBySector = properties.filter(el => sector ? el.sector.toLowerCase() === sector.toLowerCase() : null);

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
        if (type) {
            filteredArr = filteredArr.filter(el => el.demand.toLowerCase() > type.toLowerCase()); price: { $lte: maxPrice || 1000000000, $gte: minPrice || 0 }
        }

        const tempArr = filteredArr.sort((a, b) => { return (b.createdAt - a.createdAt) });

        console.log("test", [...new Set(tempArr)])

        if (tempArr.length > 0)
            setData([...new Set(tempArr)]);   /* [...new Set(tempArr)] ==> "Reduces repeating values in array" */
        else
            setData([]);

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

