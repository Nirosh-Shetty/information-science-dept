import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BACKEND_URL } from "../../../../../globals";

const DashboardContent = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [studentCount, setStudentCount] = useState();
  const [staffCount, setStaffCount] = useState();

  useEffect(() => {
    fetch(`${BACKEND_URL}/student/allstudents`).then(async (res) => {
      const data = await res.json();
      setStudentCount(data.length);
    });
  },[]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/staff/allstaff`).then(async (res) => {
      const data = await res.json();
      setStaffCount(data.length);
    });
  },[]);

  const attendanceData = [
    { name: "Week 1", attendance: 85 },
    { name: "Week 2", attendance: 88 },
    { name: "Week 3", attendance: 75 },
    { name: "Week 4", attendance: 90 },
  ];

  const performanceData = [
    { name: "Sem 1", grade: 80 },
    { name: "Sem 2", grade: 85 },
    { name: "Sem 3", grade: 75 },
    { name: "Sem 4", grade: 88 },
    { name: "Sem 5", grade: 92 },
    { name: "Sem 6", grade: 83 },
    { name: "Sem 7", grade: 75 },
    { name: "Sem 8", grade: 80 },
  ];

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

      {/* Statistics Section */}
      <Grid container spacing={3}>
        {[
          {
            title: "Total Students",
            count: studentCount ||  "loading...",
            color: theme.palette.primary.main,
          },
          {
            title: "Total Staff",
            count: staffCount || "loading...",
            color: isDarkMode ? "#F2AAAA" : "#E36387", // Conditional color for dark and light mode
          },
          {
            title: "Low Attendance",
            count: "15%",
            color: isDarkMode ? "#6EDCD9" : "#0081B4", // Conditional color for dark and light mode
          },
        ].map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              className="hover-card"
              sx={{
                backgroundColor: item.color,
                color: theme.palette.getContrastText(item.color),
              }}
            >
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="h5">{item.count}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3, backgroundColor: isDarkMode ? "#555" : "#ddd" }} />

      {/* Charts and Recent Activities */}
      <Grid container spacing={3}>
        {/* Attendance Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: "10px",
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color={theme.palette.text.primary}
            >
              Attendance Overview
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={attendanceData}>
                <CartesianGrid stroke={isDarkMode ? "#444" : "#e0e0e0"} />
                <XAxis dataKey="name" stroke={theme.palette.text.primary} />
                <YAxis stroke={theme.palette.text.primary} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  // stroke={isDarkMode ? "#CFA3EA" : "#653C87"}
                  strokeWidth={3}
                />{" "}
                {/* Set Attendance chart line color */}
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Performance Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: "10px",
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color={theme.palette.text.primary}
            >
              Academic Performance
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceData}>
                <CartesianGrid stroke={isDarkMode ? "#444" : "#e0e0e0"} />
                <XAxis dataKey="name" stroke={theme.palette.text.primary} />
                <YAxis stroke={theme.palette.text.primary} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  }}
                />
                <Bar dataKey="grade" fill={theme.palette.primary.main} />{" "}
                {/* Changed color to match Total Students */}
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              backgroundColor: theme.palette.background.paper,
              borderRadius: "10px",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color={theme.palette.text.primary}
            >
              Recent Activities
            </Typography>
            <Box
              mt={2}
              sx={{ lineHeight: 1.5, color: theme.palette.text.secondary }}
            >
              <Typography variant="body1">
                • New student registrations: 5
              </Typography>
              <Typography variant="body1">• Attendance updates: 12</Typography>
              <Typography variant="body1">
                • Academic records updated: 8
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Announcements */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              backgroundColor: theme.palette.background.paper,
              borderRadius: "10px",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color={theme.palette.text.primary}
            >
              Announcements
            </Typography>
            <Box
              mt={2}
              sx={{ lineHeight: 1.5, color: theme.palette.text.secondary }}
            >
              <Typography variant="body1">
                • Semester exams scheduled for next month
              </Typography>
              <Typography variant="body1">
                • Placement drives for ABC Company on 15th
              </Typography>
              <Typography variant="body1">
                • Departmental event on data science next week
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": { backgroundColor: theme.palette.primary.dark },
                }}
              >
                View All Announcements
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardContent;
