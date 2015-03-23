function divEscapedContentElement(message){
    return $('<div></div>').text(message);
}

function divSystemContentElement(message){
    return $('<div></div>').text('<i>'+message+'</i>');
}

function processUserInput(chatApp, socket){
    var message = $('#send-message').val();
    var systemMessage;
    
    if (message.charAt(0)=='/'){
        // treated as command
        systemMessage = chatApp.processCommnad(message);
        if(systemMessage){
            $('#messages').append(divSystemContentElement(systemMessage));
        } else {
            chatApp.sendMessage($('#room').text(), message);
            $('#messages').append(divEscapedContentElement(message));
            $('#message').scrollTop($('#message').prop('srollHeight'));
            // what is prop?
            // prop is something like attr. However
            // there are some different things between them
        }
    }
    
    $('#send-message').val('');
}