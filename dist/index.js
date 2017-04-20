//** SET UP ALL VARIABLES **//
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);
var http = require('http').Server(app);
var io = require('socket.io')(http);

//** SERVE PUG FILES **//
app.set('views', __dirname + '/public/views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {    
    res.render('index', { title : 'Home'} )
});

http.listen(app.get('port'));
//** SOCKET COMMUNICATION **//
io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('userSocket', 'connected user yo!');
  socket.on('userSocket', function(msg){
    io.emit('userSocket', msg);
  });
});
