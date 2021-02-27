import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Chip, Button, CircularProgress, IconButton } from '@material-ui/core';

import Dialog from './Modal';

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
        "&:hover": {
            color: '#09926E',
            backgroundColor: '#f5f5f5',
        }
    },
    tableCell: {
        fontFamily: 'inherit',
        backgroundColor: '#33c4ff',
        color: 'white',
        textAlign: 'left',
        fontWeight: 'bold',

    },
    tableCellBody: {
        textAlign: 'left',
    }
}));

export default function CustomTable(props) {
    const { property, getData } = props;
    const classes = useStyles();
    const { tableCell, tableCellBody } = classes;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setrows] = useState([]);

    React.useEffect(() => {
        setrows(property);
    }, [property]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper elevation={0} className={classes.root}>
            <TableContainer className={classes.tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={tableCell}>Name</TableCell>
                            <TableCell className={tableCell}>Category</TableCell>
                            <TableCell className={tableCell}>Town</TableCell>
                            <TableCell className={tableCell}>City</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            return (
                                <TableRow key={index} className={classes.tableRow}>
                                    <TableCell className={tableCellBody}>
                                        <Dialog societyId={row._id} getData={getData}>
                                            {row.name}
                                        </Dialog>
                                    </TableCell>
                                    <TableCell className={tableCellBody}>{row.category}</TableCell>
                                    <TableCell className={tableCellBody}>{row.town}</TableCell>
                                    <TableCell className={tableCellBody}>{row.city}</TableCell>
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
        </Paper >
    );
}