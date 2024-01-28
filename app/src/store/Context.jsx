import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export const useStore = () => useContext(Context);

export const ContextProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(token ? jwtDecode(token) : null);
  const [showAuthPopup, toggleAuthPopup] = useState(false);
  const [estates, setEstates] = useState();

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const setShowAuthPopup = (value) => {
    toggleAuthPopup(value);
  };

  return (
    <Context.Provider
      value={{
        user,
        login,
        logout,
        showAuthPopup,
        setShowAuthPopup,
        estates,
        setEstates,
      }}
    >
      {children}
    </Context.Provider>
  );
};
