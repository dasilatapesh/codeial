module.exports.chatSocket = (socketServer) => {
    let io = require('socket.io')(socketServer,{
        cors: {
            origin: "http://localhost:8000", // Allow requests from this origin
            methods: ["GET", "POST"] // Allow only GET and POST requests
          }
        }
    );

    io.sockets.on('connection', function(socket){
        console.log('New connection received: ',socket.id);

        socket.on('disconnect', function(){
            console.log('Connection disconnected...');
        });

        socket.on('join-room', function(data){
            console.log('Joining request', data);

            socket.join(data.chatRoom);

            io.in(data.chatRoom).emit('user-joined',data);
        });

        //detect send message and broadcast to every one
        socket.on('send-message',function(data){
            io.in(data.chatRoom).emit('receive-message',data);
        });
    });
}