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
    multilineTextField: {
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
        category: "Private",
        sector: "",
        sectors: [],
        subSector: "",
        subSectors: [],
        town: "Gadap",
        city: "Karachi",
        district: "Malir",
        province: "Sindh",
        description: "",

        submitLoader: false,
        showSubSector: false

    }

    handleAddSectors = () => {
        const { sectors, sector } = this.state;
        const tempSectors = [...sectors];

        if (!tempSectors.filter(e => e.name === sector).length > 0) {
            tempSectors.push({ name: sector });
            this.setState({ sectors: tempSectors, sector: "" });
        } else {
            alert("already exist")
        }
    }

    handleAddSubSectors = () => {
        const { sectors, subSector } = this.state;
        const tempSectors = [...sectors];

        const lastElement = tempSectors.slice(-1);
        lastElement[0].subSectors = []

        
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
            multilineTextField,
        } = this.props.classes;

        const {
            category,
            sector,
            subSector,
            society,
            town,
            city,
            district,
            province,
            submitLoader,
            showSubSector

        } = this.state;
        console.log(this.state.sectors)

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
                                        this.setState({ name: e.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}></Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={7}>
                                <Grid container spacing={1}>
                                    <Grid item xs={9}>
                                        <InputLabel className={inputLabel}>Sector/Block</InputLabel>
                                        <TextField
                                            variant="outlined"
                                            placeholder="Enter Sector/Block"
                                            className={textField}
                                            value={sector}
                                            InputProps={{
                                                classes: {
                                                    notchedOutline: notchedOutline,
                                                    focused: focused,
                                                },
                                            }}
                                            onChange={(e) => {
                                                this.setState({ sector: e.target.value });
                                            }}
                                            onKeyPress={(e) => {
                                                if (e.charCode === 13) {
                                                    this.handleAddSectors();
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button
                                            variant="contained"
                                            className={btn}
                                            style={{ marginTop: 20, width: "auto" }}
                                            onClick={this.handleAddSectors}
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
                                            <Grid item xs={9}>
                                                <InputLabel className={inputLabel}>Sub-Sector</InputLabel>
                                                <TextField
                                                    variant="outlined"
                                                    placeholder="Enter Sub-Sector"
                                                    className={textField}
                                                    value={subSector}
                                                    InputProps={{
                                                        classes: {
                                                            notchedOutline: notchedOutline,
                                                            focused: focused,
                                                        },
                                                    }}
                                                    onChange={(e) => {
                                                        this.setState({ subSector: e.target.value });
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button
                                                    variant="contained"
                                                    className={btn}
                                                    style={{ marginTop: 20, width: "auto" }}
                                                    onClick={this.handleAddSubSectors}
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
                        <Divider className={divider} />

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Category</InputLabel>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={["Public", "Private"]}
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
                                <InputLabel className={inputLabel}>Town</InputLabel>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={[
                                        "Baldia Town",
                                        "Bin Qasim Town",
                                        "Gadap Town",
                                        "Gulberg Town",
                                        "Gulshan Town",
                                        "Jamshed Town",
                                        "Kiamari Town",
                                        "Korangi Town",
                                        "Landhi Town",
                                        "Liaquatabad Town",
                                        "Lyari Town",
                                        "Malir Town",
                                        "New Karachi Town",
                                        "North Nazimabad Town",
                                        "Orangi Town",
                                        "Saddar Town",
                                        "Shah Faisal Town",
                                        "SITE Town",
                                        "Taiser Town"
                                    ]}
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
                                    options={["Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta", "Faislabad", "Multan", "Hyderabad"]}
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
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>District</InputLabel>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={["Karachi Central", "Malir", "Karachi East", "Karachi West", "Karachi South"]}
                                    value={district}
                                    onChange={(e, value) => {
                                        this.setState({ district: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder="Select District"
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ district: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InputLabel className={inputLabel}>Select Province</InputLabel>
                                <Autocomplete
                                    className={autoCompleteTextField}
                                    options={["Sindh", "Punjab", "Balochistan", "Khyber Pakhtunkhuwah"]}
                                    value={province}
                                    onChange={(e, value) => {
                                        this.setState({ province: value });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={textField}
                                            variant="outlined"
                                            placeholder="Select Province"
                                            size="small"
                                            onChange={(e) => {
                                                this.setState({ province: e.target.value });
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Divider className={divider} />
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputLabel className={inputLabel}>Description</InputLabel>
                                <TextField
                                    variant="outlined"
                                    placeholder="Contact Number"
                                    className={multilineTextField}
                                    multiline
                                    rows={4}
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