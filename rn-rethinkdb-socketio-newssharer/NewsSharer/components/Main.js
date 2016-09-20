import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Linking,
  ListView
} from 'react-native';

import Button from 'react-native-button'; 
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/Octicons';

import "../UserAgent";
import io from 'socket.io-client/socket.io';

import _ from 'lodash';

var base_url = 'http://192.168.254.103:3000';

export default class Main extends Component {

  constructor(props){
    super(props);

    this.socket = io(base_url, {
      transports: ['websocket'] 
    });
   
    this.state = {
      is_modal_open: false,
      news_title: '',
      news_url: '',
      news_items_datasource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      is_news_loaded: false,
      news: {},
      news_items: []
    };

  }

  getNewsItems(){

    fetch(base_url + '/news')
      .then((response) => {
        return response.json();
      })
      .then((news_items) => {
        
        this.setState({
          'news_items': news_items
        });

        var news_datasource = this.state.news_items_datasource.cloneWithRows(news_items);
       
        this.setState({
          'news': news_datasource,
          'is_news_loaded': true
        });
    
        return news_items;
      })
      .catch((error) => {
        alert('Error occured while fetching news items');
      });

  }

  componentWillMount(){

    this.socket.on('news_updated', (data) => {
  
      var news_items = this.state.news_items;
      if(data.old_val === null){
     
        news_items.push(data.new_val);

      }else{
  
        _.map(news_items, function(row, index){
          if(row.id == data.new_val.id){
            news_items[index].upvotes = data.new_val.upvotes;
          }

        });

      }

      this.updateUI(news_items);

    });

  }

  updateUI(news_items){
    var ordered_news_items = _.orderBy(news_items, 'upvotes', 'desc');
    var limited_news_items = _.slice(ordered_news_items, 0, 30);
    var news_datasource = this.state.news_items_datasource.cloneWithRows(limited_news_items);

    this.setState({
      'news': news_datasource,
      'is_news_loaded': true,
      'is_modal_open': false,
      'news_items': limited_news_items
    });
  }

  componentDidMount(){
    this.getNewsItems();
  }

  upvoteNewsItem(id, upvotes){
   
    fetch(base_url + '/upvote-newsitem', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        news_id: id,
        upvotes: upvotes + 1
      })
    })
      .catch((err) => {
        alert('Error occured while trying to upvote');
      });    

  }

  openModal(){
    this.setState({
      is_modal_open: true
    });
  }

  closeModal(){
    this.setState({
      is_modal_open: false
    });
  }

  shareNews(){

    fetch(base_url + '/save-newsitem', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        news_title: this.state.news_title,
        news_url: this.state.news_url,
      })
    })
      .then((response) => {
        alert('News was shared!');
        this.setState({
          news_title: '',
          news_url: ''
        });
      })
      .catch((err) => {
        alert('Error occured while sharing news');
      });

  }

  openPage(url){
    Linking.canOpenURL(url).then(supported => {
      if(supported){
        Linking.openURL(url);
      }
    });
  }

  renderNews(news){
    return (
      <View style={styles.news_item}>
        <TouchableHighlight onPress={this.upvoteNewsItem.bind(this, news.id, news.upvotes)} underlayColor={"#E8E8E8"}>
          <View style={styles.upvote}>
              <Icon name="triangle-up" size={30} color="#666" />
              <Text style={styles.upvote_text}>{news.upvotes}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.openPage.bind(this, news.url)} underlayColor={"#E8E8E8"}>
          <View style={styles.news_title}>
            <Text style={styles.news_item_text}>{news.title}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  render(){

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.app_title}>
            <Text style={styles.header_text}>News Sharer</Text>   
          </View>
          <View style={styles.header_button_container}>
            <Button onPress={this.openModal.bind(this)} style={styles.btn}>
              Share News
            </Button>
          </View>     
        </View>

        {
          this.state.is_news_loaded &&
          <View style={styles.body}>
            <ListView initialListSize={1} dataSource={this.state.news} style={styles.news} renderRow={this.renderNews.bind(this)}></ListView>
          </View>
        }
        
        <Modal 
          isOpen={this.state.is_modal_open} 
          style={styles.modal} 
          position={"center"} 
        >
          <View style={styles.modal_body}>
            <View style={styles.modal_header}>
              <Text style={styles.modal_header_text}>Share News</Text>
            </View>

            <View style={styles.input_row}>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({news_title: text})}
                value={this.state.news_title}
                placeholder="Title"
              />
            </View>

            <View style={styles.input_row}>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({news_url: text})}
                value={this.state.news_url}
                placeholder="URL"
                keyboardType="url"
              />
            </View>
            
            <View style={styles.input_row}>
              <Button onPress={this.shareNews.bind(this)} style={[styles.btn, styles.share_btn]}>
                Share
              </Button>
            </View>
          </View>

        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  header: {
    flex: 1,
    backgroundColor: '#3B3738',
    flexDirection: 'row'
  },
  app_title: {
    flex: 7,
    padding: 10
  },
  header_text: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold'
  },
  header_button_container: {
    flex: 3
  },
  body: {
    flex: 19
  },
  btn: {
    backgroundColor: "#05A5D1",
    color: "white",
    margin: 10
  },
  modal: {
    height: 300
  },
  modal_header: {
    margin: 20,
  },
  modal_body: {
    alignItems: 'center'
  },
  input_row: {
    padding: 20
  },
  modal_header_text: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  share_btn: {
    width: 100
  },
  news_item: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flex: 1,
    flexDirection: 'row'
  },
  news_item_text: {
    color: '#575757',
    fontSize: 18
  },
  upvote: {
    flex: 2,
    paddingRight: 15,
    paddingLeft: 5,
    alignItems: 'center'
  },
  news_title: {
    flex: 18,
    justifyContent: 'center'
  },
  upvote_text: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

AppRegistry.registerComponent('Main', () => Main);
