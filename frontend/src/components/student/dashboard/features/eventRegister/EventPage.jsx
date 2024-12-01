import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import axios from "axios";
import { BACKEND_URL } from "../../../../../../globals";
import { useRecoilState } from "recoil";
import { studentAtom } from "../../../../../../recoil/atoms/studentAtom";

const EventPage = () => {
  const [student, setStudent] = useRecoilState(studentAtom);
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    leaderName: "",
    email: "",
    contactNumber: "",
    teamMembers: [{ name: "" }],
  });

  // Fetch all events
  useEffect(() => {
    axios.get(`${BACKEND_URL}/event/get`) // Update with the correct API endpoint
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
    setFormData((prev) => ({ ...prev, teamMembers: [...prev.teamMembers, { name: "" }] }));
  };

  // Submit registration
  const handleRegister = () => {
    if (!selectedEvent) return;

    axios.post(`${BACKEND_URL}/event/register/${selectedEvent._id}/`, formData)
      .then(() => {
        alert("Registration successful!");
        handleClose();
      })
      .catch((err) => console.error("Error registering student:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Events
      </Typography>
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`${BACKEND_URL}${event.imageUrl}`}
                alt={event.title}
              />
              <CardContent>
                <Typography variant="h5">{event.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">{event.description}</Typography>
                <Typography variant="body2">Team Size: {event.teamSize}</Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleRegisterClick(event)}
              >
                Register
              </Button>
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
    </div>
  );
};

export default EventPage;
