// UserDashboard.js
import React from 'react';

const UserDashboard = ({ user, onLogout }) => {
  return (
    <div>
      <h2>Welcome, {user.username} (User)</h2>
      <button onClick={onLogout}>Logout</button>
      {/* User specific components */}
      <p>This is the user dashboard.</p>
    </div>
  );
};

export default UserDashboard;
