import React from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { ViewList as ViewListIcon } from '@material-ui/icons';

const DataTable = () => {
    const [data, setData] = React.useState([]);
    const [selectedRowData, setSelectedRowData] = React.useState<any>(null);
    const [open, setOpen] = React.useState(false);
    let userData:any = localStorage.getItem("userData");
    userData = JSON.parse(userData);
    React.useEffect(() => {
        const fetchData = async () => {
            let obj = {_id:userData._id,role:userData.role}
            try {
                const response = await axios.post('http://localhost:3000/organization/get', obj,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log("my response",response)
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [data]);

    const columns:any = React.useMemo(
        () => [
            { Header: 'Name', accessor: 'name' },
            { Header: 'Description', accessor: 'description' },
            { Header: 'Location', accessor: 'location' },
            { Header: 'Website', accessor: 'website' },
            {
                Header: 'Actions',
                Cell: ({ row }:any) => (
                    <IconButton onClick={() => handleView(row.original)}>
                        <ViewListIcon />
                    </IconButton>
                )
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data });

    const handleView = (rowData:any) => {
        setSelectedRowData(rowData);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {rows.length > 0 && rows.map(row => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Organization Details</DialogTitle>
                {selectedRowData && (
                    <DialogContent>
                        <p><strong>Name:</strong> {selectedRowData.name}</p>
                        <p><strong>Description:</strong> {selectedRowData.description}</p>
                        <p><strong>Location:</strong> {selectedRowData.location}</p>
                        <p><strong>Website:</strong> {selectedRowData.website}</p>
                        <p><strong>Phone Number:</strong> {selectedRowData.phoneNumber}</p>
                        <p><strong>Email:</strong> {selectedRowData.email}</p>
                        <p><strong>Established Year:</strong> {selectedRowData.establishedYear}</p>
                        <p><strong>Number of Employees:</strong> {selectedRowData.numberOfEmployees}</p>
                        <p><strong>Is Active:</strong> {selectedRowData.isActive ? 'Yes' : 'No'}</p>
                    </DialogContent>
                )}
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DataTable;
