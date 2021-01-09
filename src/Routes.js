import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TimeLine from "./pages/TimeLine";
import CreateOrUpdateItem from "./pages/CreateOrUpdateItem";
import Login from "./pages/Login";
import AuthContext from "./services/AuthContext";
import CreateAccount from "./pages/CreateAccount";
import Header from "./components/Header";

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AuthContext.Provider>
        <AppStack.Navigator>
          <AppStack.Screen name="Login" component={Login} options={{headerShown: false}} />
          <AppStack.Screen name="TimeLine"
                           component={TimeLine}
                           options={{
                             title: 'MobileMoney',
                             headerBackAllowFontScaling: true,
                             headerStyle: {
                               backgroundColor: '#192537'
                             },
                             headerTitleStyle: {
                               fontWeight: 'bold',
                             },
                             headerRight:  () => (<Header createOrEdit={"create"} />),
                             headerTintColor: '#fff',
                             headerShown: true}} />
          <AppStack.Screen name="CreateOrUpdateItem"
                           component={CreateOrUpdateItem}
                           options={{
                             title: 'MobileMoney',
                             headerStyle: {
                               backgroundColor: '#192537'
                             },
                             headerTitleStyle: {
                               fontWeight: 'bold',
                             },
                             headerTintColor: '#fff',
                             headerShown: true}} />
          <AppStack.Screen name="CreateAccount"
                           component={CreateAccount}
                           options={{
                             title: 'MobileMoney',
                             headerStyle: {
                               backgroundColor: '#192537'
                             },
                             headerTitleStyle: {
                               fontWeight: 'bold',
                             },
                             headerTintColor: '#fff',
                             headerShown: true}}/>
        </AppStack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  )
}

export default Routes;
