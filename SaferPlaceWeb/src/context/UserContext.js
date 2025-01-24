import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User info state
  const [acess_token, setToken] = useState(null); // Token state
  const [loading, setLoading] = useState(true);

  // Mock function to check session persistence
  const fetchSession = async () => {
    try {
      const response = await fetch('/api/session'); // Replace with your endpoint
      if (response.ok) {
        const data = await response.json();
        setUser(data.user_info);
        setToken(data.access_token);
      }
    } catch (error) {
      console.error('Error fetching session:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession(); // Check session on component mount
  }, []);

  const login = (userData, userToken) => {
    setUser(userData); // Save user info
    setToken(userToken); // Save token
    localStorage.setItem('token', userToken); // Optional: persist token
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token'); // Optional: clear persisted token
  };

  return (
    <UserContext.Provider value={{ user, acess_token, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
