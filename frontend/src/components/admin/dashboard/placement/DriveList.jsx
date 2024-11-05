import * as React from "react";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {
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

let upcomingDrives = [
  {
    id: 1,
    title: "Accenture - Associate Software Developer",
    ctc: "Expected CTC: 4.5LPA",
    date: "Drive Date: 5th Nov 24",
    avatar: "/companies/companies.png",
  },
];

const completedDrives = [
  {
    id: 1,
    title: "Accenture - Associate Software Developer",
    ctc: "Expected CTC: 4.5LPA",
    date: "Drive Date: 5th Oct 24",
    avatar: "/companies/companies.png",
  },
];

const DriveList = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);
  const [newDrive, setNewDrive] = React.useState({
    title: "",
    ctc: "",
    date: "",
    avatar: "",
  });
  const [editData, setEditData] = React.useState({
    title: "",
    ctc: "",
    date: "",
    avatar: "",
  });

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => {
    setOpen(false);
    setNewDrive({ title: "", ctc: "", date: "", avatar: "" });
  };

  const handleEditOpen = (drive) => {
    setEditData(drive);
    setSelectedId(drive.id);
    setEdit(true);
  };
  const editCloseDialog = () => {
    setEdit(false);
    setEditData({ title: "", ctc: "", date: "", avatar: "" });
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
    upcomingDrives.push({ ...newDrive, id: upcomingDrives.length + 1 });
    setOpen(false);
    setNewDrive({ title: "", ctc: "", date: "", avatar: "" });
  };

  const handleEditDrive = () => {
    upcomingDrives = upcomingDrives.map((drive) =>
      drive.id === selectedId ? { ...editData, id: selectedId } : drive
    );
    setEdit(false);
    setEditData({ title: "", ctc: "", date: "", avatar: "" });
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
                      {drive.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {drive.ctc}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        style={{ marginTop: "0.5rem" }}
                      >
                        {drive.date}
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

      {/* Completed Drives */}
      <section>
        <Typography
          variant="h5"
          style={{
            color: theme.palette.warning.main,
            fontWeight: 600,
            marginBottom: "1rem",
          }}
        >
          Completed Drives
        </Typography>
        <List
          sx={{
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
                      {drive.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {drive.ctc}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        style={{ marginTop: "0.5rem" }}
                      >
                        {drive.date}
                      </Typography>
                    </>
                  }
                />
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
            label="Title"
            name="title"
            fullWidth
            variant="outlined"
            value={newDrive.title}
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
            fullWidth
            variant="outlined"
            value={newDrive.date}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Avatar URL"
            name="avatar"
            fullWidth
            variant="outlined"
            value={newDrive.avatar}
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

      {/* Edit drive details dialog */}
      <Dialog open={edit} onClose={editCloseDialog}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            variant="outlined"
            value={editData.title}
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
            fullWidth
            variant="outlined"
            value={editData.date}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            label="Avatar URL"
            name="avatar"
            fullWidth
            variant="outlined"
            value={editData.avatar}
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
