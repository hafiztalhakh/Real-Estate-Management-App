import React, { Fragment, useState } from 'react';
import { Grid, makeStyles, Divider, InputLabel, TextField, Button, CircularProgress, Container } from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 300,
        padding: 10
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
        width: "100%",
        height: 45,
        backgroundColor: "#33c4ff",
        color: "#fff",
        fontWeight: "bold",
        "&:hover": {
            backgroundColor: "#33c4ff",
            color: "#fff",
        },
    },
}));

export default function CustomCard(props) {
    const classes = useStyles();
    const {
        root,
        inputLabel,
        textField,
        autoCompleteTextField,
        btn
    } = classes;
    const { societies, getData } = props;
    const [type, setType] = useState("");
    const [fileType, setFileType] = useState("");
    const [areaCategory, setAreaCatergory] = useState("");
    const [sectors, setSectors] = useState([]);
    const [society, setSociety] = useState("");
    const [sector, setSector] = useState("");

    console.log(societies);

    return (
        <div className={root}>

            <InputLabel className={inputLabel}>Type</InputLabel>
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
                            setType(e.target.value);
                        }}
                    />
                )}
            />

            <InputLabel className={inputLabel}>File Type</InputLabel>
            <Autocomplete
                className={autoCompleteTextField}
                options={["Lease", "Transfer", "Open Transfer"]}
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
                            setFileType(e.target.value);
                        }}
                    />
                )}
            />

            <InputLabel className={inputLabel}>Area Category</InputLabel>
            <Autocomplete
                className={autoCompleteTextField}
                options={["80 yards", "120 yards", "200 yards", "240 yards", "400 yards", "600 yards"]}
                value={areaCategory}
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
                            setAreaCatergory(e.target.value);
                        }}
                    />
                )}
            />

            <InputLabel className={inputLabel}>Society</InputLabel>
            <Autocomplete
                className={autoCompleteTextField}
                options={
                    societies.length > 0 ? societies.map(el => el.name) : []
                }
                value={society}
                onChange={(e, value) => {
                    let tempArr = [];
                    societies.forEach(el => {
                        if (el.name === value) {
                            tempArr = el.sectors;
                        }
                    });
                    setSociety(value)
                    if (tempArr.length > 0) {
                        setSectors(tempArr);
                    }
                    setSector("");
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
                            setSociety(e.target.value)
                            if (tempArr.length > 0) {
                                setSectors(tempArr);
                            }
                            setSector("");
                        }}
                    />
                )}
            />

            <InputLabel className={inputLabel}>Sectors</InputLabel>
            <Autocomplete
                className={autoCompleteTextField}
                options={
                    sectors.length > 0 ? sectors.map(el => el.name) : []
                }
                disabled={sectors.length <= 0}
                value={sector}
                onChange={(e, value) => {
                    setSector(value);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        className={textField}
                        variant="outlined"
                        placeholder="Select Sector/Block"
                        size="small"
                        onChange={(e) => {
                            setSector(e.target.value)
                        }}
                    />
                )}
            />

            <Divider style={{ margin: "10px 0" }} />

            <InputLabel className={inputLabel}>Sectors</InputLabel>
            <Autocomplete
                className={autoCompleteTextField}
                options={["80 yards", "120 yards", "200 yards", "240 yards", "400 yards", "600 yards"]}
                value={areaCategory}
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
                            setAreaCatergory(e.target.value);
                        }}
                    />
                )}
            />
            <Autocomplete
                className={autoCompleteTextField}
                options={["80 yards", "120 yards", "200 yards", "240 yards", "400 yards", "600 yards"]}
                value={areaCategory}
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
                            setAreaCatergory(e.target.value);
                        }}
                    />
                )}
            />

            <Button
                variant="contained"
                className={btn}
            // onClick={this.handleSave}
            >
                Apply Filters
            </Button>

        </div >
    )
}