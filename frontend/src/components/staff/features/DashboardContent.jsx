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
import axios from "axios";
import { format } from "date-fns";

const currentDate = new Date();

function DashboardContent() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [eventDescription, setEventDescription] = useState("");
  const [eventMaxStudents, setEventMaxStudents] = useState("");
  const [staff, setStaff] = useRecoilState(staffAtom);
  const handleOpen = (event = null) => {
    if (event) {
      setIsEditing(true);
      setCurrentEventId(event._id); // Ensure correct event id is set
      setEventTitle(event.title);
      setEventDate(
        event.date ? format(new Date(event.date), "yyyy-MM-dd") : ""
      );
      if (event.imageUrl) {
        setEventImage(null); // Only set the new image when it's changed
        setOldImage(event.imageUrl); // Keep the old image URL for update
      }
      setEventDescription(event.description);
      setEventMaxStudents(event.teamSize);
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
    const file = e.currentTarget.files[0];
    setEventImage(file);
  };

  const handleAddEvent = () => {
    const formData = new FormData();
    formData.append("title", eventTitle || "Untitled Event");
    formData.append("date", eventDate ? new Date(eventDate) : new Date());
    formData.append(
      "description",
      eventDescription || "No description available."
    );
    formData.append("teamSize", eventMaxStudents || 5);
    if (eventImage) formData.append("image", eventImage);

    axios.post(`${BACKEND_URL}/event/add`, formData).then((res) => {
      setEvents((prevEvents) => [...prevEvents, res.data.newEvent]);
    });
    handleClose();
  };

  const handleEditEvent = () => {
    const updatedEvent = {
      title: eventTitle,
      date: new Date(eventDate),
      completed: new Date(eventDate) < Date.now(),
      imageUrl: eventImage ? eventImage : oldImage,
      description: eventDescription,
      maxStudents: parseInt(eventMaxStudents, 10),
    };
  
    const formData = new FormData();
    formData.append("title", updatedEvent.title || "Untitled Event");
    formData.append("date", updatedEvent.date ? updatedEvent.date : new Date());
    formData.append("description", updatedEvent.description || "No description available.");
    formData.append("teamSize", updatedEvent.maxStudents || 5);
  
    if (eventImage) {
      formData.append("image", eventImage);
    } else if (oldImage) {
      formData.append("oldImage", oldImage);
    }
  
    axios.put(`${BACKEND_URL}/event/update/${currentEventId}`, formData)
      .then((data) => {
        setEvents((prevEvents) => prevEvents.map((event) => 
          event._id === currentEventId ? data?.data?.updatedEvent : event
        ));
        handleClose(); // Close the modal after editing
      })
      .catch(error => console.error("Error updating event:", error));
  };
  

  const handleDeleteEvent = (id) => {
    axios.delete(`${BACKEND_URL}/event/delete/${id}`).then(() => {
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
    });
  };

  const upcomingEvents = events.filter((event) => !event.completed);
  const completedEvents = events.filter((event) => event.completed);
  const theme = useTheme();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/event/get`);
        const data = await response.json();
        setEvents(
          data.map((event) => ({
            ...event,
            completed: new Date(event.date) < currentDate,
          }))
        );
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

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
                8
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
            onClick={() => {
              handleOpen(null);
            }}
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
                      `${BACKEND_URL}${event.imageUrl}` ||
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
                      Max Team Size: {event.teamSize}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      Date: {format(new Date(event.date), "dd MMM yyyy")}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 1, textAlign: "center" }}>
                    <Button
                      variant="text"
                      onClick={() => {
                        setCurrentEventId(event._id); // Correctly set the event ID
                        handleOpen(event);
                      }}
                      sx={{ color: "#1a73e8" }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="text"
                      color="error"
                      onClick={() => handleDeleteEvent(event._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ mt: 4, mb: 2 }} />
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
                      `${BACKEND_URL}${event.imageUrl}` ||
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
                      Max Team Size: {event.teamSize}
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
