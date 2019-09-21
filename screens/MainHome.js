import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Keyboard, ActivityIndicator, FlatList } from 'react-native';

import SearchBox from '../components/SearchBox';
import ItemRecommend from '../components/ItemRecommend';


export default class MainHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true, // đợi call api 
      textSearch: '',
      List: [],
      pageNum: 1,
      whatScreen: "match",
      isOldUser: true,  // đọc trans, nếu có trans thì = true (user cũ), ko có thì = fasle (user mới)
    };
    this.didFocusSubscription = props.navigation.addListener(
      'willFocus',
      payload => {
        this.setState({
          List: this.props.categoryListItem,
        })
      }
    );
  }
  // call api
  componentWillMount() {
    this.callApiGetListItem("match", this.state.pageNum);
  }

  callApiGetListItem = async (whatScreen, page) => {
    if (page == 1) {
      this.setState({
        isLoading: true,
      })
    }
    let data = this.props.navigation.getParam('data');
    let location = this.props.location;
    let locationUser = null;
    if (location != null) {
      locationUser = `${location.latitude},${location.longitude}`
    }
    const { textSearch, List } = this.state;
    await this.props.onGetCategoryListItem(textSearch, whatScreen, page, data.id, locationUser);
    this.setState({
      isLoading: false,
      List: List.concat(this.props.categoryListItem)
    })
  }


  navigateModal = () => {
    this.props.navigation.navigate("Modal");
  }
  onPressDungNhieu = async () => {
    await this.setState({
      List: [],
      whatScreen: "match",
      pageNum: 1
    })
    this.callApiGetListItem("match", 1);
  }
  onPressGanToi = async () => {
    await this.setState({
      List: [],
      whatScreen: "distance",
      pageNum: 1
    })
    this.callApiGetListItem("distance", 1);
  }
  onPressLishSu = async () => {
    await this.setState({
      List: [],
      whatScreen: "time",
      pageNum: 1
    })
    this.callApiGetListItem("time", 1);
  }

  renderItem = ({ item }) => {
    return (
      <ItemRecommend
        onPress={() => this.onPressItemRecommend(item)}
        key={item.id}
        itemData={item}
      />
    );
  }
  getMore = () => {
    this.setState({
      isReachedFooter: true,
    })
    const { whatScreen, pageNum } = this.state;
    page = pageNum + 1;
    this.callApiGetListItem(whatScreen, page);
    this.setState({
      pageNum: page
    })
  }
  renderFooter = () => {
    return <ActivityIndicator size="large" color='black' animating={true} />
  }
  onPressItemRecommend = item => {
    const { navigation } = this.props;
    navigation.navigate('ItemDetail', { data: item });
  }

  onEndEditingSearch = async () => { // Xử lí tìm kiếm
    const { whatScreen } = this.state;
    await this.setState({
      List: [],
    })
    this.callApiGetListItem(whatScreen, 1);
    this.setState({
      textSearch: ''
    })
  }
  onPressItemAuto = (item) => {
    Keyboard.dismiss();
    this.setState({
      textSearch: item.name
    })
    // this.onEndEditingSearch(item.name);
  }
  render() {
    const { navigation } = this.props;
    const Category = navigation.getParam('data');

    const {
      isLoading,
      whatScreen,
      isOldUser,
      List,
      textSearch,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.Header}>
          <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}><Text>Trở về</Text></TouchableOpacity>
          <SearchBox
            text={textSearch}
            list={this.props.categoryListItem}
            onChangeText={(text) => this.setState({ textSearch: text })}
            onPressItemAuto={this.onPressItemAuto}
            onEndEditingSearch={() => this.onEndEditingSearch(textSearch)}
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
                  style={whatScreen == "match" ? styles.ChoseButton : styles.unChoseButton}
                  onPress={this.onPressDungNhieu}
                >
                  <Text style={whatScreen == "match" ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Dùng nhiều</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={whatScreen == "distance" ? styles.ChoseButton : styles.unChoseButton}
                  onPress={this.onPressGanToi}
                >
                  <Text style={whatScreen == "distance" ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Gần tôi</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={whatScreen == "time" ? styles.ChoseButton : styles.unChoseButton}
                  onPress={this.onPressLishSu}
                >
                  <Text style={whatScreen == "time" ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Lịch sử</Text>
                </TouchableOpacity>
              </View>
              :
              //user mới
              <View style={styles.TabButton}>
                <TouchableOpacity
                  style={whatScreen == "match" ? styles.ChoseButton : styles.unChoseButton}
                  onPress={this.onPressDungNhieu}
                >
                  <Text style={whatScreen == "match" ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Dùng nhiều</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={whatScreen == "distance" ? styles.ChoseButton : styles.unChoseButton}
                  onPress={this.onPressGanToi}
                >
                  <Text style={whatScreen == "distance" ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Gần tôi</Text>
                </TouchableOpacity>
              </View>
          }
          {
            isLoading ?
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, }}></Text>
                <ActivityIndicator size="large" color="black" />
                <Text style={{ color: 'gray', fontSize: 13, marginTop: 5 }}>Đang tải dữ liệu...</Text>
              </View>
              :
              <View style={styles.ListDanhMuc}>
                {
                  List.length > 0 ?
                    <FlatList style={styles.Flatlist}
                      ref={(ref) => { this.flatListRef = ref; }}
                      data={List}
                      renderItem={this.renderItem}
                      keyExtractor={(item, index) => index.toString()}
                      onEndReached={this.getMore}
                      onEndReachedThreshold={0.1}
                      ListFooterComponent={this.renderFooter()}
                    />
                    :
                    <View>
                      <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold', flex: 1 }}>Server lỗi hoặc quá tải</Text>
                      <Text style={{ fontSize: 25, color: 'black', fontWeight: 'bold', flex: 1 }}>Vui lòng thử lại sau</Text>
                    </View>
                }
              </View>
          }
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
    flex: 0.9,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
