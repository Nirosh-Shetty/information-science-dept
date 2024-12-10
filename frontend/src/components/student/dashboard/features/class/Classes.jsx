import axios from 'axios'
import React, { useEffect } from 'react'
import { BACKEND_URL } from '../../../../../../globals'
import { studentAtom, studentClassAtom } from '../../../../../../recoil/atoms/studentAtom';
import { useRecoilState } from 'recoil';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export const Classes = () => {
    const [student, setStudent] = useRecoilState(studentAtom);
    const [courses] = useRecoilState(studentClassAtom);
    return (
        <div>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="courses table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Subject Code</strong></TableCell>
                            <TableCell><strong>Class Name</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow key={course._id}>
                                <TableCell>{course.name}</TableCell>
                                <TableCell>{course.subCode}</TableCell>
                                <TableCell>{course.className.join(', ')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
