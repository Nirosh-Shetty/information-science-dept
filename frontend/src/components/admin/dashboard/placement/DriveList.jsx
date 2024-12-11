import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";
import { format } from "date-fns";

let upcomingDrives = [
  {
    id: 1,
    role: "Graduate Trainee",
    company: "Tech Mahindra",
    ctc: "3.5 - 5.5LPA",
    date: "2024-11-05", // ISO format
  },
  {
    id: 2,
    role: "AI/ML Engineer",
    company: "SAP Labs",
    ctc: "6LPA",
    date: "2024-11-05", // ISO format
  },
];

const completedDrives = [
  {
    id: 1,
    role: "Associate Software Developer",
    company: "Accenture",
    ctc: "4.5LPA",
    date: "2024-10-05", // ISO format
  },
  {
    id: 2,
    role: "Intern",
    company: "Amazom",
    ctc: "4.5LPA",
    date: "2024-10-05", // ISO format
  },
];

const DriveList = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [newDrive, setNewDrive] = useState({
    role: "",
    company: "",
    ctc: "",
    date: "",
  });
  const [editData, setEditData] = useState({
    role: "",
    company: "",
    ctc: "",
    date: "",
  });

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => {
    setOpen(false);
    setNewDrive({ role: "", company: "", ctc: "", date: "" });
  };

  const handleEditOpen = (drive) => {
    setEditData(drive);
    setSelectedId(drive.id);
    setEdit(true);
  };

  const editCloseDialog = () => {
    setEdit(false);
    setEditData({ role: "", company: "", ctc: "", date: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDrive((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddDrive = () => {
    upcomingDrives.push({
      ...newDrive,
      id: upcomingDrives.length + 1,
      date: newDrive.date,
    });
    setOpen(false);
    setNewDrive({ role: "", company: "", ctc: "", date: "" });
  };

  const handleEditDrive = () => {
    upcomingDrives = upcomingDrives.map((drive) =>
      drive.id === selectedId
        ? { ...editData, id: selectedId }
        : drive
    );
    setEdit(false);
    setEditData({ role: "", company: "", ctc: "", date: "" });
  };

  const safeFormatDate = (dateStr) => {
    try {
      return format(new Date(dateStr), "do MMM yyyy");
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "20px",
      }}
    >
      {/* Upcoming Drives */}
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Typography
            variant="h5"
            style={{ color: theme.palette.primary.main, fontWeight: 600 }}
          >
            Upcoming Drives
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
          >
            Add Drive
          </Button>
        </div>
        <List
          sx={{
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 4px 8px rgba(255, 255, 255, 0.3)"
                : theme.shadows[3],
            padding: "10px",
            marginBottom: "2rem",
          }}
        >
          {upcomingDrives.map((drive) => (
            <React.Fragment key={drive.id}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  "&:hover": { backgroundColor: theme.palette.action.hover },
                }}
              >
                <ListItemAvatar>
                  <Avatar alt={drive.title} src={drive.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" style={{ fontWeight: 600 }}>
                      {drive.company} - {drive.role}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Expected CTC: {drive.ctc}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        style={{ marginTop: "0.5rem" }}
                      >
                        Drive Date: {safeFormatDate(drive.date)}
                      </Typography>
                    </>
                  }
                />
                <IconButton
                  edge="end"
                  aria-label="details"
                  onClick={() => handleEditOpen(drive)}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
        <Typography
            variant="h5"
            style={{ color: theme.palette.primary.main, fontWeight: 600 }}
          >
            Completed Drives
          </Typography>
        <List
          sx={{
            marginTop: "1rem",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 4px 8px rgba(255, 255, 255, 0.3)"
                : theme.shadows[3],
            padding: "10px",
          }}
        >
          {completedDrives.map((drive) => (
            <React.Fragment key={drive.id}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  "&:hover": { backgroundColor: theme.palette.action.hover },
                }}
              >
                <ListItemAvatar>
                  <Avatar alt={drive.title} src={drive.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" style={{ fontWeight: 600 }}>
                      {drive.company} - {drive.role}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Expected CTC: {drive.ctc}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        style={{ marginTop: "0.5rem" }}
                      >
                        Drive Date: {safeFormatDate(drive.date)}
                      </Typography>
                    </>
                  }
                />
                <IconButton
                  edge="end"
                  aria-label="details"
                  onClick={() => handleEditOpen(drive)}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </section>

      {/* Add Drive Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Add New Drive</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Role"
            name="role"
            fullWidth
            variant="outlined"
            value={newDrive.role}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Company"
            name="company"
            fullWidth
            variant="outlined"
            value={newDrive.company}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="CTC"
            name="ctc"
            fullWidth
            variant="outlined"
            value={newDrive.ctc}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Date"
            name="date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={newDrive.date}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddDrive} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={edit} onClose={editCloseDialog}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Role"
            name="role"
            fullWidth
            variant="outlined"
            value={editData.role}
            onChange={handleEditInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Company"
            name="company"
            fullWidth
            variant="outlined"
            value={editData.company}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            label="CTC"
            name="ctc"
            fullWidth
            variant="outlined"
            value={editData.ctc}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            label="Date"
            name="date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={editData.date}
            onChange={handleEditInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={editCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditDrive} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DriveList;
