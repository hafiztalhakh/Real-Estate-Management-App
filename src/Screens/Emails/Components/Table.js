import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Chip, Button, CircularProgress, IconButton, Divider } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    tableContainer: {
        fontFamily: 'inherit',
        // maxHeight: 400,
    },
    tableRow: {
        cursor: "pointer",
        backgroundColor: '#f5f5f5',
        "&:hover": {
            boxShadow: "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
        }
    },
    tableRowUnRead: {
        fontWeight: "bold",
        cursor: "pointer",
        backgroundColor: '#fff',
        "&:hover": {
            boxShadow: "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
        }
    },
    tableCell: {
        textAlign: 'left',
        padding: 10,
        fontWeight: 'inherit'

    }
}));

export default function CustomTable(props) {
    const { messages, getData } = props;
    const classes = useStyles();
    const { tableRow, tableRowUnRead, tableCell } = classes;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setrows] = useState([]);

    React.useEffect(() => {
        setrows(messages);
    }, [messages]);

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
                <Table>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            return (
                                <TableRow key={index} className={row.isRead ? tableRow : tableRowUnRead}>
                                    <TableCell className={tableCell} style={{ width: 170 }}>
                                        {
                                            row.name.length > 15 ?
                                                `${row.name.slice(0, 16)}...`
                                                :
                                                row.name
                                        }
                                    </TableCell>
                                    <TableCell className={tableCell}>
                                        {
                                            row.message.length > 120 ?
                                                `${row.message.slice(0, 120)}...`
                                                :
                                                row.message
                                        }
                                    </TableCell>
                                    <TableCell className={tableCell}>
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