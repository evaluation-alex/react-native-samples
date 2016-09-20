import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import Video from 'react-native-video';

const kWindowWidth = Dimensions.get('window').width;
const kVideoHeight = kWindowWidth * 9 / 16;

const styles = StyleSheet.create({
  video: {
    height: kVideoHeight,
    width: kWindowWidth,
  },
  playButton: {
    height: 30,
    width: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    position: 'absolute',
    bottom: kVideoHeight / 2 - 15,
    left: kWindowWidth / 2 - 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
})

export default class FeedItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: null,
    };
  }

  playButtonPressed() {
    this.setState({
      playing: !this.state.playing
    });
  }

  setNativeProps(nativeProps) {
    this.rootComponent.setNativeProps(nativeProps);
  }

  render() {
    return (
      <View
        ref={component => (!!component && (this.rootComponent = component))}
        style={this.props.style}
      >
        {(() => {
          // if (this.state.playing === null) {
          //   return (
          //     <Image
          //       style={styles.video}
          //       source={require('./assets/thumbnail.png')}
          //       resizeMode={'cover'}
          //     />
          //   );
          // } else {
            return (
              <Video
                source={{uri: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4'}} // Can be a URL or a local file.
                rate={1.0}                   // 0 is paused, 1 is normal.
                volume={1.0}                 // 0 is muted, 1 is normal.
                muted={false}                // Mutes the audio entirely.
                paused={!this.state.playing}               // Pauses playback entirely.
                resizeMode="cover"           // Fill the whole screen at aspect ratio.
                repeat={true}                // Repeat forever.
                playInBackground={false}     // Audio continues to play when aentering background.
                playWhenInactive={false}     // [iOS] Video continues to play whcontrol or notification center are shown.
                onLoadStart={this.loadStart} // Callback when video starts to load
                onLoad={this.setDuration}    // Callback when video loads
                onProgress={this.setTime}    // Callback every ~250ms with currentTime
                onEnd={this.onEnd}           // Callback when playback finishes
                onError={this.videoError}    // Callback when video cannot be loaded
                style={styles.video}
              />
            );
          // }
        })()}
        <TouchableOpacity
          onPress={this.playButtonPressed.bind(this)}
          style={styles.playButton}
        >
          <Text style={styles.buttonText}>{this.state.playing ? 'PAUSE' : 'PLAY'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
