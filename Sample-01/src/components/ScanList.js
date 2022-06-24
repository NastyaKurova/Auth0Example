import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import {Box, styled, Tooltip, tooltipClasses} from "@mui/material";

const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 400,
    },
});



export default function ScanList({page, perPage, setPage, setPerPage, scanData,accountsData }) {

    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        setPerPage(parseInt(event.target.value, 10))
        setPage(1);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader >
                <TableHead>
                    <TableRow>
                        <TableCell>CreatedAt</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>IdentityID</TableCell>
                        <TableCell>UserID</TableCell>
                        <TableCell>VIP</TableCell>
                        <TableCell>VerdictName</TableCell>
                        <TableCell>VerdictResult</TableCell>
                        <TableCell>VerdictType</TableCell>
                        <TableCell>VerdictValue</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {scanData && scanData?.Data.map(({CreatedAt,ID,IdentityID,UserID,VIP,VerdictName,VerdictResult,VerdictType,VerdictValue}) => (
                        <TableRow
                            key={ID}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">{CreatedAt}</TableCell>
                            <TableCell align="right">{ID}</TableCell>
                            <TableCell align="right">
                                <CustomWidthTooltip  title={<Box whiteSpace="pre">{JSON.stringify(
                                    accountsData.find(({ID}) => ID === IdentityID),
                                    null, "\t")}</Box>}>
                                   <span>{IdentityID}</span>
                                </CustomWidthTooltip></TableCell>
                            <TableCell align="right">{UserID}</TableCell>
                            <TableCell align="right">{VIP}</TableCell>
                            <TableCell align="right">{VerdictName}</TableCell>
                            <TableCell align="right">{VerdictResult}</TableCell>
                            <TableCell align="right">{VerdictType}</TableCell>
                            <TableCell align="right">{VerdictValue}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={scanData?.Pagination.Count || 0}
        rowsPerPage={perPage}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
    />
        </Paper>
    );
}