import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';
import io from "socket.io-client";

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      chatMessage: "",
      chatMessages: []
    }
  }


  componentDidMount() {
   this.socket = io("http://192.168.1.251:3000")
    //to test locally you'll need to update above with your own ip address can find on a mac by running a ifconfig in command
    this.socket.on("chat message", msg =>{
      this.setState({chatMessages: [...this.state.chatMessages, msg]});
    })
  }

  submitChatMessage (){
    this.socket.emit("chat message", this.state.chatMessage);
    this.setState({chatMessage:""})

  }

  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage =>(
    <Text key={chatMessage}>{chatMessage}</Text>
    ));

    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, width: 300, borderWidth: 2}}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => {
            this.setState({chatMessage})
          }} />
        {chatMessages}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
