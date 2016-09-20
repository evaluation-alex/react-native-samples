import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import VideoPlayer from './VideoPlayer';

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 28,
    height: 30,
    width: 60,
    borderColor: 'white',
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 2,
  },
  backButtonText: {
    fontSize: 18,
    color: 'black',
  },
});

class VideoFullScreenOverlay extends Component {
  close() {
    var routes = this.props.navigator.getCurrentRoutes();
    routes.pop();
    this.props.navigator.immediatelyResetRouteStack(routes);
  }

  render() {
    return (
      <View style={styles.overlayContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={this.close.bind(this)}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        {this.props.children}
      </View>
    );
  }
}

export default class VideoFullScreenView extends Component {
  open() {
    if (!this.props.navigator) {
      return;
    }

    const currentRoutes = this.props.navigator.getCurrentRoutes();
    const route = {
      component: VideoFullScreenOverlay,
      passProps: {
        children: this.props.children,
      },
    };
    currentRoutes.push(route);
    this.props.navigator.immediatelyResetRouteStack(currentRoutes);
  }

  render() {
    return (
      <View>
        <TouchableHighlight
          underlayColor={this.props.underlayColor}
          onPress={this.open.bind(this)}
        >
          {this.props.children}
        </TouchableHighlight>
      </View>
    );
  }
}

