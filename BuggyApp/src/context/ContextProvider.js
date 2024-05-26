/* eslint-disable prettier/prettier */
import React from "react";
import Stack from "../navigators/Stack";
import { createContext } from "react";

const Context = createContext();

const ContextProvider = ({children}) => {

   const [nearestDrivers,setNearestDrivers] = React.useState();
   const [user,setUser] = React.useState();
   const [student,setStudent] = React.useState();
   const [driverInfo,setDriverInfo] = React.useState();
   const [showRoute,setShowRoute] = React.useState();
   const [notification,setNotification] = React.useState({
      data:'no data'
   });
   const [near,setIsNear] = React.useState(false);

   const values = {
      user,
      setUser,
      student,
      setStudent,
      nearestDrivers,
      setNearestDrivers,
      driverInfo,
      setDriverInfo,
      notification,
      setNotification,
      showRoute,
      setShowRoute,
      near,
      setIsNear
   }
  return ( 
  <Context.Provider value={values}>
     {children}
  </Context.Provider>
  )
}

export {Context, ContextProvider};