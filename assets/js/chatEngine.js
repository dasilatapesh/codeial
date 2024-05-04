class chatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBoxId = chatBoxId;
        this.userEmail = userEmail;
        //initiate connection
        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using socket....!');
            
            self.socket.emit('join-room',{
                userEmail: self.userEmail,
                chatRoom: 'codeial',
            });

            self.socket.on('user-joined', function(data){
                console.log('User joined succesfully',data);
            })
        });

        //send message on clicking send button
        $('#send-message').click(function(){
            let message = $('#chat-message-input').val();

            if(message!= ''){
                self.socket.emit('send-message',{
                    message: message,
                    userEmail: self.userEmail,
                    chatRoom: 'codeial'
                });
            }
            // Clear the chat message input field
            $('#chat-message-input').val('');
        });

        self.socket.on('receive-message', function(data){
            console.log(data);
            console.log('Message received: ',data.message);

            let newMsg = $('<li>');
            let msgType = 'other-message';

            if(data.userEmail == self.userEmail){
                msgType = 'self-message';
            }

            newMsg.append($('<span>', {
                'html': data.message,
            }));

            newMsg.append($('<br>'));

            newMsg.append($('<sub>',{
                'html': 'By:'+data.userEmail,
            }));

            newMsg.addClass(msgType);

            $('#chat-message-list').append(newMsg);
            console.log(newMsg);
        });
    }
}
