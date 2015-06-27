var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var url = require('url');

var cache = {};

// write some help functions below

function send404(response){
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: response not found');
    response.end();
}


function sendFile(response, filePath, fileContents){
    response.writeHead(
        200,
        {'Content-Type': mime.lookup(path.basename(filePath))}
    );
    response.end(fileContents);
}


function serveStatic(response, cache, absPath){
    if(cache[absPath]){
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, function(exists){
            if(exists){
                fs.readFile(absPath, function(err, data){
                    if(err){
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                });
            } else {
                send404(response);
            }
        });
    }
}

var server = http.createServer(function(req, res){
    var filePath = false;

    if(req.url == '/'){
        filePath = 'index.html';
    } else if(req.url.slice(1,7) == 'bower_'){
        filePath = '../'+req.url;
    } else {
        filePath = req.url;
    }

    console.log(req.url);


    var absPath = './'+ filePath;
    serveStatic(res, cache, absPath);

});

server.listen(3000, function(){
    console.log('Server listening on port 3000');
});

// add chat server
var chatServer = require('./chat_server');
chatServer.listen(server);


