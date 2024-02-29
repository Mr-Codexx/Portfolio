// SignUp.js
import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleSignUp = async () => {
    try {
      const confirmation = await firebase.auth().signInWithPhoneNumber(phoneNumber);
      setConfirmationResult(confirmation);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      await confirmationResult.confirm(verificationCode);
      console.log('Phone number verified successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter your phone number" />
      <button onClick={handleSignUp}>Send OTP</button>
      {confirmationResult && (
        <div>
          <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} placeholder="Enter OTP" />
          <button onClick={handleVerifyCode}>Verify OTP</button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
