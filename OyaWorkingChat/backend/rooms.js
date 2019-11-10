var app = require('express')();
var http = require('http').Server(app);
const server =require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;


//Isabel, not sure how in the react-native nav we'd create the path to the actual room?
app.get('/', function(req, res) {
   res.sendfile('index.html');
});

var roomNum = 1;
io.on('connection', function(socket) {
   
   //Increase roomNum 2 clients are present in a room.
   if(io.nsps['/'].adapter.rooms["room-"+roomNum] && io.nsps['/'].adapter.rooms["room-"+roomNum].length > 1) roomNum++;
   socket.join("room-"+roomNum);

   //Send this event to everyone in the room.
   io.sockets.in("room-"+roomNum).emit('connectToRoom', "You are in room no. "+roomNum);
})

erver.listen(port,() => console.log("server running on port " + port));

