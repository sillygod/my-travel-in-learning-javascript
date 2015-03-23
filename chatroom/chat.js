var Chat = function(socket){
    this.socket = socket;
};

Chat.prototype.sendMessage = function(room, text){
    var message = {
        room: room,
        text: text
    };
    
    this.socket.emit('message', message);
};

Chat.prototype.changeRoom = function(room){
    this.socket.emit('join', {
        newRoom: room
    });
};

Chat.prototype.processCommnad = function(commnad){
    // process the commnad nick and join
    
    var words = commnad.split(' ');
    var command = wrods[0].substring(1, word[0].length).toLowerCase();
    
    var message = false;
    
    switch(command){
        case 'join':
            words.shift(); // remove the first item
            var room = words.join(' ');
            this.changeRoom(room);
            break;
            
        case 'nick':
            words.shift();
            var name = words.join(' ');
            this.socket.emit('nameAttempt', name);
            break;
        
        default:
            message = 'Unreconized command.';
            break;
    }
    
    return message;
}