const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use('/', express.static(path.join(__dirname, '/public')));

const users = [];

io.on('connection', (socket) => {

    socket.on('login', (data) => {
        users[socket.id]=data.name;
    })

    socket.on('message' , (data)=>{

        io.emit('received_msg', {
            msg: data.msg,
            name: users[socket.id]
        })
    })

})



server.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000");
});