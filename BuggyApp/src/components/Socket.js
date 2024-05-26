import io from 'socket.io-client';

const socket = io('http://192.168.0.112:7000');

socket.on('connect', () => {
    console.log('Connected to socket.io from client');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

export default socket;

