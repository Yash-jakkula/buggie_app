/* eslint-disable prettier/prettier */
import { compose } from "@reduxjs/toolkit";
import config from "../../config";
const registerUser = async(newUser) => {
   
    const newuser = await fetch(`http://${config.IP_ADDRESS}:5000/api/v1/user/newstudent`,{
       method:'POST',
       headers:{
         'Content-Type':'application/json',   
       },
       body:JSON.stringify({
        email:`${newUser.email}`,
        password:`${newUser.password}`,
        name:`${newUser.name}`
       }),
    })
    if(newuser) {
       const data = await newuser.json();
       return data;
    }
    return false;
 }

 const currentUser = async(token) => {
  
   const presentuser = await fetch(`http://${config.IP_ADDRESS}:5000/api/v1/auth/presentuser`)
   if(presentuser) {
      const data = await presentuser.json();
      return data.data
   }
   return;
}


export {registerUser,currentUser};