import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
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

const MyClassesContent = () => {
    const [classes, setClasses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [staff] = useRecoilState(staffAtom);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/courses/getall`);
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchData();
    }, []); // Fetch only once on component mount

    useEffect(() => {
        if (courses.length > 0 && staff?.courses) {
            const filteredClasses = courses.filter((course) =>
                staff.courses.includes(course._id)
            );
            setClasses(filteredClasses);
        }
    }, [courses, staff]); // Re-run whenever `courses` or `staff` changes

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Name</strong></TableCell>
                        <TableCell><strong>SubCode</strong></TableCell>
                        <TableCell><strong>Class Name</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {classes.map((cls) => (
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
