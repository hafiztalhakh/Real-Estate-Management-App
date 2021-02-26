import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Chip, Button, CircularProgress } from '@material-ui/core';
//React Router
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Swal from 'sweetalert2';

// import Dialog from './Modal';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    tableContainer: {
        fontFamily: 'inherit',
        // maxHeight: 400,
    },
    tableRow: {
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
    },
    idCell: {
        textAlign: 'rigth',
        color: 'green'
    },
    btn: {
        backgroundColor: '#09926E',
        color: '#fff',
        fontWeight: 'bold',
        "&:hover": {
            backgroundColor: '#09926E',
        }
    },
}));

function CustomTable(props) {
    const classes = useStyles();
    const { donationList } = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setrows] = useState([]);


    React.useEffect(() => {
        //storing data in state
        setrows([{
            area: "240 yds",
            demand: "5,00,000",
            contact: "03331234567",
            reference: "Saghir Estate",
        },
        {
            area: "240 yds",
            demand: "5,00,000",
            contact: "03331234567",
            reference: "Saghir Estate",
        },
        {
            area: "240 yds",
            demand: "5,00,000",
            contact: "03331234567",
            reference: "Saghir Estate",
        }]);
    }, [donationList]);

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
                            <TableCell className={classes.tableCell}>Area</TableCell>
                            <TableCell className={classes.tableCell}>Demand</TableCell>
                            <TableCell className={classes.tableCell}>Person Contact</TableCell>
                            <TableCell className={classes.tableCell}>Reference</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            // let date = moment(row.payment_date).format("dddd, DD/MM/YY");
                            return (
                                <TableRow key={index} className={classes.tableRow}>
                                    <TableCell className={classes.tableCellBody}>{row.area}</TableCell>
                                    <TableCell className={classes.tableCellBody}>{row.demand}</TableCell>
                                    <TableCell className={classes.tableCellBody}>{row.contact}</TableCell>
                                    <TableCell className={classes.tableCellBody}>{row.reference}</TableCell>
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

export default withRouter(CustomTable);