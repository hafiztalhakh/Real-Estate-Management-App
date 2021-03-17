import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Chip, Button, CircularProgress } from '@material-ui/core';
//React Router
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Swal from 'sweetalert2';

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
        width: "auto",
        backgroundColor: "#33c4ff",
        color: "#fff",
        fontWeight: "bold",
        textTransform: "capitalize",
        textDecoration: "none",
        boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        borderRadius: 2,
        cursor: "pointer",
        padding: "10px 20px",
        "&:hover": {
            backgroundColor: "#33c4ff",
            color: "#fff",
        },
    },
}));

function CustomTable(props) {
    const classes = useStyles();
    const { root, tableContainer, tableRow, tableCell, tableCellBody, btn } = classes;
    const { property, getData } = props;
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
        <Paper elevation={0} className={root}>
            <TableContainer className={tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={tableCell}>Property</TableCell>
                            <TableCell className={tableCell}>Location</TableCell>
                            <TableCell className={tableCell}>Area</TableCell>
                            <TableCell className={tableCell}>Demand</TableCell>
                            <TableCell className={tableCell}>Reference</TableCell>
                            <TableCell className={tableCell}>Contact Name</TableCell>
                            <TableCell className={tableCell}>Contact</TableCell>
                            <TableCell className={tableCell}>View</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            // let date = moment(row.payment_date).format("dddd, DD/MM/YY");
                            return (
                                <TableRow key={index} className={tableRow}>
                                    <TableCell className={tableCellBody}>{row.category} {row.type}</TableCell>
                                    <TableCell className={tableCellBody}>
                                        {
                                            row.subSector ? `${row.subSector}, ${row.society}` : row.sector ? `${row.sector}, ${row.society}` : `${row.society}`
                                        }
                                    </TableCell>
                                    <TableCell className={tableCellBody}>{row.area} yds</TableCell>
                                    <TableCell className={tableCellBody}>{row.demand}</TableCell>
                                    <TableCell className={tableCellBody}>{row.reference}</TableCell>
                                    <TableCell className={tableCellBody}>{row.referrer}</TableCell>
                                    <TableCell className={tableCellBody}>{row.contact}</TableCell>
                                    <TableCell className={tableCellBody}>
                                        <Link to={`/property/detail/${row._id}`} className={btn}>View</Link>
                                        {/* <span className={btn}>View</span> */}
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
        </Paper >
    );
}

export default withRouter(CustomTable);