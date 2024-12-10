import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BACKEND_URL } from "../../../../../globals";
import EventPage from "./eventRegister/EventPage";
import axios from "axios";
import { studentAtom } from "../../../../../recoil/atoms/studentAtom";
import { studentClassAtom } from "../../../../../recoil/atoms/classAtom";
import { useRecoilState } from "recoil";
import { assignmentAtom } from "../../../../../recoil/atoms/assignmentAtom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import BarChartIcon from "@mui/icons-material/BarChart";

const DashboardContent = () => {
  const [student, setStudent] = useRecoilState(studentAtom);
  const [courses, setCourses] = useRecoilState(studentClassAtom);
  const [assignments, setAssignments] = useRecoilState(assignmentAtom);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [attendancePercentage, setAttendancePercentage] = useState(null);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/student/attendance`).then(async (res) => {
      const data = await res.json();
      setAttendancePercentage(data.averageAttendance || "loading...");
    });

    fetch(`${BACKEND_URL}/student/grades`).then(async (res) => {
      const data = await res.json();
      setGrades(data || []);
    });
  }, []);

  React.useEffect(() => {
    if (student) {
      axios
        .get(`${BACKEND_URL}/courses/get/${student.className}`)
        .then((res) => {
          setCourses(res.data);
          // setStudent({ ...student, courses: res.data });
          console.log(res.data);
        });
    }
  }, [student]);

  React.useEffect(() => {
    if (student) {
      axios
        .get(`${BACKEND_URL}/staff/assignments/class/${student.className}`)
        .then((res) => {
          console.log(res.data, "assignments");
          setAssignments(res.data);
        });
    }
  }, [student]);

  return (
    <Box
      p={3}
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Inline CSS for hover effects */}
      <style>
        {`
          .hover-card {
            transition: transform 0.2s ease-in-out;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }
          .hover-card:hover {
            transform: scale(1.05);
          }
        `}
      </style>

      {/* Overview Section */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.02)", boxShadow: 5 },
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <PeopleAltIcon fontSize="large" color="primary" />
                <Typography variant="h6" sx={{ ml: 2 }}>
                  My Classes
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {courses?.length ? courses.length : "loading..."}
              </Typography>
              <Typography color="text.secondary">
                Current classes assigned
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.02)", boxShadow: 5 },
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <DescriptionIcon
                  fontSize="large"
                  sx={{ color: "green", mr: 2 }}
                />
                <Typography variant="h6">Assignments</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {assignments ? assignments.length : "loading..."}
              </Typography>
              <Typography color="text.secondary">
                Pending assignments to submit
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.02)", boxShadow: 5 },
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <BarChartIcon
                  fontSize="large"
                  sx={{ color: "orange", mr: 2 }}
                />
                <Typography variant="h6">Attendance</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                95%
              </Typography>
              <Typography color="text.secondary">
                Average attendance rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3, backgroundColor: isDarkMode ? "#555" : "#ddd" }} />

      {/* Charts and Activities */}
      <Grid container spacing={3} p={3}>
        {/* Upcoming Events */}
        <EventPage></EventPage>
      </Grid>
    </Box>
  );
};

export default DashboardContent;
