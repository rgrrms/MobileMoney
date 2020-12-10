import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TimeLine from "./pages/TimeLine";
import CreateOrUpdateItem from "./pages/CreateOrUpdateItem";
import Login from "./pages/Login";
import AuthContext from "./services/AuthContext";
import CreateAccount from "./pages/CreateAccount";

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AuthContext.Provider>
        <AppStack.Navigator>
              <AppStack.Screen name="Login" component={Login} options={{headerShown: false}} />
              <AppStack.Screen name="TimeLine" component={TimeLine} options={{headerShown: false}} />
              <AppStack.Screen name="CreateOrUpdateItem" component={CreateOrUpdateItem} options={{headerShown: false}} />
              <AppStack.Screen name="CreateAccount" component={CreateAccount} options={{headerShown: false}} />
        </AppStack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  )
}

export default Routes;