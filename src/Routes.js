import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TimeLine from "./pages/TimeLine";
import CreateOrUpdateItem from "./pages/CreateOrUpdateItem";
import Login from "./pages/Login";
import AuthContext from "./services/AuthContext";
import CreateAccount from "./pages/CreateAccount";
import {MaterialIcons as Icon} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";

const AppStack = createStackNavigator();

const Routes = ({tokenParams, createOrEdit}) => {
  return (
    <NavigationContainer>
      <AuthContext.Provider>
        <AppStack.Navigator>
              <AppStack.Screen name="Login" component={Login} options={{headerShown: false}} />
              <AppStack.Screen name="TimeLine"
                               component={TimeLine}
                               options={{
                                 title: 'MobileMoney',
                                 headerStyle: {
                                   backgroundColor: '#192537'
                                 },
                                 headerTitleStyle: {
                                   fontWeight: 'bold',
                                 },
                                 headerRight:  () => (
                                   <TouchableOpacity>
                                     <Icon name="add" size={32} color="#34cb79" />
                                   </TouchableOpacity>
                                 ),
                                 headerTintColor: '#fff',
                                 headerShown: true}} />
              <AppStack.Screen name="CreateOrUpdateItem" component={CreateOrUpdateItem} options={{headerShown: false}} />
              <AppStack.Screen name="CreateAccount" component={CreateAccount} options={{headerShown: false}} />
        </AppStack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  )
}

export default Routes;