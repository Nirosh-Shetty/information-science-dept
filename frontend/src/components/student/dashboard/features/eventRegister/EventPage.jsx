import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
  CircularProgress,
  Modal,
} from "@mui/material";
import axios from "axios";
import { BACKEND_URL } from "../../../../../../globals";
import { useRecoilState } from "recoil";
import { studentAtom } from "../../../../../../recoil/atoms/studentAtom";
import { format, formatDate } from "date-fns";

const EventPage = () => {
  const [student, setStudent] = useRecoilState(studentAtom);
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [formData, setFormData] = useState({
    leaderName: "",
    email: "",
    contactNumber: "",
    teamMembers: [{ name: "" }],
  });

  // Fetch all events
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/event/get`) // Update with the correct API endpoint
      .then((response) => setEvents(response.data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  // Handle dialog open/close
  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
    setFormData({
      leaderName: "",
      email: "",
      contactNumber: "",
      teamMembers: [{ name: "" }],
    });
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTeamMemberChange = (index, value) => {
    const newTeamMembers = [...formData.teamMembers];
    newTeamMembers[index].name = value;
    setFormData({ ...formData, teamMembers: newTeamMembers });
  };

  const addTeamMember = () => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: "" }],
    }));
  };

  // Submit registration
  const handleRegister = () => {
    if (!selectedEvent) return;

    const registrationData = {
          studentId: student._id, // Include the studentId here
          leaderName: formData.leaderName,
          email: formData.email,
          contactNumber: formData.contactNumber,
          teamMembers: formData.teamMembers,
    };

    console.log(registrationData, "registration data");

    axios
      .post(`${BACKEND_URL}/event/register/${selectedEvent._id}/`, registrationData)
      .then(() => {
        alert("Registration successful!");
        handleClose();
      })
      .catch((err) => console.error("Error registering student:", err));
  };

  const fetchRegisteredStudents = async (eventId) => {
    if (!eventId) {
      console.error("Invalid event ID");
      return;
    }

    setIsLoadingStudents(true);
    console.log(eventId, "event id");

    try {
      const response = await axios.get(
        `${BACKEND_URL}/event/getbystudent/${student._id}/${eventId}`
      );
      setRegisteredStudents(response.data);
      console.log(response.data, "registered students");
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Failed to fetch registered students. Please try again later.");
    } finally {
      setIsLoadingStudents(false);
    }
  };
  const handleOpenDetails = (eventId) => {
    setCurrentEventId(eventId);
    fetchRegisteredStudents(eventId);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setRegisteredStudents([]);
    setCurrentEventId(null);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Events
      </Typography>
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event._id}>
            <Card
              sx={{
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.02)", boxShadow: 5 },
                maxWidth: 1100,
              }}
            >
              <CardMedia
                component="img"
                style={{ height: 240, width: 1100, objectFit: "cover" }}
                image={`${BACKEND_URL}${event.imageUrl}`}
                alt={event.title}
              />
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {event.title}
                </Typography>
                <Typography sx={{ mt: 1 }} color="text.secondary">
                  Date : {format(new Date(event.date), "yyyy-MM-dd")}
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
                  Team Size: {event.teamSize}
                </Typography>
              </CardContent>
              <Box sx={{ p: 1, textAlign: "center",}}>

              <Button
                variant="contained"
                color="primary"
                onClick={() => handleRegisterClick(event)}
                sx={{
                  marginBottom: 2,
                  marginTop: 2,
                  marginLeft: "auto",
                  marginRight: 5,
                }} // Center the button
              >
                Register
              </Button>
              <Button
                variant="text"
                color="primary"
                onClick={() => handleOpenDetails(event._id)}
                sx={{
                  marginBottom: 2,
                  marginTop: 2,
                  marginLeft: "auto",
                  marginRight: "auto",
                }} // Center the button
              >
                Details
              </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Register Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Register for {selectedEvent?.title}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Leader Name"
            name="leaderName"
            value={formData.leaderName}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            fullWidth
          />
          <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
            Team Members:
          </Typography>
          {formData.teamMembers.map((member, index) => (
            <TextField
              key={index}
              margin="dense"
              label={`Team Member ${index + 1}`}
              value={member.name}
              onChange={(e) => handleTeamMemberChange(index, e.target.value)}
              fullWidth
            />
          ))}
          <Button onClick={addTeamMember} style={{ marginTop: "10px" }}>
            Add Team Member
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRegister} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={openDetails}
        onClose={handleCloseDetails}
        aria-labelledby="details-modal-title"
        aria-describedby="details-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" marginBottom={2}>
            Registered Students
          </Typography>

          {isLoadingStudents ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : registeredStudents && registeredStudents.length > 0 ? (
            registeredStudents.map((student, i) => (
              <Box
                key={student._id}
                sx={{
                  marginBottom: 2,
                  padding: 2,
                  border: "1px solid #ddd",
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle1">
                  <strong>{i+1}.</strong> 
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Leader Name:</strong> {student.leaderName}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {student.email}
                </Typography>
                <Typography variant="body2">
                  <strong>Contact Number:</strong> {student.contactNumber}
                </Typography>
                <Typography variant="body2" marginTop={1}>
                  <strong>Team Members:</strong>
                </Typography>
                {student.teamMembers && student.teamMembers.length > 0 ? (
                  <ul>
                    {student.teamMembers.map((member, index) => (
                      <li key={index}>
                        {typeof member === "object" ? member.name : member}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography variant="body2">
                    No team members listed.
                  </Typography>
                )}
              </Box>
            ))
          ) : (
            <Typography variant="body2">
              You have not registered for this event yet.
            </Typography>
          )}

          <Button
            variant="contained"
            onClick={handleCloseDetails}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default EventPage;
