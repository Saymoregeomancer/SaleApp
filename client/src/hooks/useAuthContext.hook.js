import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }

  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (newToken, newUserId) => {
    setToken(newToken);
    setUserId(newUserId);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setIsAuthenticated(false);
  };

  const contextValue = {
    token,
    userId,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
