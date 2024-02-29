import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import CustomToast from './CustomToast';
import { ToastContainer, toast } from 'react-toastify';

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    const phonePattern = /^\d{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!phonePattern.test(formData.phone)) {
      toast.error('Please enter a valid phone number');
      return;
    }

    if (!emailPattern.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!formData.message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    const firebaseURL = 'https://data-c3068-default-rtdb.firebaseio.com/users.json';

    try {
      const response = await fetch(firebaseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Data sent successfully:', data);
      // fetchUsersData();
      form.reset();
      toast.success(<CustomToast message="Registration successful" />);
    } catch (error) {
      console.error('Error sending data:', error);
      toast.error('Error occurred while registering');
    }
  };

  return (
    <div className="container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input
              id="name"
              type="text"
              className="validate"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="name">Name</label>
            <span className="helper-text" data-error="Please provide a name"></span>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="phone"
              type="tel"
              className="validate"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <label htmlFor="phone">Phone</label>
            <span className="helper-text" data-error="Please provide a valid phone number (10 digits)"></span>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="email"
              type="email"
              className="validate"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email</label>
            <span className="helper-text" data-error="Please provide a valid email address"></span>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="address"
              type="text"
              className="validate"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <label htmlFor="address">Address</label>
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
        <button type="submit" className="btn waves-effect waves-light">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UserRegistrationForm;
