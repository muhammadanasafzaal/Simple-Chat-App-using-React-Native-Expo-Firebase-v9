// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';
import ChatScreen2 from './screens/ChatScreen2';
import Users from './screens/Users';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import  { store, persistor } from './store/index.js'

const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen}></Stack.Screen>
            <Stack.Screen  name="Users" component={Users}
            options={{ headerTitleAlign: 'center'
          }}></Stack.Screen>
            <Stack.Screen  name="Chat" component={ChatScreen2}
            options={{ headerTitleAlign: 'center'
          }}></Stack.Screen>

                
          </Stack.Navigator>
          </NavigationContainer>  
          </PersistGate>
        </Provider>    
   
  );
}

