import React, { Fragment, useContext, useState } from 'react';
import { Container, Grid, makeStyles, TextField, InputLabel, Button, CircularProgress, Paper } from '@material-ui/core';
import Axios from 'axios';
import Swal from 'sweetalert2';

import baseUrl from '../../Util/baseUrl';
import logo from '../../Assets/Images/logo1.png';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    paper: {
        padding: 30,
        borderRadius: 10,
        [theme.breakpoints.down('sm')]: {
            padding: 0,
            boxShadow: 'none'
        },
    },
    imgContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    },
    img: {
        width: '50%'
    },
    form: {
        display: 'block',
        textAlign: 'center'
    },
    title: {
        marginTop: 0,
        textDecoration: 'underline',
        fontFamily: '"Fondamento",cursive',
        [theme.breakpoints.down('sm')]: {
            fontSize: 24
         }
    },
    text: {
        marginTop: 0,
        fontFamily: 'ui-serif'
    },
    inputLabel: {
        margin: '10px 0px',
        fontWeight: 500,
        textAlign: 'left'
    },
    textField: {
        backgroundColor: '#f8f8f8',
        color: 'black',
        marginBottom: 15,
        width: '100%',
        border: 'none',
        borderRadius: 50,
        '&:hover': {
            "& $notchedOutline": {
                border: 'none',
                borderRadius: 25,
            }
        },
    },
    notchedOutline: {
        border: 'none',
        '&:hover': {
            border: 'none',
            borderRadius: 25,
        },
    },
    focused: {
        "& $notchedOutline": {
            border: 'none',
            borderRadius: 25,
        }
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        margin: '15px 0'
    },
    btn: {
        color: 'white',
        backgroundColor: '#33c4ff',
        width: '90%',
        padding: '10px 15px',
        borderRadius: 25,
        "&:hover": {
            color: 'white',
            backgroundColor: '#33c4ff',
        }
    },
    circularProgress: {
        color: '#fff',
        width: '30px !important',
        height: '30px !important',
        position: 'absolute',
        zIndex: 9999,
    }
}));

export default function Login(props) {
    const { loginHandler } = props;
    const { root, paper, imgContainer, img, form, title, text, inputLabel, textField, notchedOutline, focused, btnContainer, btn, circularProgress } = useStyles();
    const [credentials, setCredentials] = useState({});
    const [loader, setLoader] = useState(false);

    const handleLogin = () => {
        setLoader(true);

        Axios({
            url: `${baseUrl}/auth/admin-login`,
            method: "POST",
            data: credentials
        }).then(res => {
            setLoader(false);
            if (res.status === 200) {
                loginHandler({
                    token: res.data.token,
                    user: res.data.admin
                });
            }
        }).catch(err => {
            if (err && err.response) {
                setLoader(false);
                Swal.fire({
                    icon: 'error',
                    title: `${err.response.data.message}`
                });
            }
        })
    }

    return (
        <Container maxWidth="sm" className={root}>
            <Paper elevation={3} className={paper}>
                <div className={imgContainer}>
                    <img src={logo} alt="logo" className={img} />
                </div>

                <div className={form}>
                    <h1 className={title}>Shaheer Enterprises Portal</h1>
                    <p className={text}>Enter valid username & password to login your Account</p>
                    <div style={{ height: 20 }} />

                    <InputLabel className={inputLabel}>Username</InputLabel>
                    <TextField
                        variant="outlined"
                        // size="small"
                        placeholder="Username"
                        onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                        className={textField}
                        InputProps={{
                            classes: {
                                notchedOutline: notchedOutline,
                                focused: focused,
                            }
                        }}
                    />
                    <InputLabel className={inputLabel}>Password</InputLabel>
                    <TextField
                        variant="outlined"
                        // size="small"
                        placeholder="Password"
                        type="password"
                        onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                        className={textField}
                        InputProps={{
                            classes: {
                                notchedOutline: notchedOutline,
                                focused: focused,
                            }
                        }}
                        onKeyPress={(e) => {
                            if (e.charCode === 13)
                                handleLogin()
                        }}
                    />
                    <div className={btnContainer}>
                        {
                            loader ?
                                <Button variant="contained" className={btn}>Login <CircularProgress className={circularProgress} /></Button>
                                :
                                <Button variant="contained" className={btn} onClick={handleLogin}> Login</Button>
                        }
                    </div>
                </div>
            </Paper>
        </Container>
    )
}