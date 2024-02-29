// AllUsers.js
import React, { useState, useEffect } from 'react';

const AllUsers = () => {
  const [usersData, setUsersData] = useState([]);

  const fetchUsersData = () => {
    // Firebase endpoint URL
    const firebaseURL = 'https://data-c3068-default-rtdb.firebaseio.com/users.json';

    // Fetching data from Firebase
    fetch(firebaseURL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Convert data object to an array of user objects
        const usersArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setUsersData(usersArray);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    // Fetch users data when component mounts
    fetchUsersData();
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {usersData.map(user => (
          <li key={user.id}>
            <strong>Name:</strong> {user.name}, <strong>Phone:</strong> {user.phone}, <strong>Email:</strong> {user.email}, <strong>Address:</strong> {user.address}, <strong>Message:</strong> {user.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllUsers;
