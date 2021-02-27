import React, { Fragment, Component } from 'react';
import { Container, Paper, Grid, withStyles, Divider, InputLabel, TextField, Button, Chip } from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddIcon from '@material-ui/icons/Add';


const styles = theme => ({
    paper: {
        padding: "30px 40px 40px 40px",
        backgroundColor: "#fff",
        borderRadius: 10,
        [theme.breakpoints.down('sm')]: {
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

class AddSociety extends Component {

    state = {
        name: "",
        category: "",
        sectors: [],
        subSectors: [],
        town: "Gadap",
        city: "Karachi",
        district: "",
        province: "",
        description: "",

        submitLoader: false,
        showSubSector: false

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
            btn,
            chip,
        } = this.props.classes;

        const {
            category,
            sector,
            subSector,
            society,
            town,
            city,
            submitLoader,
            showSubSector

        } = this.state;


        return (
            <Fragment>
                <Container maxWidth="lg">
                    <Paper elevation={3} className={paper}>
                        <h1>Add Society</h1>
                        <Divider className={divider} />

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6}>
                                <InputLabel className={inputLabel}>Society Name</InputLabel>
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
                                        this.setState({ patientLis: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}></Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={7}>
                                <Grid container spacing={1}>
                                    <Grid item xs={9} sm={8}>
                                        <InputLabel className={inputLabel}>Sector/Block</InputLabel>
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
                                                this.setState({ patientLis: e.target.value });
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={3} sm={4}>
                                        <Button
                                            variant="contained"
                                            className={btn}
                                            style={{ marginTop: 20, width: "auto" }}
                                        >
                                            <AddIcon />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {
                                            <span
                                                onClick={() => {
                                                    this.setState({ showSubSector: !showSubSector })
                                                }}
                                                style={!showSubSector ? { color: "#33C4FF", cursor: "pointer" } : { color: "red", cursor: "pointer" }}
                                            >
                                                {
                                                    !showSubSector ? "Add Sub-sector" : "Undo"
                                                }
                                            </span>
                                        }
                                    </Grid>
                                    {
                                        showSubSector &&
                                        <Fragment>
                                            <Grid item xs={9} sm={8}>
                                                <InputLabel className={inputLabel}>Sector/Block</InputLabel>
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
                                                        this.setState({ patientLis: e.target.value });
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={3} sm={4}>
                                                <Button
                                                    variant="contained"
                                                    className={btn}
                                                    style={{ marginTop: 20, width: "auto" }}
                                                >
                                                    <AddIcon />
                                                </Button>
                                            </Grid>
                                        </Fragment>
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={5}>
                                <ul>
                                    <li>Sector1
                                        <ul>
                                            <li>sub sector 1</li>
                                            <li>sub sector 1</li>
                                            <li>sub sector 1</li>
                                            <li>sub sector 1</li>
                                        </ul>
                                    </li>
                                    <li>Sector1</li>
                                    <li>Sector1</li>
                                    <li>Sector1</li>
                                    <li>Sector1</li>
                                </ul>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Society</InputLabel>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={["Gulshane-e-Maymar", "Garden City", "Diamond City", "Taiser", "Mashriqui Society", "Attawa Society"]}
                                    value={society}
                                    onChange={(e, value) => {
                                        this.setState({ society: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder="Society"
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ society: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Select Sector/Block</InputLabel>
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
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Select Sub Sector</InputLabel>
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

export default withStyles(styles)(AddSociety);