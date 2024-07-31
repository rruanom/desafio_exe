import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaffList from '../../components/StaffList';
import CreateStaffForm from '../../components/CreateStaffForm';
import { Container, Typography, Button, Box } from '@mui/material';

const Staff = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    fetchStaffMembers();
  }, []);

  const fetchStaffMembers = async () => {
    try {
      const response = await axios.get(`${API_URL}/staff`);
      setStaffMembers(response.data);
    } catch (error) {
      console.error('Error fetching staff members:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Staff
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => setShowCreateForm(true)}
          sx={{ mb: 2 }}
        >
          Nuevo miembro
        </Button>
        {showCreateForm && <CreateStaffForm onClose={() => setShowCreateForm(false)} onCreated={fetchStaffMembers} />}
        <StaffList 
          staffMembers={staffMembers} 
          onUpdate={fetchStaffMembers} 
        />
      </Box>
    </Container>
  );
};

export default Staff;