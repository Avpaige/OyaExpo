const db = require("../models");
const axios = require("axios")
const dotenv = require("dotenv");
dotenv.config({ path: '../env' });

var clients = {};
var users = {};

// This represents a unique chatroom.
// For this example purpose, there is only one chatroom;
var chatId = 1;

module.exports = {

    // Event listeners.
    // When a user joins the chatroom.
    onUserJoined: function (userId, socket) {
        try {
            // The userId is null for new users.
            if (!userId) {
                var user = db.collection('users').insert({}, (err, user) => {
                    socket.emit('userJoined', user._id);
                    users[socket.id] = user._id;
                    _sendExistingMessages(socket);
                });
            } else {
                users[socket.id] = userId;
                _sendExistingMessages(socket);
            }
        } catch (err) {
            console.err(err);
        }
    },

    // When a user sends a message in the chatroom.
    onMessageReceived: function (message, senderSocket) {
        var userId = users[senderSocket.id];
        // Safety check.
        if (!userId) return;

        _sendAndSaveMessage(message, senderSocket);
    },

    // Helper functions.
    // Send the pre-existing messages to the user that just joined.
    _sendExistingMessages: function (socket) {
        var messages = db.collection('messages')
            .find({ chatId })
            .sort({ createdAt: 1 })
            .toArray((err, messages) => {
                // If there aren't any messages, then return.
                if (!messages.length) return;
                socket.emit('message', messages.reverse());
            });
    },

    // Save the message to the db and send all sockets but the sender.
    _sendAndSaveMessage: function (message, socket, fromServer) {
        var messageData = {
            text: message.text,
            user: message.user,
            createdAt: new Date(message.createdAt),
            socket: socket,
            chatId: chatId
        };

        db.collection('messages').insert(messageData, (err, message) => {
            // If the message is from the server, then send to everyone.
            var emitter = fromServer ? websocket : socket.broadcast;
            emitter.emit('message', [message]);
        });
    }

};