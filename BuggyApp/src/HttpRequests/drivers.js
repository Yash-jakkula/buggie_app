import React, { startTransition } from "react";
import config from "../../config";
 
const nearestDriver = async(scount)=>{
    try{
        //{lat:'12.968288112885869',lon:'79.15846397343765'}
        const response = await fetch(`http://${config.IP_ADDRESS}:5000/api/v1/user/nearestDrivers`,{
            method:"POST",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({lat:'12.968288112885869',lon:'79.15846397343765',count:scount})
        })

        if(response.ok){
            const data = await response.json();
            return data;
        }
        else{
            console.log('could not complete request');
        }
    }
    catch(err){
            console.log(err);
    }
}


const updateDriverStatus = async(driverId,status) => {
    try{
        console.log("function called");
        const response = await fetch(`http://${config.IP_ADDRESS}:5000/api/v1/user/updateDriver/${driverId}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                status:`${status}`
            })
        })

        return await response.json();
    }
    catch(err){
        console.log(err);
    }
}

const updateSeats = async(driverId,seats) => {
    try{
        console.log("function called",seats);
        const response = await fetch(`http://${config.IP_ADDRESS}:5000/api/v1/user/updateDriver/${driverId}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                seats:`${seats}`
            })
        })

        return await response.json();
    }
    catch(err){
        console.log(err);
    }
}


const updateSeatsDriver = async(driverId,seats) => {
    try{
        console.log("function called",seats);
        const response = await fetch(`http://${config.IP_ADDRESS}:5000/api/v1/user/updateDriverSeats/${driverId}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                seats:`${seats}`
            })
        })

        return await response.json();
    }
    catch(err){
        console.log(err);
    }
}


const getDriver = async(driverId) => {
    try{
        const response = await fetch(`http://${config.IP_ADDRESS}:5000/api/v1/user/getDriver/${driverId}`)
        return await response.json();
    }
    catch(err){
        console.log(err);
    }
}

export {nearestDriver,updateDriverStatus,updateSeats,updateSeatsDriver,getDriver}