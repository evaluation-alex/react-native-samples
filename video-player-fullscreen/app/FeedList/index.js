import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import FeedItem from './FeedItem';

const kWindowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    width: kWindowWidth,
    height: 64,
    paddingTop: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  navBarTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black'
  },
  scrollView: {
    flex: 1,
  }
});

export default class FeedList extends Component {
  renderList() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
      <FeedItem
        key={index}
        index={index}
        navigator={this.props.navigator}
      />
    ));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <Text style={styles.navBarTitle}>Video Feed</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          {this.renderList()}
        </ScrollView>
      </View>
    );
  }
}
