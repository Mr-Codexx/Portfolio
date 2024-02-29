import React, { useState, useEffect } from 'react';
import UserRegistrationForm from './UserRegistrationform';
import UserData from './UserData';
import './Dashboard.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ParentComponent = () => {
  const [usersData, setUsersData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchUsersData(); // Call fetchUsersData when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  const fetchUsersData = () => {
    // Implement logic to fetch user data from the server
    // For example:
    fetch('https://data-c3068-default-rtdb.firebaseio.com/users.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const usersArray = data ? Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })) : [];
        setUsersData(usersArray);
      })
      .catch(error => console.error('Error fetching user data:', error));
  };

  return (
    <div>
      <Button variant="success" onClick={handleShow}>
        View Users
      </Button>

      <Modal show={show}
      // {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>All Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserData usersData={usersData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
      <UserRegistrationForm fetchUsersData={fetchUsersData} />

    </div>
  );
};

export default ParentComponent;
