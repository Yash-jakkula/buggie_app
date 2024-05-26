import io from 'socket.io-client';
import config from '../../config';

const sendRideRequest = async (params) => {
  return new Promise((resolve, reject) => {
    const socket = io(`http://${config.IP_ADDRESS}:7000`);
    
    socket.on('connect', () => {
      console.log('Socket connected');
      socket.emit('rideRequest', params);
      console.log('emitted ridereq from client'); 
    });


    socket.on('error', (error) => {
      console.error('Socket error:', error);
      reject(error); 
    });

    
    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      reject(new Error('Socket disconnected')); 
    });
  });
};


const acceptRideRequest = async(rideData) => {
  try{
      const response = await fetch(`http://${config.IP_ADDRESS}:5000/api/v1/rides/acceptride`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          student:`${rideData.studentId}`,
          driver:`${rideData.driverId}`,
          pickupPoint:`${rideData.pickup}`,
          dropPoint:`${rideData.drop}`,
          count:`${rideData.count}`
        })
      })

      return await response.json();
  }
  catch(err){
    console.log(err);
  }
}

export { sendRideRequest,acceptRideRequest };
