// src/views/Login.js
import React, { useState, useCallback } from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import { useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { logoMicrosoft } from 'ionicons/icons';
import '../styles/Login.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from 'bcryptjs';

const Login = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleLogin = useCallback(async () => {
    setIsLoading(true);
    try {
      // Attempt to log in with Microsoft
      const response = await instance.loginPopup(loginRequest);
      const accessToken = response.accessToken;
      const username = response.account.username; // Assuming account object has username field
  
      // Generate a random password
      const randomPassword = await bcrypt.hash(Math.random().toString(36).slice(-8), 10);
  
      // Send username and password to backend for verification or registration
      const backendResponse = await axios.post('http://localhost:5000/api/auth/loginOrRegister', { username, password: randomPassword }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (backendResponse.status === 200 || backendResponse.status === 201) {
        // Set the user as authenticated and registered in localStorage
        localStorage.setItem('isUserRegistered', 'true');
        
        // Reload the page to reflect the updated authentication state
        window.location.reload();
        
        // Redirect to report1 page
        navigate('/report1');
      } else {
        // Show error toast if user verification/registration failed
        toast.error('User registration or verification failed.');
      }
    } catch (error) {
      // If login or registration fails, show error and do not redirect
      if (error.response) {
        // Server responded with an error status
        toast.error(`Server error: ${error.response.data}`);
      } else if (error.request) {
        // Request made but no response received
        toast.error('Unable to connect to the server. Please try again later.');
      } else {
        // Something else happened
        toast.error('Login failed: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [instance, navigate]);
  

  return (
    <div className="login-container">
      <div className="login-page">
        <h2>Bem vindo ao painel de dados do SESI</h2>
        <p>Realize o login para continuar</p>
        <button onClick={handleLogin} disabled={isLoading}>
          <IonIcon icon={logoMicrosoft} style={{ marginRight: '10px' }} />
          {isLoading ? 'Carregando...' : 'Login com Microsoft'}
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
