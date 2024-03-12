import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import CustomToast from './CustomToast';
import { ToastContainer, toast } from 'react-toastify';

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    updates: ''
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


    if (!formData.updates.trim()) {
      toast.error('Please enter a message');
      return;
    }

    const firebaseURL = 'https://followers-ba029-default-rtdb.firebaseio.com/updates.json';

    try {
      const response = await fetch(firebaseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: formData.message,
          userDetails: {
            userName: formData.name
          }
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Data sent successfully:', data);
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
      <form onSubmit={handleSubmit} className="col s12" noValidate>
        {/* Your form fields */}
      </form>
      <ToastContainer />
    </div>
  );
};

export default UserRegistrationForm;
