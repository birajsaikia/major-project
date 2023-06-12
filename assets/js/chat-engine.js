class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000/');

        if(this.userEmail){
            this.connectionHolder();
        }
    }

    connectionHolder(){
        let self = this;

        this.socket.on('connect',function(){
            console.log('connection estrablish using socket..')


            self.socket.emit('join_room',{
                user_email: self.userEmail,
                chatroom : 'codeial'
            })

            self.socket.on('user_joind', function(data){
                console.log('a user is joind', data);
            })

        });


        $('#send-message').click(function(){
            let msg = $('#chat-massage-input').val();

            if(msg != ''){
                self.socket.emit('sand_message',{
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                })
            }
        })


        self.socket.on('receive_message', function(data){
            console.log('mmagase resive', data.message);

            let newMessage = $('<li>');
            let messageType = 'other-message';
            if(data.user_email == self.userEmail){
                messageType = 'self-message'
            }

            newMessage.append($('<span>',{
                'html': data.message
            }));

            newMessage.append($('<sub>',{
                'html': data.user_email
            }))

            newMessage.addClass(messageType);


            $('#user-chat-list').append(newMessage);
        })

    }

}