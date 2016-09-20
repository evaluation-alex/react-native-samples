import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

export default class MyComponent extends Component {
  render () {
    return (
      <TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/radio.png')}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 14,
    marginTop: 30,
    marginBottom: 30,
    padding: 10,
    backgroundColor: 'white',
    opacity: 0.7
  },
  image: {
    borderRadius: 4,
    width: 250,
    height: 300,
    resizeMode: 'stretch'
  }
})
