import React, { Fragment } from 'react';
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
}));

export default function CustomCard(props) {
    const classes = useStyles();
    const {
        root,
        inputLabel,
        textField,
        multilineTextField,
        notchedOutline,
        focused,
        autoCompleteTextField,
        btn
    } = classes;
    const { data, getData } = props;

    return (
        <div className={root}>

            <InputLabel className={inputLabel}>Select Type*</InputLabel>
            <Autocomplete
                className={autoCompleteTextField}
                options={["Plot", "House", "Flat", "Building", "Structure"]}
                // value={type}
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

            <InputLabel className={inputLabel}>Select Sector*</InputLabel>
            <Autocomplete
                className={autoCompleteTextField}
                options={["Lease", "Transfer", "Open Transfer"]}
                // value={fileType}
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
        </div>
    )
}