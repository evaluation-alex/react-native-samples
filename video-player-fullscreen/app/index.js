import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Navigator,
} from 'react-native';
import FeedList from './FeedList';

export default class App extends Component {
  renderList() {
    for (let i = 0; i < 9; i++) {
      return (
        <FeedItem />
      );
    }
  }

  render() {
    const initialRoute = {
      component: FeedList
    };
    return (
      <Navigator
        initialRoute={initialRoute}
        renderScene={(route, navigator) => <route.component navigator={navigator} {...route.passProps}/>}
        configureScene={() => Navigator.SceneConfigs.FloatFromRight}
      />
    );
  }
}
