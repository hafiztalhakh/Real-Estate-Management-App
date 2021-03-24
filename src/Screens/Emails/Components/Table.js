import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Chip, Button, CircularProgress, IconButton, Divider } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    root: {
        width: '99%',
    },
    tableContainer: {
        fontFamily: 'inherit',
        // maxHeight: 400,
    },
    tableRow: {
        cursor: "pointer",
        "&:hover": {
            backgroundColor: '#f5f5f5',
            boxShadow: "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
        }
    },
    tableRowUnRead: {
        fontWeight: "bold",
        cursor: "pointer",
        width: "100%",
        "&:hover": {
            backgroundColor: '#f5f5f5',
            boxShadow: "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
        }
    },
    tableCell: {
        textAlign: 'left',
        padding: 10,
        fontWeight: 'inherit'

    },
    tableCell2: {
        textAlign: 'left',
        padding: 10,
        fontWeight: 'inherit',
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "no-wrap",
        // width: "60%"
    }
}));

export default function CustomTable(props) {
    const { messages, history } = props;
    const classes = useStyles();
    const { tableRow, tableRowUnRead, tableCell, tableCell2 } = classes;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setrows] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    useEffect(() => {
        setrows(messages);
    }, [messages]);

    // useEffect(() => {
    //     window.addEventListener("resize", updateDimensions);
    //     return () => window.removeEventListener("resize", updateDimensions);
    // }, []);

    // const updateDimensions = () => {
    //     setWidth(window.innerWidth);
    //     setHeight(window.innerHeight);
    // }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className={classes.root}>

            <TableContainer className={classes.tableContainer}>
                <Divider />
                <Table className="inbox">
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            return (
                                <TableRow key={index} className={row.isRead ? tableRow : tableRowUnRead} onClick={() => history.push(`/mail/${row._id}`)}>
                                    <TableCell className={`${tableCell} sender`}>{row.name}</TableCell>
                                    <TableCell className={`${tableCell} content`}>{row.message} </TableCell>
                                    <TableCell className={`${tableCell} date`}>
                                        {
                                            moment().format("DD-MM-YYYY") === moment(row.createdAt).format("DD-MM-YYYY") ?
                                                moment(row.createdAt).format("hh:mm")
                                                :
                                                moment(row.createdAt).format("DD MMM")
                                        }
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15, 20]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}