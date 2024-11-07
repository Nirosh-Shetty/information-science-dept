import { Box, Typography, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { styled } from '@mui/system';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../../../../globals';

const StyledTableContainer = styled(TableContainer)({
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  overflow: 'hidden',
  border: '1px solid #ddd',
  marginTop: '16px',
});

const ManageStaffContent = () => {
  const [staffList, setStaffList] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({ fullName: '',employeeId:'', designation: '', email: '' });
  const [editMode, setEditMode] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);


  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/staff/get`);
        
        setStaffList(response.data);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };
    fetchStaffData();
  }, []);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setFormData({ fullName: '',employeeId:'', designation: '', email: '' });
    setEditMode(false);
  };

  const handleAddStaff = async () => {
    try {
      if (editMode) {
        await axios.put(`${BACKEND_URL}/staff/update`, { ...formData, id: selectedStaffId });
        setStaffList(staffList.map(staff => staff.employeeId === selectedStaffId ? { ...formData, employeeId: selectedStaffId } : staff));
      } else {
        const response = await axios.post(`${BACKEND_URL}/staff/add`, formData);
        setStaffList([...staffList, response.data.staff]);
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error adding/updating staff:", error);
    }
  };

  const handleEditStaff = (staff) => {
    setFormData(staff);
    setSelectedStaffId(staff.employeeId);
    setEditMode(true);
    handleOpenForm();
  };

  const handleDeleteStaff = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/staff/delete/`,{
        params : { id : selectedStaffId }
      })
      setStaffList(staffList.filter((staff) => staff.employeeId !== selectedStaffId));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
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
              <TableCell>Emp Id</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffList.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>{staff.fullName}</TableCell>
                <TableCell>{staff.employeeId}</TableCell>
                <TableCell>{staff.designation}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton color="primary" onClick={() => handleEditStaff(staff)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => { 
                      setSelectedStaffId(staff.employeeId); 
                      setDeleteDialogOpen(true); 
                      }}>
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
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
          <TextField
            disabled = {editMode}
            margin="dense"
            label="Emp Id"
            fullWidth
            variant="outlined"
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
          />
          <TextField
            margin="dense"
            label="designation"
            fullWidth
            variant="outlined"
            value={formData.designation}
            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
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
