import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../components/Login';
import Singup from '../components/Signup';
import React from 'react';
import { useContext } from 'react';
import { ContextProvider } from '../context/ContextProvider';
import Home from '../components/Home'
import DriverNotification from '../components/driverNotification';
import RouteMap from '../components/routeMap';
import LiveLocationMap from '../components/userLiveLocation';
import StudentDashboard from '../components/StudentDashboard';
import DriverDashBoard from '../components/DriverDashBoard';

const stack = createNativeStackNavigator();

function Stack(){
  return (
    <ContextProvider>
      <stack.Navigator>
        
      <stack.Screen
           name="Login"
           component={Login}
           options={{
           headerShown: false,
       }}/>

      <stack.Screen
           name="Home"
           component={Home}
           options={{
           headerShown: false,
       }}/>


      <stack.Screen
          name="Singup"
          component={Singup}
          options={{
            headerShown: false,
          }}/>
        
        <stack.Screen
          name="notification"
          component={DriverNotification}
          options={{
            headerShown:true
          }}
          />

          <stack.Screen 
          name='StudentDashboard'
          component={StudentDashboard}
          />
            
          <stack.Screen 
          name='DriverDashBoard'
          component={DriverDashBoard}
          />
          
      </stack.Navigator>
    </ContextProvider>
   
  );
}

export default Stack;