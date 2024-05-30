import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageProfile() {
  const [profile, setProfile] = useState({ bio: '', qualifications: '', availability: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/profile')
      .then(response => {
        setProfile(response.data);
      })
      .catch(() => {
        setError('Failed to load profile');
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/profile', profile)
      .then(() => {
        alert('Profile updated successfully');
      })
      .catch(() => {
        setError('Profile update failed');
      });
  };

  return (
    <div>
      <h1>Manage Profile</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Bio:</label>
          <textarea className="form-control" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Qualifications:</label>
          <textarea className="form-control" value={profile.qualifications} onChange={(e) => setProfile({ ...profile, qualifications: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Availability:</label>
          <textarea className="form-control" value={profile.availability} onChange={(e) => setProfile({ ...profile, availability: e.target.value })} />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}

export default ManageProfile;
