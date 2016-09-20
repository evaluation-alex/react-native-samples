import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import VideoPlayer from './VideoPlayer';
import VideoFullScreenView from './VideoFullScreenView';

const kWindowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: kWindowWidth,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  title: {
    margin: 8,
    fontSize: 18,
  },
})

export default class FeedItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Video {this.props.index}</Text>
        <VideoFullScreenView
          navigator={this.props.navigator}
          underlayColor={'white'}
        >
          <VideoPlayer />
        </VideoFullScreenView>
      </View>
    );
  }
}
