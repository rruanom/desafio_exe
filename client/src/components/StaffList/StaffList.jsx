import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Typography
} from '@mui/material';

const StaffList = ({ staffMembers, onUpdate }) => {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [roles, setRoles] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${API_URL}/role`);
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  const handleViewDetails = (staff) => {
    setSelectedStaff(staff);
  };

  const handleRoleChange = async (email, newRoleId) => {
    try {
      await axios.put(`${API_URL}/staff/${email}`, { id_role: newRoleId });
      onUpdate();
    } catch (error) {
      console.error('Error updating staff role:', error);
    }
  };

  const handleActiveChange = async (email, newActiveStatus) => {
    try {
      await axios.put(`${API_URL}/staff/${email}`, { active: newActiveStatus });
      onUpdate();
    } catch (error) {
      console.error('Error updating staff active status:', error);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Detalles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffMembers.map((staff) => (
              <TableRow key={staff.id_staff}>
                <TableCell>
                  <Typography style={{ color: staff.active ? 'inherit' : 'red' }}>
                    {`${staff.first_name} ${staff.last_name}`}
                  </Typography>
                </TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>{staff.name_role}</TableCell>
                <TableCell>
                  <Button onClick={() => handleViewDetails(staff)}>👁️</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!selectedStaff} onClose={() => setSelectedStaff(null)}>
        <DialogTitle>Detalles</DialogTitle>
        <DialogContent>
          <Typography>Nombre: {selectedStaff?.first_name} {selectedStaff?.last_name}</Typography>
          <Typography>Email: {selectedStaff?.email}</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-select-label">Rol</InputLabel>
            <Select
              labelId="role-select-label"
              value={selectedStaff?.id_role || ''}
              onChange={(e) => handleRoleChange(selectedStaff?.email, e.target.value)}
              label="Role"
            >
              {roles.map((role) => (
                <MenuItem key={role.id_role} value={role.id_role}>
                  {role.name_role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="active-select-label">Activo</InputLabel>
            <Select
              labelId="active-select-label"
              value={selectedStaff?.active}
              onChange={(e) => handleActiveChange(selectedStaff?.email, e.target.value)}
              label="Active"
            >
              <MenuItem value={true}>Sí</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedStaff(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StaffList;