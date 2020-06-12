import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './login';
import Chat from './chat';
import Register from './register';
import ChatProf from './profChat';
import Splash from './splash';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{headerShown : false}}
      >
        <Stack.Screen
          name="Splash"
          component={Splash}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Register"
          component={Register}
        />
        <Stack.Screen 
          name="Chat" 
          component={Chat} 
        />
        <Stack.Screen 
          name="profChat" 
          component={ChatProf} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

