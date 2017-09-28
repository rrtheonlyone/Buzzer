var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/_admin', function(req, res){
  res.sendFile(__dirname + '/admin.html');
});

app.get('/game', function(req, res){
  res.sendFile(__dirname + '/game.html');
});

app.all('*', function(req, res) {
  res.redirect('/game');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('game start', function(msg){
    io.sockets.emit('game start', msg);
  });

  socket.on('play game', function(msg){
    io.sockets.emit('update leaderboard', msg);
  });

  socket.on('end game', function (msg){
    io.sockets.emit('end game', msg);
  });
});
    

http.listen(3000, function(){
  console.log('listening on *:3000');
});
