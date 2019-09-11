import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Keyboard,ActivityIndicator } from 'react-native';

import SearchBox from '../components/SearchBox';
import ItemRecommend from '../components/ItemRecommend';


export default class MainHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoading : true, // đợi call api 
      textSearch: '',
      List: this.props.categoryListItem,
      whatScreen: 1,
      isOldUser: true,  // đọc trans, nếu có trans thì = true (user cũ), ko có thì = fasle (user mới)
    };
  }
  navigateModal = () => {
    this.props.navigation.navigate("Modal");
  }
  onPressDungNhieu = () => {
    this.setState({
      whatScreen: 1,
    })
  }
  onPressGanToi = () => {
    this.setState({
      whatScreen: 2,
    })
  }
  onPressLishSu = () => {
    this.setState({
      whatScreen: 3,
    })
  }
  onPressItemRecommend = item => {
    const { navigation } = this.props;
    navigation.navigate('ItemDetail', { data: item });
  }
  onEndEditingSearch = async (textSearch) => { // Xử lí tìm kiếm
    if (textSearch != '') {
      await this.setState({
        List: Data,
      })
      const { List } = this.state;
      const newData = List.filter(function (item) {
        //applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = textSearch.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        List: newData,
        textSearch: ''
      })
      console.log("text != empty")
    }
    else {
      this.setState({
        List: Data,
      })
      console.log("text == empty")
    }
  }
  onPressItemAuto = (item) => {
    Keyboard.dismiss();
    this.setState({
      textSearch: item.name
    })
    this.onEndEditingSearch(item.name);
  }
  render() {

    const { navigation } = this.props;
    const Category = navigation.getParam('data');

    const {
      isLoading,
      whatScreen,
      isOldUser,
      List,
      textSearch
    } = this.state;

    let list = [...List]
    switch (whatScreen) {
      case 1:
        break;
      case 2: list = list.splice(0).reverse();
        break;
      default: list = list.filter(item => item.id > 2);
        break;
    }
    if(isLoading)
      return (
        <View style={styles.container}>
            <Text style={{fontSize:20,}}></Text>
            <ActivityIndicator size="large" color="black" />
        </View>
      )
    
    return (
      <View style={styles.container}>
        <View style={styles.Header}>
          <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}><Text>Trở về</Text></TouchableOpacity>
          <SearchBox
            text={textSearch}
            onChangeText={(text) => this.setState({ textSearch: text })}
            onPressItemAuto={this.onPressItemAuto}
          />
          <View>
            <TouchableOpacity style={styles.buttonLoc} onPress={this.navigateModal}>
              <Text>Lọc</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.Content}>
          <Text style={styles.TextDanhMuc}>{Category.name}</Text>
          {
            isOldUser ? // nếu là user cũ => 3 nút, User mới => 2 nút
              //user cũ 
              <View style={styles.TabButton}>
                <TouchableOpacity
                  style={whatScreen == 1 ? styles.ChoseButton : styles.unChoseButton}
                  onPress={this.onPressDungNhieu}
                >
                  <Text style={whatScreen == 1 ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Dùng nhiều</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={whatScreen == 2 ? styles.ChoseButton : styles.unChoseButton}
                  onPress={this.onPressGanToi}
                >
                  <Text style={whatScreen == 2 ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Gần tôi</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={whatScreen == 3 ? styles.ChoseButton : styles.unChoseButton}
                  onPress={this.onPressLishSu}
                >
                  <Text style={whatScreen == 3 ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Lịch sử</Text>
                </TouchableOpacity>
              </View>
              :
              //user mới
              <View style={styles.TabButton}>
                <TouchableOpacity
                  style={whatScreen == 1 ? styles.ChoseButton : styles.unChoseButton}
                  onPress={this.onPressDungNhieu}
                >
                  <Text style={whatScreen == 1 ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Dùng nhiều</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={whatScreen == 2 ? styles.ChoseButton : styles.unChoseButton}
                  onPress={this.onPressGanToi}
                >
                  <Text style={whatScreen == 2 ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Gần tôi</Text>
                </TouchableOpacity>
              </View>
          }
          <ScrollView contentContainerStyle={styles.ListDanhMuc}>
            {
              list.map(item => {
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
    flex: 0.18,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 50,
  },
  buttonLoc: {
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
    flex: 0.82,
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
