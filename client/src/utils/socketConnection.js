import io from 'socket.io-client';
const socket = io.connect('http://127.0.0.1:8000');
socket.emit('clientAuth', 'reactuiclient');
console.log(socket);
export default socket;
