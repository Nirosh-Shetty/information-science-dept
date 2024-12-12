import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { studentClassAtom } from "../../../../../../recoil/atoms/classAtom";
import { studentAtom } from "../../../../../../recoil/atoms/studentAtom";
import axios from "axios";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { BACKEND_URL } from "../../../../../../globals";

export const Attendance = () => {
  const [courses, setCourse] = useRecoilState(studentClassAtom);
  const [student, setStudent] = useRecoilState(studentAtom);
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/student/getAttendanceData/${student._id}`,
          {
            params: {
              courses: courses,
            },
          }
        );

        if (response.data.success) {
          const data = response.data.data;
          setAttendanceData(data);

          // Calculate statistics for each course
          const stats = courses.map((course) => {
            const courseRecords = data.filter(
              (record) => record.course._id === course._id
            );

            const attended = courseRecords.reduce((acc, record) => {
              return (
                acc +
                record.attendance.filter(
                  (a) => a.attendance === "Present" && a.status !== "Excused"
                ).length
              );
            }, 0);
            const excused = courseRecords.reduce((acc, record) => {
              return (
                acc +
                record.attendance.filter((a) => a.attendance === "Excused")
                  .length
              );
            }, 0);
            const total = courseRecords.length;
            const percentage =
              total > 0 ? ((attended / (total - excused)) * 100).toFixed(2) : 0;

            return { course, attended, total, excused, percentage };
          });

          setAttendanceStats(stats);
        } else {
          console.error("Failed to fetch attendance data.");
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    if (courses.length > 0) {
      fetchAttendanceData();
    }
  }, [courses, student]);

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Courses</TableCell>
              <TableCell>Attended</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Excused</TableCell>
              <TableCell>Attendance Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceStats.map((stats, index) => (
              <TableRow key={index}>
                <TableCell>
                  {`${stats.course.name} (${stats.course.subCode})`}
                </TableCell>
                <TableCell>{stats.attended}</TableCell>
                <TableCell>{stats.total}</TableCell>
                <TableCell>{stats.excused}</TableCell>
                <TableCell>{stats.percentage}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
