var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/dashboard2.html');
});

app.get('/scoreboard', function(req, res){
    res.sendFile(__dirname + '/scoreboard.html');
});

app.get('/casters', function (req, res) {
    res.sendFile(__dirname + '/casters.html');
});

app.get('/idle', function (req, res) {
    res.sendFile(__dirname + '/idle.html');
});

app.use("/img", express.static(__dirname + '/img'));
app.use("/styles", express.static(__dirname + '/styles'));
app.use("/scripts", express.static(__dirname + '/scripts'));
app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));

var serverData = {
    player: [{
        'name':'',
        'region':'UNK',
        'score':'0',
    },
    {
        'name': '',
        'region': 'UNK',
        'score': '0',
    }],
    caster: ["",""]
};

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('return serverData', serverData);
  console.log(serverData);

    

    socket.on('update players', function(data) {
        serverData = data;
        io.emit('update players', serverData);
        console.log('players updated');
        console.log(serverData);
    });

    socket.on('update casters', function(data) {
        serverData = data;
        io.emit('update casters', serverData);
        console.log('casters updated');
        console.log(serverData);
    });
});



http.listen(4000, '0.0.0.0', function(){
  console.log('Abra seu navegador e entre em: http://localhost:4000');
  console.log('Lista de views para você incluir no stream via browsersources:');
  console.log('\n http://localhost:4000/idle \n http://localhost:4000/scoreboard \n http://localhost:4000/casters');
});