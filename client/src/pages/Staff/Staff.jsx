import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaffList from '../../components/StaffList';
import CreateStaffForm from '../../components/CreateStaffForm';

const Staff = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(10);
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

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = staffMembers.slice(indexOfFirstMember, indexOfLastMember);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="staff-container">
      <h2>Staff Members</h2>
      <button onClick={() => setShowCreateForm(true)}>Create New Staff Member</button>
      {showCreateForm && <CreateStaffForm onClose={() => setShowCreateForm(false)} onCreated={fetchStaffMembers} />}
      <StaffList 
        staffMembers={currentMembers} 
        onUpdate={fetchStaffMembers} 
      />
      <div className="pagination">
        {[...Array(Math.ceil(staffMembers.length / membersPerPage))].map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Staff;