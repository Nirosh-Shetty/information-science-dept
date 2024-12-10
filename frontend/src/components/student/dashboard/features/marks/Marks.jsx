import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { studentAtom } from '../../../../../../recoil/atoms/studentAtom';
import { studentClassAtom } from '../../../../../../recoil/atoms/classAtom';
import axios from 'axios';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { BACKEND_URL } from '../../../../../../globals';

export const Marks = () => {
  const [student] = useRecoilState(studentAtom);
  const [courses] = useRecoilState(studentClassAtom); // Assuming this is an array of courses
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const allMarks = await Promise.all(
          courses.map(async (course) => {
            const response = await axios.get(
              `${BACKEND_URL}/marks/get/${student._id}/${course._id}`
            );
            return { ...response.data, courseName: course.name, subCode: course.subCode };
          })
        );
        setMarks(allMarks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();
  }, [student, courses]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error fetching marks: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Marks for {student.fullName} ({student.usn})
      </h2>

      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-200">
              <TableCell className="font-semibold text-gray-600">Subject Code</TableCell>
              <TableCell className="font-semibold text-gray-600">Subject Name</TableCell>
              <TableCell className="font-semibold text-gray-600">IA1</TableCell>
              <TableCell className="font-semibold text-gray-600">IA2</TableCell>
              <TableCell className="font-semibold text-gray-600">IA3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {marks.map((mark, index) => (
              <TableRow key={index} className="hover:bg-gray-100">
                <TableCell className="text-gray-700">{mark.subCode}</TableCell>
                <TableCell className="text-gray-700">{mark.courseName}</TableCell>
                <TableCell className="text-gray-700">{mark.data.length > 0 ? mark.data[0].marks.IA1 : '-'}</TableCell>
                <TableCell className="text-gray-700">{mark.data.length > 0 ? mark.data[0].marks.IA2 : '-'}</TableCell>
                <TableCell className="text-gray-700">{mark.data.length > 0 ? mark.data[0].marks.IA3 : '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
