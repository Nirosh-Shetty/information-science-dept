import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { staffAtom } from '../../../../recoil/atoms/staffAtom';
import { BACKEND_URL } from '../../../../globals';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { classAtom } from '../../../../recoil/atoms/classAtom';

const MyClassesContent = () => {
    const theme = useTheme(); 
    const [classes, setClasses] = useRecoilState(classAtom);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead sx={{ backgroundColor: theme.palette.action.hover }}>
                    <TableRow>
                        <TableCell><strong>Name</strong></TableCell>
                        <TableCell><strong>SubCode</strong></TableCell>
                        <TableCell><strong>Class Name</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {classes?.map((cls) => (
                        <TableRow key={cls._id}>
                            <TableCell>{cls.name}</TableCell>
                            <TableCell>{cls.subCode}</TableCell>
                            <TableCell>{cls.className.join(', ')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MyClassesContent;
