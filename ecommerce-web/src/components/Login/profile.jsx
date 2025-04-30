import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Card} from 'react-bootstrap';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user?.userId) {
      axios.get(`https://ecom-project-1.onrender.com/api/auth/profile/${user.userId}`)
        .then(res => setProfile(res.data));
    }
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="d-flex flex-column align-items-center mt-5">
    <h3 className="mb-4">User Profile</h3>

    <Card className="shadow p-4" style={{ maxWidth: '500px', width: '100%' }}>
      <Card.Body>
        <ul className="list-group">
          <li className="list-group-item"><b>User Id:</b> {profile.userId}</li>
          <li className="list-group-item"><b>Name:</b> {profile.name}</li>
          <li className="list-group-item"><b>Email:</b> {profile.email}</li>
          <li className="list-group-item"><b>Phone:</b> {profile.mobile}</li>
          <li className="list-group-item"><b>Address:</b> {profile.address}</li>
          <li className="list-group-item"><b>Country:</b> {profile.country}</li>
          <li className="list-group-item"><b>State:</b> {profile.state}</li>
          <li className="list-group-item"><b>District:</b> {profile.district}</li>
        </ul>
      </Card.Body>
    </Card>
    <br/><br/>
  </div>
);
};

export default Profile;
