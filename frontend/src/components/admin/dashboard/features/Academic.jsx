import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Paper,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import 'tailwindcss/tailwind.css';

const Academic = () => {
  // Sample data for GPA trend chart
  const gpaData = [
    { semester: 'Semester 1', gpa: 3.2 },
    { semester: 'Semester 2', gpa: 3.5 },
    { semester: 'Semester 3', gpa: 3.8 },
    { semester: 'Semester 4', gpa: 3.7 },
  ];

  // Sample data for Semester Performance table
  const semesterPerformance = [
    { course: 'Calculus', grade: 'A', credits: 3 },
    { course: 'Physics', grade: 'B+', credits: 4 },
    { course: 'Chemistry', grade: 'A-', credits: 3 },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Typography variant="h4" className="mb-6 text-center font-semibold text-gray-700">
        Student Performance
      </Typography>

      {/* Overall GPA Summary */}
      <Card className="mb-6">
        <CardContent>
          <Typography variant="h5" className="font-medium mb-2">Academic Overview</Typography>
          <Typography variant="body1">Current GPA: 3.7</Typography>
          <Typography variant="body2">Class Rank: 5</Typography>
          <Typography variant="body2">Completed Credits: 90/120</Typography>
        </CardContent>
      </Card>

      {/* Semester Performance Table */}
      <Card className="mb-6">
        <CardContent>
          <Typography variant="h6" className="font-medium mb-4">Semester Performance</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Course</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Credits</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {semesterPerformance.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.course}</TableCell>
                    <TableCell>{item.grade}</TableCell>
                    <TableCell>{item.credits}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Attendance and Participation */}
      <Card className="mb-6">
        <CardContent>
          <Typography variant="h6" className="font-medium mb-4">Attendance and Participation</Typography>
          <Typography variant="body2">Attendance: 85%</Typography>
          <LinearProgress variant="determinate" value={85} className="my-4" color="primary" />
          <Typography variant="body2">Participation: 90%</Typography>
          <LinearProgress variant="determinate" value={90} color="secondary" />
        </CardContent>
      </Card>

      {/* Performance Trend Chart */}
      <Card className="mb-6">
        <CardContent>
          <Typography variant="h6" className="font-medium mb-4">Performance Trends</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={gpaData}>
              <CartesianGrid stroke="#e0e0e0" />
              <XAxis dataKey="semester" stroke="#333" />
              <YAxis domain={[0, 4]} stroke="#333" />
              <Tooltip />
              <Line type="monotone" dataKey="gpa" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Advisor Comments */}
      <Card className="mb-6">
        <CardContent>
          <Typography variant="h6" className="font-medium mb-4">Advisor Comments</Typography>
          <Typography variant="body2">
            - "Great improvement this term. Keep up the work in Calculus."
          </Typography>
          <Typography variant="body2">
            - "Consider focusing more on lab participation for Physics."
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Academic;
