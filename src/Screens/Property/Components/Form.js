import React, { Fragment, Component } from 'react';
import { Container, Paper, Grid, withStyles, Divider, InputLabel, TextField, Button, Chip } from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
import Axios from 'axios';
import Swal from 'sweetalert2';

import baseUrl from '../../../Util/baseUrl';

const styles = theme => ({
    paper: {
        padding: "30px 40px 40px 40px",
        backgroundColor: "#fff",
        borderRadius: 10,
        [theme.breakpoints.down('md')]: {
            padding: 0,
            boxShadow: "none",
        }
    },
    inputLabel: {
        fontWeight: "bold",
        marginBottom: 5
    },
    textField: {
        backgroundColor: "transparent",
        marginBottom: 5,
        width: "100%",
        "&:hover": {
            "& $notchedOutline": {
                borderColor: "#a9a8a8 !important",
                border: "2px solid",
            },
        },
        "& .MuiOutlinedInput-root": {
            height: 45,
            // borderRadius: 0,
            backgroundColor: "#f5f5f5",
        }
    },
    notchedOutline: {
        "&:hover": {
            borderColor: "#a9a8a8",
        },
    },
    focused: {
        "& $notchedOutline": {
            borderColor: "#a9a8a8 !important",
        },
    },
    autoCompleteTextField: {
        "& .MuiOutlinedInput-notchedOutline": {
            // border: 'none',
            // borderRadius: 0
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#a9a8a8",
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#a9a8a8",
        },
        "& .MuiOutlinedInput-root": {
            // borderRadius: 0,
            backgroundColor: '#f5f5f5',
            height: 45
        },
        marginBottom: 10,
        borderRadius: 0
    },
    btnContainer: {
        display: "flex",
        justifyContent: "flex-end"
    },
    btn: {
        width: 200,
        height: 45,
        backgroundColor: "#f5f5f5",
        color: "#000",
        fontWeight: "bold",
        "&:hover": {
            backgroundColor: "#f5f5f5",
            color: "#000",
        },
    },
    divider: {
        marginTop: 10,
        marginBottom: 30
    },
    chip: {
        width: 120,
        color: 'white',
        fontSize: 15,
        fontWeight: "bold",
    },
});

class PropertyForm extends Component {

    state = {
        title: "",
        category: "",
        type: "",
        fileType: "",
        bedrooms: "",
        bathrooms: "",
        garage: "",
        sector: "",
        subSector: "",
        society: "",
        condition: "",
        parkFacing: false,
        corner: false,
        areaCategory: "",
        area: "",
        roadWidth: "",
        location: "",
        town: "Gadap",
        city: "Karachi",
        completeAddress: "",
        demand: "",
        refernce: "",
        contact: "",

        societies: [],
        sectors: [],
        subSectors: [],
        submitLoader: false,


    }

    componentDidMount() {

        this.getSocities();
    }

