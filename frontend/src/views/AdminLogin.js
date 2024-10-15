// src/views/AdminLogin.js
import React, { useState } from 'react';
import { IonIcon } from '@ionic/react'; // Importing Ionicons
import { lockClosedOutline, personOutline } from 'ionicons/icons'; // Importing specific icons
import { ToastContainer, toast } from 'react-toastify'; // Toast imports
import 'react-toastify/dist/ReactToastify.css'; // Toast CSS
import '../styles/AdminLogin.css'; // Import the styles

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulated authentication: Check for a valid user (hardcoded for demo purposes)
    const validUsername = 'admin';
    const validPassword = '1234';

    if (username === validUsername && password === validPassword) {
      // Simulate successful login
      localStorage.setItem('isAuthenticated', 'true');
      window.location.href = '/admin'; // Redirect after login
    } else {
      // Show a toast message if authentication fails
      toast.error('Usuário não encontrado');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <p>Admin Login</p>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="input-wrapper">
            <IonIcon icon={personOutline} className="icon" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {/* Password Field */}
          <div className="input-wrapper">
            <IonIcon icon={lockClosedOutline} className="icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>

        {/* Toast Container for displaying notifications */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminLogin;
