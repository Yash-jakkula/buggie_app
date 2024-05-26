import React from "react";
import config from "../../config";
const PickupDropLocation = async (pickup,drop,count)=>{
    try{
        const response = await fetch(`http://${config.IP_ADDRESS}:5000/api/v1/route/getroute`,{
            method:"POST",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({
                originPlace:`${pickup}`,
                destinationPlace:`${drop}`,
                count:`${count}`
            })
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

module.exports = {PickupDropLocation}
