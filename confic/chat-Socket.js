module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);


    io.sockets.on('connection', (socket)=>{
        console.log('new connection recive', socket.id);

        socket.on('disconnect',()=>{
            console.log('connection disconnect')
        })

        socket.on('join_room', function(data){
            console.log('joining reqest recive', data);

            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user joinder', data);
        })
        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_massage', data)
        })
    })
}