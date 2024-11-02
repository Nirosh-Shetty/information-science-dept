import React, { useState } from 'react';
import {
  Box, Typography, TextField, Paper, Avatar, Button, Dialog,
  DialogActions, DialogContent, DialogTitle, Grid, IconButton
} from '@mui/material';
import { styled } from '@mui/system';
import { useRecoilState } from 'recoil';
import { adminAtom } from '../../../../../recoil/atoms/adminAtom';
import EditIcon from '@mui/icons-material/Edit';

const ProfileContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(3),
  borderRadius: '8px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  maxWidth: 800,
}));

const ProfileImage = styled(Avatar)({
  width: 120,
  height: 120,
  marginBottom: 20,
});

const ProfileField = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '8px',
  backgroundColor: '#f7f7f7',
  marginBottom: theme.spacing(2),
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
}));

export default function ProfilePage() {
  const [admin, setAdmin] = useRecoilState(adminAtom);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(admin);

  const handleEditOpen = () => setIsEditOpen(true);
  const handleEditClose = () => setIsEditOpen(false);

  const handleSave = () => {
    setAdmin(editData);
    setIsEditOpen(false);
  };

  return (
    <ProfileContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" flexDirection="column" alignItems="center">
          <ProfileImage src={admin.avatar || 'https://via.placeholder.com/120'} alt="Profile Picture" />
          <Typography variant="h5" gutterBottom>
            {admin.fullName}
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
            <Typography variant="body1">{admin.fullName}</Typography>
          </ProfileField>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileField>
            <Typography variant="subtitle2" color="textSecondary">
              Username
            </Typography>
            <Typography variant="body1">{admin.username}</Typography>
          </ProfileField>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileField>
            <Typography variant="subtitle2" color="textSecondary">
              Email
            </Typography>
            <Typography variant="body1">{admin.email}</Typography>
          </ProfileField>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileField>
            <Typography variant="subtitle2" color="textSecondary">
              Phone Number
            </Typography>
            <Typography variant="body1">{admin.phoneNumber}</Typography>
          </ProfileField>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileField>
            <Typography variant="subtitle2" color="textSecondary">
              Account Created
            </Typography>
            <Typography variant="body1">{new Date(admin.createdAt).toLocaleString()}</Typography>
          </ProfileField>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileField>
            <Typography variant="subtitle2" color="textSecondary">
              Last Updated
            </Typography>
            <Typography variant="body1">{new Date(admin.updatedAt).toLocaleString()}</Typography>
          </ProfileField>
        </Grid>
        <Grid item xs={12}>
          <ProfileField>
            <Typography variant="subtitle2" color="textSecondary">
              Bio
            </Typography>
            <Typography variant="body1">{admin.bio || 'Add a bio in edit mode'}</Typography>
          </ProfileField>
        </Grid>
      </Grid>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            value={editData.fullName}
            onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
          />
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={editData.username}
            onChange={(e) => setEditData({ ...editData, username: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={editData.email}
            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
          />
          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            value={editData.phoneNumber}
            onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })}
          />
          <TextField
            label="Bio"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={editData.bio || ''}
            onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </ProfileContainer>
  );
}
