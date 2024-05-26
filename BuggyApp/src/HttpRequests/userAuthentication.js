/* eslint-disable prettier/prettier */
import config from "../../config";
const fetchUser = async(credentials) => {
    const userFetched = await fetch(`http://${config.IP_ADDRESS}:5000/api/v1/auth/userlogin`,{
       method:'POST',
       headers:{
         'Content-Type':'application/json',   
       },
       body:JSON.stringify({
        email:`${credentials.username}`,
        password:`${credentials.password}`,
       }),
    })
    if(userFetched) {
       const data = await userFetched.json();
       return data;
    }
    return;
 }




export {fetchUser};