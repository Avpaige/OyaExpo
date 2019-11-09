const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseSocketIo = require('mongoose-socket.io');
 
let UserSchema = new Schema({
  name: String,
  email: String,
  something: Array
});
 
UserSchema.plugin(mongoooseSocketIo, {
  io, // Socketio instance
  prefix: 'user',
  namespace: function(doc){
    return ['test1','test2']
  },
  room: ['room1', 'room2'],
  events: {
    create: {
      select: 'email skills',
      populate: {
        path: 'skills',
        select: 'name'
      },
      map: function(data) {
        //Do some last mapping/modification
        data.provider = data.email.split('@').pop();
        return data;
      }
    },
    update: {
      populate: 'skills'
    },
    remove: false
  },
  partials: [
    {
      eventName: 'custom_event',
      triggers: 'name',
      select: 'name email',
      populate: 'something' //if it is a reference...
    }
  ],
  debug: false
})