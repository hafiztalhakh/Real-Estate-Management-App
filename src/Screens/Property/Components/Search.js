import React, { Fragment, useState } from 'react';
import { makeStyles, Divider, Paper, InputBase, IconButton, Menu } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

import FilterOptions from './Filters';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 500,
        marginBottom: 20,
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
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
    const { searchHandler, clearHandler, societies, filterHandler } = props;
    const [query, setQuery] = useState("");
    const [showClear, setShowClear] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const {
        root,
        iconButton,
        input,
        // divider
    } = classes;

    const handleChangeSearch = (e) => {
        setQuery(e.target.value);

        if (!e.target.value.length > 0)
            setShowClear(true);
        else
            setShowClear(false);
    }

    const handleClearSearch = () => {
        setQuery("");
        clearHandler();
        setShowClear(false);
    }

    const handleShowMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    return (
        <Paper elevation={3} className={root}>
            <IconButton className={iconButton} onClick={handleShowMenu}>
                <MenuIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <FilterOptions
                    societies={societies}
                    filterHandler={filterHandler}
                    menuCloseHandler={handleCloseMenu}
                />
            </Menu>

            <InputBase
                className={input}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search google maps' }}
                value={query}
                onChange={handleChangeSearch}
                onKeyPress={e => {
                    if (e.charCode === 13) {
                        searchHandler(query);
                        setShowClear(true);
                    }
                }}
            />
            <IconButton className={iconButton} onClick={!showClear > 0 ? () => { searchHandler(query); setShowClear(true); } : handleClearSearch}>
                {
                    !showClear > 0 ?
                        <SearchIcon />
                        :
                        <ClearIcon />
                }
            </IconButton>
            {/* <Divider className={divider} orientation="vertical" />
            <IconButton className={iconButton} onClick={clearHandler}>
                <ClearIcon />
            </IconButton> */}
        </Paper>
    );
}