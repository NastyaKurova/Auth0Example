import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styleBadge from './badge.module.scss';
import style from './scanList.module.scss';
import {Pagination} from "@mui/material";


export default function ScanList({page, perPage, setPage, scanData, pagination}) {

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    return (
       <>
            <TableContainer className={style.scanList}>
                <Table sx={{minWidth: 650}} aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell classes={{root: `${style.scanListTr}`}} align="right">ID</TableCell>
                            <TableCell classes={{root: `${style.scanListTr}`}} align="right">ИМЯ КЛИЕНТА</TableCell>
                            <TableCell classes={{root: `${style.scanListTr}`}} align="right">ПОЧТА</TableCell>
                            <TableCell classes={{root: `${style.scanListTr}`}} align="right">АКТИВНОСТЬ РОБОТОВ (КОЛ_ВО)</TableCell>
                            <TableCell classes={{root: `${style.scanListTr}`}} align="right">СУММА СЧЕТОВ</TableCell>
                            <TableCell classes={{root: `${style.scanListTr}`}} align="right">ПРИБЫЛЬ</TableCell>
                            <TableCell classes={{root: `${style.scanListTr}`}} align="right">ДАТА РЕГИСТРАЦИИ</TableCell>
                            <TableCell classes={{root: `${style.scanListTr}`}} align="right">КОМИССИЯ</TableCell>
                            <TableCell classes={{root: `${style.scanListTr}`}} align="right">СТАТУС ПЛАТЕЛЬЩИКА</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {scanData?.map(({
                                            ID,
                                            FirstName,
                                            LastName,
                                            Birthday,
                                            City,
                                            State,
                                            Gender,
                                            EyeColor,
                                            Height,
                                            Weight,
                                            CreatedAt
                                        }) => (
                            <TableRow
                                key={ID}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell classes={{root: `${style.scanListTr}`}} align="right">{ID}</TableCell>
                                <TableCell classes={{root: `${style.scanListTr}`}} align="right"><strong>{FirstName + ' ' + LastName}</strong></TableCell>
                                <TableCell classes={{root: `${style.scanListTr}`}} align="right">{Birthday}</TableCell>
                                <TableCell classes={{root: `${style.scanListTr}`}} align="right">{State}</TableCell>
                                <TableCell classes={{root: `${style.scanListTr}`}} align="right">{Gender}</TableCell>
                                <TableCell classes={{root: `${style.scanListTr}`}} align="right">{EyeColor}</TableCell>
                                <TableCell classes={{root: `${style.scanListTr}`}} align="right">{CreatedAt}</TableCell>
                                <TableCell classes={{root: `${style.scanListTr}`}} align="right">{Weight}</TableCell>
                                <TableCell classes={{root: `${style.scanListTr}`}} align="right">{City.length?<span
                                    className={styleBadge.badgeDanger}>{City}</span>:null}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
                <Pagination color={'primary'} className={style.scanListPagination} page={page} count={Math.ceil(pagination?.Count/perPage)} shape="rounded" onChange={handleChangePage} />
</>
    );
}