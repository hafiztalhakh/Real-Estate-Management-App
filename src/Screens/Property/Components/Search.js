import React, { Fragment, useState } from 'react';
import { makeStyles, Divider, InputLabel, TextField, Button, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        justifyContent: "space-between"
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
    const { data, getData } = props;
    const [query, setQuery] = useState(null);
    const classes = useStyles();
    const {
        container,
        inputLabel,
        textField,
        notchedOutline,
        focused,
        btn
    } = classes;

    return (

        <div className={container}>
            <Fragment>
                <InputLabel className={inputLabel}>Search</InputLabel>
                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    className={textField}
                    value={query}
                    InputProps={{
                        classes: {
                            notchedOutline: notchedOutline,
                            focused: focused,
                        },
                    }}
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                />
            </Fragment>
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
    )
}