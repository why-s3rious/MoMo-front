import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import SearchBox from '../components/SearchBox';
import ItemRecommend from '../components/ItemRecommend';

const Data = [
  { id: 1, name: 'Phúc Long', image: require('../assets/Momo_1.jpg'), address: 'quận 1', longdis: '7km', price:'100.000 - 200.000' },
  { id: 2, name: 'The Coffee House', image: require('../assets/Momo_2.jpg'), address: 'quận 2', longdis: '6km', price:'150.000 - 200.000' },
  { id: 3, name: 'Hoàng Yến Buffet', image: require('../assets/Momo_3.jpg'), address: 'quận 3', longdis: '5km', price:'300.000 - 400.000' },
  { id: 4, name: 'Phúc Long', image: require('../assets/Momo_1.jpg'), address: 'quận 4', longdis: '4km', price:'250.000 - 300.000' },
  { id: 5, name: 'The Coffee House', image: require('../assets/Momo_2.jpg'), address: 'quận 5', longdis: '3km', price:'50.000- 100.000' },
  { id: 6, name: 'Hoàng Yến Buffet', image: require('../assets/Momo_3.jpg'), address: 'quận 6', longdis: '2km', price:'500.000 - 1.000.000' },
];
export default class MainHome extends Component {
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
  onPressItemRecommend = item => {
    const { navigation } = this.props;
    navigation.navigate('ItemDetail', { data: item });
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
          <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}><Text>Trở về</Text></TouchableOpacity>
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
          <ScrollView contentContainerStyle={styles.ListDanhMuc}>
            {isDungNhieuScreen ?
              Data.map(item => {
                return (
                  <ItemRecommend
                    onPress={() => this.onPressItemRecommend(item)}
                    key={item.id}
                    itemData={item}
                  />
                );
              })
              :
              Data.slice(0).reverse().map(item => {
                return (
                  <ItemRecommend
                    onPress={() => this.onPressItemRecommend(item)}
                    key={item.id}
                    itemData={item}
                  />
                );
              })
            }
          </ScrollView>
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
  },
  ListDanhMuc: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
