import React, { Component } from 'react';
import { Container, Paper, Grid, withStyles, Divider, InputLabel, TextField, Button, IconButton, CircularProgress, Typography } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';
import Axios from 'axios';

import baseUrl from '../../../Util/baseUrl';
import ContextAPI from '../../../ContextAPI/ContextAPI';

const styles = theme => ({
    paper: {
        padding: "0 10px",
        backgroundColor: "#fff",
        borderRadius: 10,
        // [theme.breakpoints.down('sm')]: {
        //     padding: 0,
        //     boxShadow: "none",
        // },
        marginTop: 50
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
            // height: 45,
            border: "none",
            backgroundColor: "transparent",
            padding: 0
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
            padding: 0
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
        justifyContent: "space-between",
        paddingBottom: 20
    },
    btn: {
        width: 100,
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
    icons: {
        color: '#676358'
    }
});

class ComposeEmail extends Component {

    state = {
        message: "",

        submitLoader: false,
        showSubSector: false

    }

    static contextType = ContextAPI;

    handleSubmit = () => {
        const { email } = this.props;
        const { message } = this.state;
        const { token } = this.context;

        this.setState({ submitLoader: true });

        Axios({
            url: `${baseUrl}/message/post-reply`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                email,
                message
            }
        })
            .then(res => {
                this.setState({ submitLoader: false });
                Swal.fire({
                    icon: "success",
                    text: "Sent!"
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
        const { classes, email, hideForm } = this.props;
        const {
            paper,
            textField,
            notchedOutline,
            focused,
            btnContainer,
            btn,
            multilineTextField,
            icons
        } = classes;

        const { submitLoader } = this.state;

        return (
            <Paper elevation={3} className={paper}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography style={{ color: '#c6bdbd' }}>{email}</Typography>
                        {/* <TextField
                            variant="outlined"
                            className={textField}
                            value={email}
                            disabled
                            InputProps={{
                                classes: {
                                    notchedOutline: notchedOutline,
                                    focused: focused,
                                },
                            }}
                            onChange={(e) => {
                                this.setState({ email: e.target.value });
                            }}
                        /> */}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            placeholder="type hrer..."
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

                <div className={btnContainer}>
                    <IconButton onClick={this.handleSubmit}>
                        <SendIcon className={icons} style={{ color: '#33c4ff' }} />
                    </IconButton>
                    <IconButton onClick={hideForm}>
                        <DeleteIcon className={icons} />
                    </IconButton>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(ComposeEmail);