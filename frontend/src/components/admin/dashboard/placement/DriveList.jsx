import * as React from "react";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Import any icon you like

const upcomingDrives = [
  {
    id: 1,
    title: "Accenture - Associate Software Developer",
    ctc: "Expected CTC: 4.5LPA",
    date: "Drive Date: 5th Nov 24",
    avatar: "/companies/companies.png",
  },
  {
    id: 2,
    title: "Summer BBQ",
    ctc: "Join us for a fun summer BBQ!",
    date: "Drive Date: 10th Nov 24",
    avatar: "/static/images/avatar/2.jpg",
  },
  {
    id: 3,
    title: "Oui Oui",
    ctc: "Sandra Adams",
    date: "Drive Date: 15th Nov 24",
    avatar: "/static/images/avatar/3.jpg",
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
  {
    id: 2,
    title: "Summer BBQ",
    ctc: "Join us for a fun summer BBQ!",
    date: "Drive Date: 20th Oct 24",
    avatar: "/static/images/avatar/2.jpg",
  },
  {
    id: 3,
    title: "Oui Oui",
    ctc: "Sandra Adams",
    date: "Drive Date: 25th Oct 24",
    avatar: "/static/images/avatar/3.jpg",
  },
];

const DriveList = () => {
  const theme = useTheme();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "20px" }}>
      {/* Upcoming Drives */}
      <section>
        <Typography variant="h5" style={{ color: theme.palette.primary.main, fontWeight: 600, marginBottom: "1rem" }}>
          Upcoming Drives
        </Typography>
        <List sx={{ 
          bgcolor: "background.paper", 
          borderRadius: "8px", 
          boxShadow: theme.palette.mode === 'dark' ? "0 4px 8px rgba(255, 255, 255, 0.3)" : theme.shadows[3], 
          padding: "10px" 
        }}>
          {upcomingDrives.map((drive) => (
            <React.Fragment key={drive.id}>
              <ListItem
                alignItems="flex-start"
                sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}
              >
                <ListItemAvatar>
                  <Avatar alt={drive.title} src={drive.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="h6" style={{ fontWeight: 600 }}>{drive.title}</Typography>}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {drive.ctc}
                      </Typography>
                      <Typography variant="caption" display="block" style={{ marginTop: "0.5rem" }}>
                        {drive.date}
                      </Typography>
                    </>
                  }
                />
                <IconButton edge="end" aria-label="details">
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
        <Typography variant="h5" style={{ color: theme.palette.warning.main, fontWeight: 600, marginBottom: "1rem" }}>
          Completed Drives
        </Typography>
        <List sx={{ 
          bgcolor: "background.paper", 
          borderRadius: "8px", 
          boxShadow: theme.palette.mode === 'dark' ? "0 4px 8px rgba(255, 255, 255, 0.3)" : theme.shadows[3], 
          padding: "10px" 
        }}>
          {completedDrives.map((drive) => (
            <React.Fragment key={drive.id}>
              <ListItem
                alignItems="flex-start"
                sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}
              >
                <ListItemAvatar>
                  <Avatar alt={drive.title} src={drive.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="h6" style={{ fontWeight: 600 }}>{drive.title}</Typography>}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {drive.ctc}
                      </Typography>
                      <Typography variant="caption" display="block" style={{ marginTop: "0.5rem" }}>
                        {drive.date}
                      </Typography>
                    </>
                  }
                />
                <IconButton edge="end" aria-label="details">
                  <ArrowForwardIcon />
                </IconButton>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </section>
    </div>
  );
};

export default DriveList;
