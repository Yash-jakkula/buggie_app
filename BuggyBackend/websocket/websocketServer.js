const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const Driver = require('../Models/Driver');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Define your Express routes here if needed

function setUPServer() {

  try{
 
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('rideRequest',(params) => {
    console.log('recieved data from client',params);
    socket.broadcast.emit('user_request',params);
    console.log('data sent to client');
  })

  socket.on('ride_accepted',(val)=>{
    socket.broadcast.emit('ride_accepted',val);
    console.log('rideacc',val);
  })

  socket.on('ride_data_accepted',(rideData)=>{
    console.log('going to emit')
    socket.broadcast.emit('rideData',rideData);
    console.log('emmited data',rideData)
  })

  socket.broadcast.emit('dummy','hello');


  socket.on('DriverLiveLocation',(data)=>{
    console.log(data);
    socket.broadcast.emit('DriverLocationFromServer',data);
  })


});


const PORT = 7000;
server.listen(PORT, () => {
  console.log(`socket.io Server running on port ${PORT}`);
});
  }
  catch(err){
    console.log(err)
  }

}

module.exports = setUPServer;