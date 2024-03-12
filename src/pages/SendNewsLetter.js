import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
// import './styles.css'; // Import your custom CSS file

const NewsLetter = () => {
  const [formData, setFormData] = useState({
    userName: '',
    message: ''
  });
  const [updates, setUpdates] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const firebaseURL = 'https://followers-ba029-default-rtdb.firebaseio.com/updates.json';
    try {
      const response = await fetch(firebaseURL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const updatesArray = Object.entries(data).map(([id, value]) => ({ id, ...value }));
      setUpdates(updatesArray);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const getCurrentTime = () => {
    const currentTime = new Date();
    return currentTime.toLocaleString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }
    if (!formData.message.trim()) {
      toast.error('Please enter a message');
      return;
    }
    const firebaseURL = 'https://followers-ba029-default-rtdb.firebaseio.com/updates.json';
    try {
      if (editMode) {
        await fetch(`https://followers-ba029-default-rtdb.firebaseio.com/updates/${editId}.json`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: formData.message,
            timestamp: getCurrentTime()
          })
        });
        toast.success('Message updated successfully');
        setEditMode(false);
        setEditId(null);
      } else {
        const response = await fetch(firebaseURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: formData.message,
            userDetails: {
              userName: formData.userName
            },
            timestamp: getCurrentTime() // Include current time
          })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data sent successfully:', data);
        form.reset(); // Reset form fields
        toast.success('Message sent successfully');
      }
      setFormData({  // Clear form fields
        userName: '',
        message: ''
      });
      fetchData(); // Fetch updated data after submitting
    } catch (error) {
      console.error('Error sending data:', error);
      toast.error('Error occurred while sending message');
    }
  };
  

  const handleEdit = (update) => {
    setEditMode(true);
    setEditId(update.id);
    setFormData({
      userName: update.userDetails.userName,
      message: update.message
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Enter password',
      input: 'password',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Remove',
      showLoaderOnConfirm: true,
      preConfirm: (password) => {
        if (password === 'Remove') {
          return Swal.fire({
            title: 'Are you sure you want to delete this message?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              return fetch(`https://followers-ba029-default-rtdb.firebaseio.com/updates/${id}.json`, {
                method: 'DELETE'
              }).then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                toast.success('Message deleted successfully');
                fetchData();
              }).catch(error => {
                console.error('Error deleting data:', error);
                toast.error('Error occurred while deleting message');
              });
            }
          });
        } else {
          return Swal.fire({
            icon: 'error',
            title: 'Incorrect password!',
            text: 'Please enter correct password'
          });
        }
      }
    });
  };
  return (
    <div className="container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="col s12" noValidate>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="userName"
              type="text"
              className="validate"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
            <label htmlFor="userName">Your Name</label>
            <span className="helper-text" data-error="Please provide your name"></span>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <textarea
              id="message"
              className="materialize-textarea"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <label htmlFor="message">Message</label>
            <span className="helper-text" data-error="Please enter a message"></span>
          </div>
        </div>
        <button type="submit" className="btn waves-effect waves-light">{editMode ? 'Update Message' : 'Send Message'}</button>
        {editMode && <button type="button" className="btn waves-effect waves-light red" onClick={() => setEditMode(false)}>Cancel</button>}
      </form>
      <div className="row">
        <table className="highlight">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Message</th>
              <th>Timestamp</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {updates.map((update) => (
              <tr key={update.id}>
                <td>{update.userDetails.userName}</td>
                <td>{update.message}</td>
                <td>{update.timestamp}</td>
                <td>
                  <button
                    className="btn waves-effect waves-light"
                    onClick={() => handleEdit(update)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn waves-effect waves-light red"
                    onClick={() => handleDelete(update.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewsLetter;
