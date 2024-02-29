import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserTable() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://data-c3068-default-rtdb.firebaseio.com/users.json');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    console.log("Search term:", searchTerm); // Add this line to check the search term
    setSearchTerm(searchTerm);
  };
  

  const filteredUsers = Object.values(users).filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2>User Data</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
