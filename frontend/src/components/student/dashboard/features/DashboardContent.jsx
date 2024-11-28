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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { BACKEND_URL } from "../../../../../globals";

const DashboardContent = () => {
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

  const upcomingEvents = [
    "Data Science Seminar: Dec 5th",
    "Sports Meet: Dec 10th",
    "Placement Drive: Dec 15th",
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

      {/* Overview Section */}
      <Grid container spacing={3}>
        {[
          {
            title: "Attendance",
            count: `${attendancePercentage || "loading..."}%`,
            color: isDarkMode ? "#6EDCD9" : "#0081B4",
          },
          {
            title: "Current GPA",
            count: grades.length
              ? (
                  grades.reduce((acc, curr) => acc + curr.grade, 0) /
                  grades.length
                ).toFixed(2)
              : "loading...",
            color: theme.palette.primary.main,
          },
          {
            title: "Next Exam",
            count: "Dec 15th",
            color: isDarkMode ? "#F2AAAA" : "#E36387",
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

      {/* Charts and Activities */}
      <Grid container spacing={3}>
        {/* Upcoming Events */}
        <Grid item xs={12}>
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
              Upcoming Events
            </Typography>
            <Box mt={2} sx={{ lineHeight: 1.5 }}>
              {upcomingEvents.map((event, index) => (
                <Typography key={index} variant="body1">
                  • {event}
                </Typography>
              ))}
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": { backgroundColor: theme.palette.primary.dark },
                }}
              >
                View All Events
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardContent;
