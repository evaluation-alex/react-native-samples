'use strict'

require('./shim')

let React, { Component } = require('react');
let ReactNative = require('react-native')
let {
  Text,
  View,
  StyleSheet
} = React

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { messages: [] }
  }
  componentDidMount() {
    let self = this
    console.log = (msg) => {
      self.setState({ messages: [...self.state.messages, msg] })
    }

    require('asyncstorage-down/test/test')
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.messages.join('\n')}</Text>
      </View>
    )
  }
}

React.AppRegistry.registerComponent('adexample', () => App)
