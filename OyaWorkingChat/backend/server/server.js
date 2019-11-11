
require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const routes = require("./routes");
const PORT = process.env.PORT || 3002;
const app = express();

const http = require('http').Server(app)
const socketio = require('socket.io');
const room = io(http); 

const ObjectID = mongojs.ObjectID;
var server = http.Server(app);
var websocket = socketio(server);
server.listen(3000, () => console.log('listening on *:3000'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// If its production environment!
if (process.env.NODE_ENV === 'production') {
	console.log('YOU ARE IN THE PRODUCTION ENV');
	app.use('/static', express.static(path.join(__dirname, './client/build/static')));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

websocket.on('connection', (socket) => {
  console.log("user connected")
    clients[socket.id] = socket;
    socket.on('userJoined', (userId) => onUserJoined(userId, socket));
    socket.on('message', (message) => onMessageReceived(message, socket));
});


// Allow the server to participate in the chatroom through stdin.
var stdin = process.openStdin();
stdin.addListener('data', function (d) {
    _sendAndSaveMessage({
        text: d.toString().trim(),
        createdAt: new Date(),
        user: { _id: 'robot' }
    }, null /* no socket */, true /* send from server */);
});
