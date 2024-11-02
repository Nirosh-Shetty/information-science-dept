import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import { styled } from "@mui/system";
import { useRecoilState } from "recoil";
import { adminAtom } from "../../../../../recoil/atoms/adminAtom";
import EditIcon from "@mui/icons-material/Edit";

// Sample animated avatars (Use your own avatar image URLs)
const avatarOptions = [
  { src: "/avatars/femaleavatar.jpg", alt: "Avatar 1" },
  { src: "/avatars/maleavatar2.webp", alt: "Avatar 2" },
  { src: "/avatars/maleavatar.png", alt: "Avatar 3" },
  { src: "/avatars/femaleavatar2.jpg", alt: "Avatar 4" },
];

const ProfileContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(3),
  borderRadius: "8px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  maxWidth: 800,
}));

const ProfileImage = styled(Avatar)({
  width: 120,
  height: 120,
  marginBottom: 20,
  cursor: "pointer", // Indicate that the avatar is clickable
});

// const ProfileField = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(2),
//   borderRadius: "8px",
//   backgroundColor: "#f7f7f7",
//   marginBottom: theme.spacing(2),
//   boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
// }));

const ProfileField = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: "8px",
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[800] : "#f7f7f7",
  marginBottom: theme.spacing(2),
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 1px 3px rgba(255, 255, 255, 0.1)"
      : "0 1px 3px rgba(0, 0, 0, 0.1)",
}));

export default function ProfilePage() {
  const [admin, setAdmin] = useRecoilState(adminAtom);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [editData, setEditData] = useState(admin);

  const handleEditOpen = () => {
    setEditData(admin);
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setEditData(admin);
    setIsEditOpen(false);
  };

  const handleSave = () => {
    setAdmin(editData);
    setIsEditOpen(false);
  };

  const handleAvatarOpen = () => setIsAvatarOpen(true);
  const handleAvatarClose = () => setIsAvatarOpen(false);

  const handleAvatarSelect = (src) => {
    setEditData({ ...editData, avatar: src }); // Update avatar in editData
    handleAvatarClose(); // Close the avatar selection dialog
  };

  return (
    <ProfileContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ margin: "auto", marginBottom: 2 }}
        >
          <ProfileImage
            src={editData.avatar || "https://via.placeholder.com/120"}
            alt="Profile Picture"
            onClick={handleAvatarOpen} // Open avatar selection on click
          />
          <Typography variant="h4" gutterBottom>
            {editData.fullName}
          </Typography>
        </Box>
        <IconButton onClick={handleEditOpen} color="primary">
          <EditIcon />
        </IconButton>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ProfileField>
            <Typography variant="subtitle2" color="textSecondary">
              Full Name
            </Typography>
            <Typography variant="body1">{editData.fullName}</Typography>
          </ProfileField>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileField>
            <Typography variant="subtitle2" color="textSecondary">
              Username
            </Typography>
            <Typography variant="body1">{editData.username}</Typography>
          </ProfileField>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileField>
            <Typography variant="subtitle2" color="textSecondary">
              Email
            </Typography>
            <Typography variant="body1">{editData.email}</Typography>
          </ProfileField>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileField>
            <Typography variant="subtitle2" color="textSecondary">
              Phone Number
            </Typography>
            <Typography variant="body1">{editData.phoneNumber}</Typography>
          </ProfileField>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileField>
            <Typography variant="subtitle2" color="textSecondary">
              Department
            </Typography>
            <Typography variant="body1">
              {editData.department || "No department assigned"}
            </Typography>
          </ProfileField>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileField>
            <Typography variant="subtitle2" color="textSecondary">
              Role
            </Typography>
            <Typography variant="body1">{editData.role || "N/A"}</Typography>
          </ProfileField>
        </Grid>
        <Grid item xs={12}>
          <ProfileField>
            <Typography variant="subtitle2" color="textSecondary">
              Bio
            </Typography>
            <Typography variant="body1">
              {editData.bio || "Add a bio in edit mode"}
            </Typography>
          </ProfileField>
        </Grid>
      </Grid>

      {/* Avatar Selection Dialog */}
      <Dialog
        open={isAvatarOpen}
        onClose={handleAvatarClose}
        PaperProps={{
          sx: {
            width: "400px", // Adjust the width as needed
            maxWidth: "80%", // Make sure it doesn't exceed the screen size
          },
        }}
      >
        <DialogTitle>Select an Avatar</DialogTitle>
        <DialogContent>
          <List>
            {avatarOptions.map((avatar) => (
              <ListItem
                button
                onClick={() => handleAvatarSelect(avatar.src)}
                key={avatar.alt}
                className="hover:cursor-pointer"
              >
                <ListItemIcon>
                  <Avatar src={avatar.src} alt={avatar.alt} />
                </ListItemIcon>
                <Typography>{avatar.alt}</Typography>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAvatarClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box display="flex" alignItems="center" marginBottom={2}>
            <ProfileImage
              src={editData.avatar || "https://via.placeholder.com/120"}
              alt="Profile Picture"
              onClick={handleAvatarOpen} // Open avatar selection on click
              sx={{ marginRight: 2 }}
            />
            <Button variant="outlined" onClick={handleAvatarOpen}>
              Change Avatar
            </Button>
          </Box>
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            value={editData.fullName}
            onChange={(e) =>
              setEditData({ ...editData, fullName: e.target.value })
            }
          />
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={editData.username}
            onChange={(e) =>
              setEditData({ ...editData, username: e.target.value })
            }
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={editData.email}
            onChange={(e) =>
              setEditData({ ...editData, email: e.target.value })
            }
          />
          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            value={editData.phoneNumber}
            onChange={(e) =>
              setEditData({ ...editData, phoneNumber: e.target.value })
            }
          />
          <TextField
            label="Bio"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={editData.bio || ""}
            onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </ProfileContainer>
  );
}
