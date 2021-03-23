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
        width: "100%",
        "&:hover": {
            "& $notchedOutline": {
                border: "none",
            },
        },
        "& .MuiOutlinedInput-root": {
            height: 45,
            border: "none",
            backgroundColor: "transparent",
        }
    },
    multilineTextField: {
        backgroundColor: "transparent",
        marginBottom: 10,
        width: "100%",
        "&:hover": {
            "& $notchedOutline": {
                border: "none",
            },
        },
        "& .MuiOutlinedInput-root": {
            border: "none",
            backgroundColor: "transparent",
        }
    },
    notchedOutline: {
        border: "none",
        "&:hover": {
            border: "none",
        },
    },
    focused: {
        "& $notchedOutline": {
            border: "none",
        },
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

});

class ComposeEmail extends Component {

    state = {
        email: "",
        subject: "",
        message: "",

        submitLoader: false,
        showSubSector: false

    }

    static contextType = ContextAPI;

    handleSave = () => {
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
        const { token } = this.context;

        this.setState({ submitLoader: true });

        Axios({
            url: `${baseUrl}/society/add-society`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {

            }
        })
            .then(res => {
                this.setState({ submitLoader: false });
                Swal.fire({
                    icon: "success",
                    text: "Sent!"
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
        const { origin, classes, email } = this.props;
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

        const { submitLoader } = this.state;

        return (
            <Fragment>
                <br />
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            placeholder="Title of the property"
                            className={textField}
                            value={email}
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
                    <Grid item xs={12}>
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
            </Fragment >
        );
    }
}

export default withStyles(styles)(ComposeEmail);