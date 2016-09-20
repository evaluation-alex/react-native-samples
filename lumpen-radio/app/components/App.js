import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import BackgroundVideo from './BackgroundVideo'
import ActionButton from './ActionButton'

export default class App extends Component {
  render () {
    return (
      <View style={styles.container}>
        <BackgroundVideo />
        <Text style={styles.appMessage}>
          LUMPEN RADIO
        </Text>
        <Text style={[styles.appMessage, styles.appSubMessage]}>
          WLPN-LP 105.5 FM Chicago
        </Text>
        <ActionButton />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  appMessage: {
    fontSize: 36,
    color: 'white'
  },
  appSubMessage: {
    fontSize: 18
  }
})
