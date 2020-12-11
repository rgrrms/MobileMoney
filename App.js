import React from 'react';
import { StatusBar } from 'react-native';
import Routes from "./src/Routes";
import { AuthProvider } from "./src/services/AuthContext";
import {Cinzel_400Regular, Cinzel_700Bold, useFonts} from "@expo-google-fonts/cinzel";
import { JosefinSans_400Regular } from "@expo-google-fonts/josefin-sans";
import {AppLoading} from "expo";


const App = () => {
  const [fontsLoaded] = useFonts({Cinzel_400Regular, Cinzel_700Bold, JosefinSans_400Regular})

  if (!fontsLoaded){
    return <AppLoading />
  }


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
