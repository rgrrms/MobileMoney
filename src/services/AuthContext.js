import React from 'react';

const AuthContext = React.createContext();

export const AuthProvider: React.FC = ({ children }) => (
  <AuthContext.Provider value={{ signed: false }}>
    {children}
  </AuthContext.Provider>
);

export default AuthContext;