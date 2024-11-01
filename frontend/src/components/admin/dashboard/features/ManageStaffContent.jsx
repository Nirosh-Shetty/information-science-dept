import { Box, Typography, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { styled } from '@mui/system';
import { useState } from 'react';

const StyledTableContainer = styled(TableContainer)({
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  overflow: 'hidden',
  border: '1px solid #ddd',
  marginTop: '16px',
});

const ManageStaffContent = () => {
  const [staffList, setStaffList] = useState([
    { id: 1, name: 'John Doe', position: 'Manager', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', position: 'Developer', email: 'jane@example.com' },
    { id: 3, name: 'Sam Wilson', position: 'Designer', email: 'sam@example.com' },
  ]);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', position: '', email: '' });
  const [editMode, setEditMode] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setFormData({ name: '', position: '', email: '' });
    setEditMode(false);
  };

  const handleAddStaff = () => {
    if (editMode) {
      setStaffList(staffList.map(staff => staff.id === selectedStaffId ? { ...formData, id: selectedStaffId } : staff));
    } else {
      const newStaff = { ...formData, id: staffList.length + 1 };
      setStaffList([...staffList, newStaff]);
    }
    handleCloseForm();
  };

  const handleEditStaff = (staff) => {
    setFormData(staff);
    setSelectedStaffId(staff.id);
    setEditMode(true);
    handleOpenForm();
  };

  const handleDeleteStaff = () => {
    setStaffList(staffList.filter((staff) => staff.id !== selectedStaffId));
    setDeleteDialogOpen(false);
  };

  return (
    <Box p={1}>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleOpenForm}>
        Add Staff
      </Button>

      <StyledTableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffList.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.position}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton color="primary" onClick={() => handleEditStaff(staff)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => { setSelectedStaffId(staff.id); setDeleteDialogOpen(true); }}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/* Add/Edit Staff Dialog */}
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>{editMode ? 'Edit Staff' : 'Add Staff'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Position"
            fullWidth
            variant="outlined"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="primary">Cancel</Button>
          <Button onClick={handleAddStaff} variant="contained" color="primary">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Staff</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this staff member?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleDeleteStaff} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageStaffContent;
