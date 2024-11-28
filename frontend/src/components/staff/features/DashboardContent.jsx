import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  TextField,
  Modal,
  IconButton,
  CardMedia,
  Box,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import BarChartIcon from "@mui/icons-material/BarChart";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@emotion/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { staffAtom } from "../../../../recoil/atoms/staffAtom";
import { BACKEND_URL } from "../../../../globals";

const updatedEvents = [
  {
    id: 1,
    title: "Team Meeting",
    date: new Date("2025-11-05"),
    imgSrc: null,
    description: "Monthly team meeting to discuss progress and goals.",
    maxStudents: 10,
  },
  {
    id: 2,
    title: "Team Meeting",
    date: new Date("2025-11-05"),
    imgSrc: null,
    description: "Monthly team meeting to discuss progress and goals.",
    maxStudents: 10,
  },
  {
    id: 3,
    title: "Team Meeting",
    date: new Date("2025-11-05"),
    imgSrc: null,
    description: "Monthly team meeting to discuss progress and goals.",
    maxStudents: 10,
  },
  {
    id: 4,
    title: "Project Deadline",
    date: new Date("2024-10-30"),
    imgSrc: null,
    description: "Final deadline for project submission.",
    maxStudents: 5,
  },
  {
    id: 5,
    title: "Project Deadline",
    date: new Date("2024-10-30"),
    imgSrc: null,
    description: "Final deadline for project submission.",
    maxStudents: 5,
  },
  {
    id: 6,
    title: "Project Deadline",
    date: new Date("2024-10-30"),
    imgSrc: null,
    description: "Final deadline for project submission.",
    maxStudents: 5,
  },
];

const currentDate = new Date();

const initialEvents = updatedEvents.map(event => ({
  ...event,
  completed: event.date < currentDate,
}));

function DashboardContent() {
  const [events, setEvents] = useState(initialEvents);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [eventDescription, setEventDescription] = useState("");
  const [eventMaxStudents, setEventMaxStudents] = useState("");
  const [staff, setStaff] = useRecoilState(staffAtom);
  const handleOpen = (event = null) => {
    if (event) {
      setIsEditing(true);
      setCurrentEventId(event.id);
      setEventTitle(event.title);
      setEventDate(event.date.toISOString().split("T")[0]);
      setEventImage(null);
      setEventDescription(event.description);
      setEventMaxStudents(event.maxStudents);
    } else {
      resetForm();
      setIsEditing(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setEventTitle("");
    setEventDate("");
    setEventImage(null);
    setEventDescription("");
    setEventMaxStudents("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEventImage(file);
  };

  const handleAddEvent = () => {
    const newEvent = {
      id: events.length + 1,
      title: eventTitle,
      date: new Date(eventDate),
      completed: new Date(eventDate) < Date.now(),
      imgSrc: eventImage ? URL.createObjectURL(eventImage) : "",
      description: eventDescription,
      maxStudents: parseInt(eventMaxStudents, 10),
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    handleClose();
  };

  const handleEditEvent = () => {
    const updatedEvent = {
      id: currentEventId,
      title: eventTitle,
      date: new Date(eventDate),
      completed: new Date(eventDate) < Date.now(),
      imgSrc: eventImage ? URL.createObjectURL(eventImage) : "",
      description: eventDescription,
      maxStudents: parseInt(eventMaxStudents, 10),
    };
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === currentEventId ? updatedEvent : event
      )
    );
    handleClose();
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const upcomingEvents = events.filter((event) => !event.completed);
  const completedEvents = events.filter((event) => event.completed);
  const theme = useTheme();
  return (
    <Box className="p-4" sx={{ bgcolor: "" }}>
      {/* Overview Statistics */}
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
                {staff?.courses?.length ? staff.courses.length : "loading..."}
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
              {staff?.assignment?.length ? staff.assignment.length : "loading..."}
              </Typography>
              <Typography color="text.secondary">
                Pending assignments to grade
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

      {/* Events Section */}
      <Box sx={{ mb: 6 }}>
        <CardContent>
          <Typography
            variant="h5"
            style={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              marginBottom: "1rem",
            }}
          >
            Upcoming Events
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Button
            variant="contained"
            onClick={() => handleOpen(null)}
            sx={{
              mb: 3,
              bgcolor: "#1a73e8",
              color: "#fff",
              "&:hover": { bgcolor: "#1669bb" },
            }}
          >
            Add Event
          </Button>
          <Grid container spacing={3}>
            {upcomingEvents.map((event) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={event.id}
                style={{ height: "100%" }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 3,
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.02)", boxShadow: 5 },
                  }}
                >
                  <CardMedia
                    component="img"
                    style={{ height: "270px", objectFit: "fill" }}
                    image={
                      event.imgSrc ||
                      "https://nationaleventpros.com/wp-content/uploads/2017/12/GK2A3686-1600x1067.jpg"
                    }
                    alt={event.title}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {event.title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{ mt: 1 }}
                      style={{
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        whiteSpace: "normal",
                        display: "block",
                        maxWidth: "100%",
                      }}
                    >
                      {event.description}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      Max Team Size: {event.maxStudents}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 1, textAlign: "center" }}>
                    <Button
                      variant="text"
                      onClick={() => handleOpen(event)}
                      sx={{ color: "#1a73e8" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ mt: 4, mb:2}} />
          <Typography
            variant="h5"
            style={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              marginBottom: "1rem",
            }}
          >
            Completed Events
          </Typography>
          <Grid container spacing={3}>
            {completedEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 3,
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.02)", boxShadow: 5 },
                  }}
                >
                  <CardMedia
                    component="img"
                    style={{ height: "270px", objectFit: "fill" }}
                    image={
                      event.imgSrc ||
                      "https://nationaleventpros.com/wp-content/uploads/2017/12/GK2A3686-1600x1067.jpg"
                    }
                    alt={event.title}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {event.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {event.description}
                    </Typography>
                    <Typography color="text.secondary">
                      Max Team Size: {event.maxStudents}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Box>

      {/* Add/Edit Event Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <Card
            sx={{
              width: 600,
              p: 3,
              borderRadius: 2,
              boxShadow: 4,
              position: "relative",
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{ position: "absolute", top: 16, right: 16 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" align="center" sx={{ mb: 3 }}>
              {isEditing ? "Edit Event" : "Add New Event"}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <TextField
              fullWidth
              label="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="date"
              label="Event Date"
              InputLabelProps={{ shrink: true }}
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Max Team Size"
              value={eventMaxStudents}
              onChange={(e) => setEventMaxStudents(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Event Description"
              multiline
              rows={3}
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              sx={{ mb: 3 }}
            />
            <input
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              style={{ marginBottom: "16px" }}
            />
            <Button
              variant="contained"
              onClick={isEditing ? handleEditEvent : handleAddEvent}
              fullWidth
              sx={{ bgcolor: "#1a73e8", "&:hover": { bgcolor: "#1669bb" } }}
            >
              {isEditing ? "Update Event" : "Add Event"}
            </Button>
          </Card>
        </Box>
      </Modal>
    </Box>
  );
}

export default DashboardContent;
