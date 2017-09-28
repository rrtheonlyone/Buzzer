var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));

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
    

http.listen(app.get('port'), function(){
  console.log('app is running!');
});
