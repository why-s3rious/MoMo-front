import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import SearchBox from '../components/SearchBox';
import ListItemRecommend from '../components/ListItemRecommend';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDungNhieuScreen: true,
    };
  }
  navigateModal = () => {
    this.props.navigation.navigate("Modal");
  }
  onPressDungNhieu = () => {
    this.setState({
      isDungNhieuScreen: true,
    })
  }
  onPressGanToi = () => {
    this.setState({
      isDungNhieuScreen: false,
    })
  }
  render() {

    const { navigation } = this.props;
    const Category = navigation.getParam('data');

    const {
      isDungNhieuScreen
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.Header}>
          <SearchBox />
          <View>
            <TouchableOpacity style={styles.buttonLoc} onPress={this.navigateModal}>
              <Text>Lọc</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.Content}>
          <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}><Text>Trở về</Text></TouchableOpacity>
          <Text style={styles.TextDanhMuc}>{Category.name}</Text>
          <View style={styles.TabButton}>
            <TouchableOpacity
              style={isDungNhieuScreen ? styles.ChoseButton : styles.unChoseButton}
              onPress={this.onPressDungNhieu}
            >
              <Text style={isDungNhieuScreen ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Dùng nhiều</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={isDungNhieuScreen ? styles.unChoseButton : styles.ChoseButton}
              onPress={this.onPressGanToi}
            >
              <Text style={isDungNhieuScreen ? styles.UnChoseTabButtonText : styles.ChoseTabButtonText}>Gần tôi</Text>
            </TouchableOpacity>
          </View>
          <ListItemRecommend
            CategoryName={Category.name}
            KindOfList={isDungNhieuScreen}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  Header: {
    flex: 0.2,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLoc: {
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: 'gray',
    backgroundColor: 'gray',
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
    width: 40,
  },
  Content: {
    flex: 0.8,
    flexDirection: 'column',
  },
  TextDanhMuc: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: '400',
  },
  TabButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ChoseButton: {
    height: 30,
    width: 120,
    borderBottomColor: 'red',
    borderBottomWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unChoseButton: {
    height: 30,
    width: 120,
    borderBottomColor: 'gray',
    borderBottomWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ChoseTabButtonText: {
    fontWeight: 'bold',
  },
  UnChoseTabButtonText: {
    color: 'gray'
  }
});
