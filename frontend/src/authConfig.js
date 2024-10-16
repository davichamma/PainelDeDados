// src/authConfig.js
export const msalConfig = {
    auth: {
      clientId: "dd1f2f81-d59f-4d56-8031-3048780a701a",
      authority: "https://login.microsoftonline.com/007de091-a738-4be9-a2c0-a430e69d2e92",
      redirectUri: "http://localhost:3000", // Adjust according to your app URL
    },
  };
  
  export const loginRequest = {
    scopes: ["User.Read"], // Define the Microsoft Graph permissions needed
  };
  