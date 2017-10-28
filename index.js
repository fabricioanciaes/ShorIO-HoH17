var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/dashboard.html');
});

app.get('/view', function(req, res){
    res.sendFile(__dirname + '/view.html');
});

app.use("/styles", express.static(__dirname + '/styles'));
app.use("/scripts", express.static(__dirname + '/scripts'));
app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));

let serverData;

io.on('connection', function(socket){
  console.log('a user connected');

    socket.on('update pauta', function(data) {
        serverData = data;
        io.emit('update pauta', serverData);
        console.log('pauta updated');
        console.log(serverData);
    });

    socket.on('update casters', function(data) {
        serverData = data;
        io.emit('update casters', serverData);
        console.log('casters updated');
        console.log(serverData);
    });
});



http.listen(4000, function(){
  console.log('listening on *:4000');
});