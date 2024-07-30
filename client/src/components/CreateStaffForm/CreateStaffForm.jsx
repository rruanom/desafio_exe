import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel 
} from '@mui/material';

const CreateStaffForm = ({ onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    id_role: ''
  });
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/staff/add`, formData);
      onCreated();
      onClose();
    } catch (error) {
      console.error('Error creating staff member:', error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Nuevo miebro</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            name="first_name"
            label="First Name"
            value={formData.first_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="last_name"
            label="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="id_role"
              value={formData.id_role}
              onChange={handleChange}
              required
            >
              {roles.map((role) => (
                <MenuItem key={role.id_role} value={role.id_role}>
                  {role.name_role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateStaffForm;