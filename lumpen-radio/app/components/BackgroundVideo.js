import React, { Component } from 'react'
import {
  Platform,
  StyleSheet
} from 'react-native'
import Video from 'react-native-video'

class VideoIOS extends Component {
  render () {
    return (
      <Video
        resizeMode='cover'
        source={{uri: 'turntable-loop-1920x500-h264-512kbps-h264'}}
        style={styles.backgroundVideo}
      />
    )
  }
}

class VideoAndroid extends Component {
  render () {
    return (
    <Video
      repeat
      resizeMode='cover'
      source={require('../assets/video/turntable-loop-1920x500-h264-512kbps-h264.mp4')}
      style={styles.backgroundVideo}
    />
    )
  }
}

// FIXME: Stop branching by platform once iOS renders video properly
//   using the asset system. Also remove video asset from iOS Copy Bundle
//   Resources from target Build Phases upon refactor.
export default class BackgroundVideo extends Component {
  render () {
    return Platform.OS === 'ios' ? <VideoIOS /> : <VideoAndroid />
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})
