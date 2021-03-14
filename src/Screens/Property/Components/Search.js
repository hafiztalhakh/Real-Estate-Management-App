import React, { Fragment, useState } from 'react';
import { makeStyles, Divider, Paper, InputBase, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 500,
        marginBottom: 20
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function Search(props) {
    const { searchHandler, clearHandler } = props;
    const [query, setQuery] = useState(null);
    const classes = useStyles();
    const {
        root,
        iconButton,
        input,
        divider
    } = classes;

    const handleChangeSearch = (e) => {
        setQuery(e.target.value);
    }

    return (
        <Paper elevation={3} className={root}>
            <IconButton className={iconButton} aria-label="menu">
                <MenuIcon />
            </IconButton>
            <InputBase
                className={input}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={handleChangeSearch}
                onKeyPress={e => {
                    if (e.charCode === 13)
                        searchHandler(query)
                }}
            />
            <IconButton className={iconButton} onClick={() => searchHandler(query)}>
                <SearchIcon />
            </IconButton>
            <Divider className={divider} orientation="vertical" />
            <IconButton className={iconButton} onClick={clearHandler}>
                <ClearIcon />
            </IconButton>
        </Paper>
    );
}