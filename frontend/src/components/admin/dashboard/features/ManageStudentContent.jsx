import React, { useState } from 'react';
import {
  MenuItem, Select, Chip, Typography, Divider, ListSubheader, Button, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, IconButton,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Box
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';

const StyledTableContainer = styled(TableContainer)({
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  overflow: 'hidden',
  border: '1px solid #ddd',
  marginTop: '16px',
});

const StyledSelect = styled(Select)({
  width: 240,
  maxHeight: 240,
  overflow: 'auto',
});

export default function StudentSection() {
  const [selected, setSelected] = useState('');
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editDetails, setEditDetails] = useState({ USN: '', name: '', email: '' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({ USN: '', name: '', email: '' });
  const [deleteUSN, setDeleteUSN] = useState('');

  const dummyData = {
    '2nd Year-2 ISE1': [
      { USN: '1AT21IS001', name: 'John Doe', email: 'john@gmail.com' },
      { USN: '1AT21IS002', name: 'Jane Smith', email: 'jane@gmail.com' },
    ],
    '2nd Year-2 ISE2': [
      { USN: '1AT21IS003', name: 'Sam Wilson', email: 'sam@gmail.com' },
    ],
    '3rd Year-3 ISE1': [
      { USN: '1AT21IS004', name: 'Lisa Ray', email: 'lisa@gmail.com' },
    ],
    '3rd Year-3 ISE2': [
      { USN: '1AT21IS005', name: 'Michael Brown', email: 'michael@gmail.com' },
    ],
    '4th Year-4 ISE1': [
      { USN: '1AT21IS006', name: 'Sarah Connor', email: 'sarah@gmail.com' },
    ],
    '4th Year-4 ISE2': [
      { USN: '1AT21IS007', name: 'Tom Cruise', email: 'tom@gmail.com' },
    ],
  };

  const yearGroups = {
    '2nd Year': ['2 ISE1', '2 ISE2'],
    '3rd Year': ['3 ISE1', '3 ISE2'],
    '4th Year': ['4 ISE1', '4 ISE2'],
  };

  const customColors = {
    '3rd Year': { backgroundColor: '#E5D9F2', color: '#333' },
    '4th Year': { backgroundColor: '#D2E0FB', color: '#333' },
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    setData(dummyData[value] || []);
  };

  const handleDialogOpen = () => {
    setNewStudent({ USN: '', name: '', email: '' });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogSave = () => {
    setData([...data, newStudent]);
    setDialogOpen(false);
  };

  const handleEditOpen = (index) => {
    setEditIndex(index);
    setEditDetails(data[index]);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditSave = () => {
    const updatedData = [...data];
    updatedData[editIndex] = editDetails;
    setData(updatedData);
    setEditDialogOpen(false);
    setEditIndex(null);
  };

  const handleDeleteOpen = (USN) => {
    setDeleteUSN(USN);
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    setData(data.filter((item) => item.USN !== deleteUSN));
    setDeleteDialogOpen(false);
  };

  const renderOptions = () => {
    const options = [];
    Object.entries(yearGroups).forEach(([year, sections], index) => {
      if (index !== 0) options.push(<Divider key={`divider-${index}`} />);
      options.push(
        <ListSubheader key={`header-${year}`} disableSticky>{`${year} (${sections.length})`}</ListSubheader>
      );
      sections.forEach((section) => {
        const value = `${year}-${section}`;
        options.push(
          <MenuItem key={value} value={value}>
            {selected === value && <CheckIcon fontSize="small" style={{ marginRight: 8 }} />}
            <Chip
              size="small"
              label={year}
              sx={{
                backgroundColor: customColors[year]?.backgroundColor,
                color: customColors[year]?.color,
                marginRight: 1,
              }}
            />
            {section}
          </MenuItem>
        );
      });
    });
    return options;
  };

  return (
    <div>
      <Box p={1}>
        <StyledSelect
          displayEmpty
          value={selected}
          onChange={handleChange}
          renderValue={(selected) => {
            if (!selected) return 'Select Year and Section';
            const [year, section] = selected.split('-');
            return (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Chip
                  size="small"
                  label={year}
                  sx={{
                    backgroundColor: customColors[year]?.backgroundColor,
                    color: customColors[year]?.color,
                    marginRight: 1,
                  }}
                />
                <Typography variant="body1">{section}</Typography>
              </div>
            );
          }}
        >
          {renderOptions()}
        </StyledSelect>

        {selected && (
          <div>
            <Button variant="contained" onClick={handleDialogOpen} style={{ marginTop: 16 }}>Add Student</Button>
            <StyledTableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>USN</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow key={row.USN}>
                      <TableCell>{row.USN}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        <IconButton color='primary' onClick={() => handleEditOpen(index)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color='error' onClick={() => handleDeleteOpen(row.USN)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
          </div>
        )}

        {/* Add Student Dialog */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Add Student</DialogTitle>
          <DialogContent>
            <TextField label="USN" fullWidth margin="normal" value={newStudent.USN} onChange={(e) => setNewStudent({ ...newStudent, USN: e.target.value })} />
            <TextField label="Name" fullWidth margin="normal" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
            <TextField label="Email" fullWidth margin="normal" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">Cancel</Button>
            <Button onClick={handleDialogSave} variant="contained" color="primary">Add</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Student Dialog */}
        <Dialog open={editDialogOpen} onClose={handleEditClose}>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogContent>
            <TextField label="USN" fullWidth margin="normal" value={editDetails.USN} onChange={(e) => setEditDetails({ ...editDetails, USN: e.target.value })} />
            <TextField label="Name" fullWidth margin="normal" value={editDetails.name} onChange={(e) => setEditDetails({ ...editDetails, name: e.target.value })} />
            <TextField label="Email" fullWidth margin="normal" value={editDetails.email} onChange={(e) => setEditDetails({ ...editDetails, email: e.target.value })} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="primary">Cancel</Button>
            <Button onClick={handleEditSave} variant="contained" color="primary">Save</Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this student?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose} color="primary">Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}