    getSocities = () => {

        Axios({
            url: `${baseUrl}/society/get-societies`,
            method: "GET",
            params: {
                type: "name sectors"
            }
        })
            .then(res => {
                console.log(res.data);
                this.setState({ societies: res.data.societies })
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

    render() {
        const { origin, classes } = this.props;
        const {
            paper,
            inputLabel,
            textField,
            notchedOutline,
            focused,
            autoCompleteTextField,
            divider,
            btnContainer,
            btn,
            chip,
        } = classes;
        const {
            category,
            type,
            fileType,
            bedrooms,
            bathrooms,
            garage,
            sector,
            subSector,
            society,
            condition,
            parkFacing,
            corner,
            areaCategory,
            area,
            roadWidth,
            location,
            town,
            city,

            submitLoader,
            societies,
            sectors,
            subSectors
        } = this.state;

        return (
            <Fragment>
                <Container maxWidth="lg">
                    <Paper elevation={3} className={paper}>
                        <h1>{origin === "update" ? "Update Property" : "Add Property"}</h1>
                        <Divider className={divider} />

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6}>
                                <InputLabel className={inputLabel}>Title</InputLabel>
                                <TextField
                                    variant="outlined"
                                    placeholder="Title of the property"
                                    className={textField}
                                    InputProps={{
                                        classes: {
                                            notchedOutline: notchedOutline,
                                            focused: focused,
                                        },
                                    }}
                                    onChange={(e) => {
                                        this.setState({ title: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}></Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Select Category</InputLabel>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={["Residential", "Commercial"]}
                                    value={category}
                                    onChange={(e, value) => {
                                        this.setState({ category: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder="Select Category"
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ category: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Select Type</InputLabel>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={["Plot", "House", "Flat", "Building", "Structure"]}
                                    value={type}
                                    onChange={(e, value) => {
                                        this.setState({ type: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder="Select Type"
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ type: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Select File Type</InputLabel>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={["Lease", "Transfer"]}
                                    value={fileType}
                                    onChange={(e, value) => {
                                        this.setState({ fileType: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder="Select File Type"
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ fileType: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Select Condition</InputLabel>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={["New", "Used"]}
                                    value={condition}
                                    onChange={(e, value) => {
                                        this.setState({ condition: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder="Select Condition"
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ condition: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Select Area Category</InputLabel>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={["80 yards", "120 yards", "200 yards", "240 yards", "400 yards", "60 yards"]}
                                    value={areaCategory}
                                    onChange={(e, value) => {
                                        this.setState({ areaCategory: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder="Select Area Category"
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ areaCategory: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Enter Area of Land</InputLabel>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={["80", "120", "200", "240", "400", "60"]}
                                    value={area}
                                    onChange={(e, value) => {
                                        this.setState({ area: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder="Enter Area "
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ area: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Road Width</InputLabel>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={["30", "40", "70", "150"]}
                                    value={roadWidth}
                                    onChange={(e, value) => {
                                        this.setState({ roadWidth: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder="Road Width in foot"
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ roadWidth: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Select Location</InputLabel>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={["East Open", "West Open"]}
                                    value={location}
                                    onChange={(e, value) => {
                                        this.setState({ location: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder="Select Location"
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ location: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <div style={{ height: 20 }} />
                                <Chip
                                    label="Park Facing"
                                    className={chip}
                                    style={parkFacing ? {
                                        backgroundColor: "green",
                                        marginRight: 10
                                    } : {
                                            backgroundColor: "white",
                                            color: 'green',
                                            border: "2px solid green",
                                            marginRight: 10
                                        }}
                                    onClick={() => {
                                        this.setState({ parkFacing: !parkFacing })
                                    }}
                                />

                                <Chip
                                    label="Corner"
                                    className={chip}
                                    style={corner ? { backgroundColor: "#33c4ff" } : {
                                        backgroundColor: "white",
                                        color: '#33c4ff',
                                        border: "2px solid #33c4ff",
                                    }}
                                    onClick={() => {
                                        this.setState({ corner: !corner })
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Number of Bedrooms</InputLabel>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={["1", "2", "3", "4", "5"]}
                                    value={bedrooms}
                                    onChange={(e, value) => {
                                        this.setState({ bedrooms: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder="Number of Bedrooms"
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ bedrooms: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Number of Bathrooms</InputLabel>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={["1", "2", "3", "4", "5"]}
                                    value={bathrooms}
                                    onChange={(e, value) => {
                                        this.setState({ bathrooms: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder="Number of Bathrooms"
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ bathrooms: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Select Vehicle Space</InputLabel>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={["1", "2", "3", "4", "5"]}
                                    value={garage}
                                    onChange={(e, value) => {
                                        this.setState({ garage: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder="Select Vehicle Space"
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ garage: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Divider className={divider} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Society</InputLabel>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={
                                        societies.length > 0 && societies.map(el => el.name)
                                    }
                                    value={society}
                                    onChange={(e, value) => {
                                        let tempArr = [];
                                        societies.forEach(el => {
                                            if (el.name === value) {
                                                tempArr = el.sectors;
                                            }
                                        });
                                        this.setState({
                                            society: value,
                                            sectors: tempArr || [],
                                            sector: "",
                                            subSector: ""
                                        });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder="Society"
                                            size="small"
                                            onChange={(e) => {
                                                let tempArr = [];
                                                societies.forEach(el => {
                                                    if (el.name === e.target.value) {
                                                        tempArr = el.sectors;
                                                    }
                                                });
                                                this.setState({
                                                    society: e.target.value,
                                                    sectors: tempArr || [],
                                                    sector: "",
                                                    subSector: ""
                                                });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Select Sector/Block</InputLabel>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={
                                        sectors.length > 0 && sectors.map(el => el.name)
                                    }
                                    disabled={sectors.length <= 0}
                                    value={sector}
                                    onChange={(e, value) => {
                                        let tempArr = [];
                                        sectors.forEach(el => {
                                            if (el.name === value) {
                                                tempArr = el.subSectors;
                                            }
                                        });
                                        this.setState({
                                            sector: value,
                                            subSectors: tempArr || [],
                                            subSector: ""
                                        });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder="Select Sector/Block"
                                            size="small"
                                            onChange={(e) => {
                                                let tempArr = [];
                                                societies.forEach(el => {
                                                    if (el.name === e.target.value) {
                                                        tempArr = el.sectors;
                                                    }
                                                });
                                                this.setState({
                                                    sector: e.target.value,
                                                    subSectors: tempArr || [],
                                                    subSector: ""
                                                });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Select Sub Sector</InputLabel>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={
                                        subSectors.length > 0 && subSectors.map(el => el)
                                    }
                                    value={subSector}
                                    disabled={subSectors.length <= 0}
                                    onChange={(e, value) => {
                                        this.setState({ subSector: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder="Select Sub Sector"
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ subSector: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Town</InputLabel>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={["Gadap Town", "Taiser Town"]}
                                    value={town}
                                    onChange={(e, value) => {
                                        this.setState({ town: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder="Town"
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ town: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>City</InputLabel>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={["Karachi"]}
                                    value={city}
                                    onChange={(e, value) => {
                                        this.setState({ city: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder="Select City"
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ city: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Divider className={divider} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12}>
                                <InputLabel className={inputLabel}>Complete Address</InputLabel>
                                <TextField
                                    variant="outlined"
                                    placeholder="Complete Address"
                                    className={textField}
                                    InputProps={{
                                        classes: {
                                            notchedOutline: notchedOutline,
                                            focused: focused,
                                        },
                                    }}
                                    onChange={(e) => {
                                        this.setState({ completeAddress: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Demand</InputLabel>
                                <TextField
                                    variant="outlined"
                                    placeholder="Demand"
                                    className={textField}
                                    InputProps={{
                                        classes: {
                                            notchedOutline: notchedOutline,
                                            focused: focused,
                                        },
                                    }}
                                    onChange={(e) => {
                                        this.setState({ demand: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Reference</InputLabel>
                                <TextField
                                    variant="outlined"
                                    placeholder="Reference Name (if any)"
                                    className={textField}
                                    InputProps={{
                                        classes: {
                                            notchedOutline: notchedOutline,
                                            focused: focused,
                                        },
                                    }}
                                    onChange={(e) => {
                                        this.setState({ refernce: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Contact Number</InputLabel>
                                <TextField
                                    variant="outlined"
                                    placeholder="Contact Number"
                                    className={textField}
                                    InputProps={{
                                        classes: {
                                            notchedOutline: notchedOutline,
                                            focused: focused,
                                        },
                                    }}
                                    onChange={(e) => {
                                        this.setState({ contact: e.target.value });
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Divider className={divider} />
                        <div className={btnContainer}>
                            <Button
                                variant="contained"
                                className={btn}

                            >
                                Save
                            </Button>
                        </div>
                    </Paper>
                </Container>
            </Fragment>
        );
    }
}

export default withStyles(styles)(PropertyForm);