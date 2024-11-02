import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function DriveList() {
  return (
    <>
      <h1 style={{ fontSize: 30, color: "#84CEE4", fontWeight: "bold" }}>
        Upcomming
      </h1>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          // height: 200,
          // minHeight: 200,
          bgcolor: "background.paper",
        }}
      >
        <ListItem
          alignItems="flex-start"
          // sx={{ scale: 1.1 }}
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/companies/companies.png" />
          </ListItemAvatar>
          <ListItemText
            primary="Accenture - Assosiate Software Developer"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary", display: "inline" }}
                ></Typography>
                <div>
                  <ul>
                    <li>Expected CTC : 4.5LPA</li>
                    <li>Drive Date : 5th Nov 24</li>
                    <li>2025 Batch</li>
                  </ul>
                </div>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary", display: "inline" }}
                >
                  to Scott, Alex, Jennifer
                </Typography>
                <div>hhhh</div>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary", display: "inline" }}
                >
                  Sandra Adams
                </Typography>
                {" — Do you have Paris recommendations? Have you ever…"}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
      <h1 style={{ fontSize: 30, color: "#E6B08E", fontWeight: "bold" }}>
        Completed
      </h1>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          // height: 200,
          // minHeight: 200,
          bgcolor: "background.paper",
        }}
      >
        <ListItem
          alignItems="flex-start"
          // sx={{ scale: 1.1 }}
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/companies/companies.png" />
          </ListItemAvatar>
          <ListItemText
            primary="Accenture - Assosiate Software Developer"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary", display: "inline" }}
                ></Typography>
                <div>
                  <ul>
                    <li>Expected CTC : 4.5LPA</li>
                    <li>Drive Date : 5th Nov 24</li>
                  </ul>
                </div>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary", display: "inline" }}
                >
                  to Scott, Alex, Jennifer
                </Typography>
                <div>hhhh</div>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary", display: "inline" }}
                >
                  Sandra Adams
                </Typography>
                {" — Do you have Paris recommendations? Have you ever…"}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </>
  );
}
