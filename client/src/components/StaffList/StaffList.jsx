import React, { useState } from 'react';
import axios from 'axios';

const StaffList = ({ staffMembers, onUpdate }) => {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || '/api';

  const handleViewDetails = (staff) => {
    setSelectedStaff(staff);
  };

  const handleRoleChange = async (email, newRole) => {
    try {
      await axios.put(`${API_URL}/staff/${email}`, { id_role: newRole });
      onUpdate();
      setSelectedStaff(null);
    } catch (error) {
      console.error('Error updating staff role:', error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffMembers.map((staff) => (
            <tr key={staff.id_staff}>
              <td>{`${staff.first_name} ${staff.last_name}`}</td>
              <td>{staff.email}</td>
              <td>{staff.name_role}</td>
              <td>
                <button onClick={() => handleViewDetails(staff)}>👁️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStaff && (
        <div className="popup">
          <h3>Staff Details</h3>
          <p>Name: {`${selectedStaff.first_name} ${selectedStaff.last_name}`}</p>
          <p>Email: {selectedStaff.email}</p>
          <label>
            Role:
            <select 
              value={selectedStaff.name_role} 
              onChange={(e) => handleRoleChange(selectedStaff.email, e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
            </select>
          </label>
          <button onClick={() => setSelectedStaff(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default StaffList;