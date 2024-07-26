import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const { email } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileResponse = await axios.get(`http://localhost:5000/api/candidate/${email}`);
        setProfile(profileResponse.data);

        const statusesResponse = await axios.get('http://localhost:5000/api/status');
        setStatuses(statusesResponse.data);
      } catch (error) {
        console.error('Error fetching profile or statuses:', error);
      }
    };

    fetchProfile();
  }, [email]);

  const handleStatusChange = async (e) => {
    try {
      await axios.put(`/candidates/update/admin/${email}`, {
        id_status: parseInt(e.target.value),
        active: profile.active
      });
      // Update local state
      setProfile({...profile, name_status: e.target.options[e.target.selectedIndex].text});
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleActiveToggle = async () => {
    try {
      await axios.put(`/candidates/update/admin/${email}`, {
        id_status: statuses.find(s => s.name_status === profile.name_status).id_status,
        active: !profile.active
      });
      // Update local state
      setProfile({...profile, active: !profile.active});
    } catch (error) {
      console.error('Error toggling active status:', error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>Profile for {profile.first_name} {profile.last_name}</h2>
      <p>Email: {profile.email}</p>
      <p>Gender: {profile.gender}</p>
      <p>Registration Date: {new Date(profile.registration_date).toLocaleDateString()}</p>
      
      <select value={statuses.find(s => s.name_status === profile.name_status)?.id_status} onChange={handleStatusChange}>
        {statuses.map(status => (
          <option key={status.id_status} value={status.id_status}>
            {status.name_status}
          </option>
        ))}
      </select>
      
      <button onClick={handleActiveToggle}>
        {profile.active ? 'Desactivar' : 'Activar'}
      </button>
    </div>
  );
};

export default Profile;