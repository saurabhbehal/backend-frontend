// auth.js

export const isAuthenticated = () => {
    // Check if the user is authenticated
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn === 'true';
  };
  