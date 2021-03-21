import React, { Fragment, Component } from 'react';
import { Container, Paper, Grid, withStyles, Divider, InputLabel, TextField, Button, IconButton, CircularProgress } from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddIcon from '@material-ui/icons/Add';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Swal from 'sweetalert2';
import Axios from 'axios';

import baseUrl from '../../../Util/baseUrl';
import ContextAPI from '../../../ContextAPI/ContextAPI';

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
    sectorsContainer: {
        padding: 10,
        backgroundColor: "#f5f5f5",
        height: 640,
        overflowY: "auto",
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        "&::-webkit-scrollbar": {
            display: 'none',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
        }
    },
    root: {
        paddingTop: 7
    }
});

class SocietyForm extends Component {

    state = {
        name: "",
        category: "Private",
        sector: "",
        sectors: [],
        subSector: "",
        town: "Gadap",
        city: "Karachi",
        district: "Malir",
        province: "Sindh",
        description: "",

        submitLoader: false,
        showSubSector: false

    }

    static contextType = ContextAPI;

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.getData();
        }
    }

    getData = () => {
        const { origin, data } = this.props;

        if (origin === "update" && data) {
            this.setState({
                name: data.name || "",
                category: data.category || "Private",
                sectors: [...data.sectors] || "",
                town: data.town || "Gadap",
                city: data.city || "Karachi",
                district: data.district || "Malir",
                province: data.province || "Sindh",
                description: data.description || ""
            })
        }
    }

    handleAddSectors = () => {
        const { sectors, sector } = this.state;
        const tempSectors = [...sectors];

        if (!tempSectors.filter(e => e.name === sector).length > 0) {
            tempSectors.push({ name: sector });
            this.setState({ sectors: tempSectors });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Already exist"
            })
        }
    }

    handleAddSubSectors = () => {
        const { sectors, sector, subSector } = this.state;
        const tempSectors = [...sectors];
        const tempIndex = tempSectors.findIndex(e => e.name === sector);

        if (tempIndex <= -1) {
            console.log("nahi hai")
        } else {
            console.log("hai");

            if (tempSectors[tempIndex].subSectors) {
                if (!tempSectors[tempIndex].subSectors.includes(subSector)) {
                    tempSectors[tempIndex].subSectors.push(subSector);
                    this.setState({ sectors: tempSectors })
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: "Already exist"
                    })
                }
            } else {
                let tempSubSectors = [];
                tempSubSectors.push(subSector);

                tempSectors[tempIndex].subSectors = [...tempSubSectors];
                this.setState({ sectors: tempSectors })
            }
        }
    }

    handleRemoveSector = index => {
        let tempSectors = [...this.state.sectors];

        tempSectors.splice(index, 1);
        this.setState({ sectors: tempSectors });
    }

    handleSave = () => {
        const { origin, data } = this.props;
        const {
            name,
            category,
            sectors,
            town,
            city,
            district,
            province,
            description
        } = this.state;
        let tempUrl = "";
        let tempData = {
            name,
            category,
            sectors,
            town,
            city,
            district,
            province,
            description
        };
        const { token } = this.context;

        this.setState({ submitLoader: true });

        if (origin === "update") {
            tempUrl = `${baseUrl}/society/update-society`;
            tempData.societyId = this.props.data._id;
        } else {
            tempUrl = `${baseUrl}/society/add-society`;
        }

        Axios({
            url: tempUrl,
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: tempData
        })
            .then(res => {
                this.setState({ submitLoader: false });
                Swal.fire({
                    icon: "success",
                    title: origin === "update" ? "Updated!" : "Saved!",
                    text: `${name} has been updated successfully.`
                }).then(() => {
                    this.props.history.push("/societies");
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({ submitLoader: false });
                if (err && err.response) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: `${err.response.data.message}`
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
            multilineTextField,
            sectorsContainer,
            root
        } = classes;

        const {
            name,
            category,
            sector,
            subSector,
            sectors,
            town,
            city,
            district,
            province,
            submitLoader,
            showSubSector

        } = this.state;

        return (
            <Fragment>
                <Container maxWidth="lg">
                    <Paper elevation={3} className={paper}>
                        <h1>{origin === "update" ? "Update Society" : "Add Society"}</h1>
                        <Divider className={divider} />
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={7}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <InputLabel className={inputLabel}>Society Name</InputLabel>
                                        <TextField
                                            variant="outlined"
                                            placeholder="Title of the property"
                                            className={textField}
                                            value={name}
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
                                                    onKeyPress={(e) => {
                                                        if (e.charCode === 13) {
                                                            this.handleAddSubSectors();
                                                        }
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
                                    <Grid item xs={12} sm={12} md={6}>
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
                                    <Grid item xs={12} sm={12} md={6}>
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
                                    <Grid item xs={12} sm={12} md={6}>
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
                                    <Grid item xs={12} sm={12} md={6}>
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
                                    <Grid item xs={12} sm={12} md={6}>
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
                                            placeholder="Description"
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
                                                this.setState({ description: e.target.value });
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={5}>
                                <InputLabel className={inputLabel}>Sector/Block Representation</InputLabel>
                                <div className={sectorsContainer}>
                                    <TreeView
                                        // className={classes.root}
                                        defaultCollapseIcon={<ExpandMoreIcon />}
                                        defaultExpandIcon={<ChevronRightIcon />}
                                    >
                                        {
                                            sectors.length > 0 && sectors.map((el, i) => {
                                                if (el.subSectors && el.subSectors.length > 0) {
                                                    return (
                                                        <Grid container spacing={1} key={i}>
                                                            <Grid item xs={9}>
                                                                <TreeItem
                                                                    classes={{
                                                                        root: root,
                                                                    }}
                                                                    nodeId={el.name}
                                                                    label={el.name}
                                                                >
                                                                    {
                                                                        el.subSectors.map((subEl, index) => (
                                                                            <TreeItem key={index} nodeId={subEl} label={subEl} />
                                                                        ))
                                                                    }
                                                                </TreeItem>
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <IconButton onClick={() => { this.handleRemoveSector(i) }}><ClearIcon style={{ fontSize: 16 }} /></IconButton>
                                                            </Grid>
                                                        </Grid>
                                                    )
                                                } else {
                                                    return (
                                                        <Grid container spacing={1} key={i}>
                                                            <Grid item xs={9}>
                                                                <TreeItem
                                                                    classes={{
                                                                        root: root,
                                                                    }}
                                                                    nodeId={el.name}
                                                                    label={el.name}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <IconButton onClick={() => { this.handleRemoveSector(i) }}><ClearIcon style={{ fontSize: 16 }} /></IconButton>
                                                            </Grid>
                                                        </Grid>
                                                    )
                                                }

                                            })
                                        }
                                    </TreeView>
                                </div>
                            </Grid>
                        </Grid>

                        <Divider className={divider} />
                        <div className={btnContainer}>
                            {
                                submitLoader ?
                                    <Button
                                        variant="contained"
                                        className={btn}
                                    >
                                        <CircularProgress style={{ color: '#0095FF', width: 25, height: 25 }} />
                                    </Button>
                                    :
                                    <Button
                                        variant="contained"
                                        className={btn}
                                        onClick={this.handleSave}
                                    >
                                        Save
                                    </Button>
                            }
                        </div>
                    </Paper>
                </Container>
            </Fragment>
        );
    }
}

export default withStyles(styles)(SocietyForm);