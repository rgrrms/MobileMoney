import React from 'react';
import { StatusBar } from 'react-native';
import Routes from "./src/Routes";
import { AuthProvider } from "./src/services/AuthContext";

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
}

export default App;
