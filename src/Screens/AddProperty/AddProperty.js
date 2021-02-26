import React, { Fragment, Component } from 'react';
import { Container, Paper, Grid, withStyles, Divider, InputLabel, TextField, Button } from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";

const styles = theme => ({
    paper: {
        padding: "30px 40px 40px 40px",
        backgroundColor: "#fff",
        borderRadius: 10,
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
            border: 'none'
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: 'none'
        },
        "& .MuiOutlinedInput-root": {
            // borderRadius: 0,
            backgroundColor: '#f5f5f5',
            height: 41
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
        backgroundColor: "#33c4ff",
        color: "#000",
        fontWeight: "bold",
        "&:hover": {
            backgroundColor: "#33c4ff",
            color: "#000",
        },
    },
    divider: {
        marginTop: 15,
        marginBottom: 30
    }
});

class AddProperty extends Component {

    state = {
        title: "",
        category: "",
        type: "",
        bedrooms: "",
        bathrooms: "",
        garage: "",
        sector: "",
        subSector: "",
        condition: "",
        parkFacing: "",
        corner: "",
        areaCategory: "",
        area: "",
        roadWidth: "",
        location: "",
        town: "",
        city: "",
        completeAddress: "",
        demand: "",
        source: "",

        submitLoader: false

    }

    render() {
        const {
            paper,
            inputLabel,
            textField,
            notchedOutline,
            focused,
            autoCompleteTextField,
            divider,
            btnContainer,
            btn
        } = this.props.classes;

        const {
            title,
            category,
            type,
            bedrooms,
            bathrooms,
            garage,
            sector,
            subSector,
            condition,
            parkFacing,
            corner,
            areaCategory,
            area,
            roadWidth,
            location,
            town,
            city,
            completeAddress,
            demand,
            source,

            submitLoader,

        } = this.state;

        return (
            <Fragment>
                <Container maxWidth="lg">
                    <Paper elevation={3} className={paper}>
                        <h1>Add Property</h1>
                        <Divider className={divider} />

                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={6}>
                                <InputLabel className={inputLabel}>
                                    Title
                                </InputLabel>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    placeholder="Title of the property"
                                    className={textField}
                                    InputProps={{
                                        classes: {
                                            notchedOutline: notchedOutline,
                                            focused: focused,
                                        },
                                    }}
                                    onChange={(e) => {
                                        this.setState({ patientLis: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}></Grid>
                            <Grid item xs={12} sm={12} md={6}>
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
                            <Grid item xs={12} sm={12} md={6}>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={["Lease", "Transfer"]}
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
                            <Grid item xs={12} sm={12} md={6}>
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
                            <Grid item xs={12} sm={12} md={6}>
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
                            <Grid item xs={12} sm={12} md={6}>
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
                            <Grid item xs={12} sm={12} md={6}>
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
                            <Grid item xs={12} sm={12} md={6}>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={["Sector P", "Sector Q", "Sector R", "Sector S"]}
                                    value={sector}
                                    onChange={(e, value) => {
                                        this.setState({ sector: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder="Select Sector/Block"
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ sector: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={["P", "Q-1", "R-1", "S-1"]}
                                    value={subSector}
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
                            {/* <Grid item xs={12} sm={12} md={6}>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={[]}
                                    value={ }
                                    onChange={(e, value) => {
                                        this.setState({ category: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder=""
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ category: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={[]}
                                    value={ }
                                    onChange={(e, value) => {
                                        this.setState({ category: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder=""
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ category: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={[]}
                                    value={ }
                                    onChange={(e, value) => {
                                        this.setState({ category: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder=""
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ category: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={[]}
                                    value={ }
                                    onChange={(e, value) => {
                                        this.setState({ category: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder=""
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ category: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={[]}
                                    value={ }
                                    onChange={(e, value) => {
                                        this.setState({ category: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder=""
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ category: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid> */}


                        </Grid>

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

export default withStyles(styles)(AddProperty);