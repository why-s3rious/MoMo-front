import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, ActivityIndicator, FlatList } from 'react-native';

import SearchBox from '../components/SearchBox';
import ItemRecommend from '../components/ItemRecommend';
import { screenWidth, screenHeight } from '../costants/DeviceSize';

export default class MainHome extends Component {
  constructor(props) {
    super(props);
    let cateData = this.props.navigation.getParam("data");
    this.state = {
      isLoading: true, // đợi call api 
      textSearch: '',
      List: [],
      suggestList: [],
      cate: {
        id: cateData.id,
        name: cateData.name
      },
      pageNum: 1,
      whatScreen: "match",
      isNewUser: this.props.infoUser.is_new,  // đọc trans, nếu có trans thì = true (user cũ), ko có thì = fasle (user mới)
      isFocusSearch: false,  // xét search input text focus, true/false gọi css khác nhau
    };
    this.didFocusSubscription = props.navigation.addListener(
      'willFocus',
      payload => {
        this.setState({
          List: this.props.categoryListItem.stores,
        })
      }
    );
  }
  // call api
  async componentWillMount() {
    this.callApiGetListItem("match", this.state.pageNum);
  }

  callApiGetListItem = async (whatScreen, page) => {
    if (page == 1) {
      this.setState({
        isLoading: true,
      })
    }
    const { cate } = this.state;
    let location = this.props.location;
    let locationUser = null;
    if (location != null) {
      locationUser = `${location.latitude},${location.longitude}`
    }
    const { textSearch, List } = this.state;
    await this.props.onGetCategoryListItem(textSearch, whatScreen, page, cate.id, locationUser);
    this.setState({
      isLoading: false,
      List: List.concat(this.props.categoryListItem.stores)
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
        onPress={this.onPressItemRecommend}
        key={item.id}
        itemData={item}
        onDeleteItem={this.onDeleteItem}
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
  onPressItemRecommend = (item) => {
    const { navigation } = this.props;
    navigation.navigate('ItemDetail', { data: item, userLocation: this.props.location });
  }
  onFocusSearch = async () => {
    this.setState({
      isFocusSearch: true,
    })
    await this.props.onGetSuggest(this.state.textSearch);
    this.setState({
      suggestList: this.props.suggestList
    })
  }
  onEndEditingSearch = async () => { // Xử lí tìm kiếm
    const { whatScreen } = this.state;
    await this.setState({
      List: [],
    })
    this.callApiGetListItem(whatScreen, 1);
    this.setState({
      textSearch: '',
      suggestList: [],
      isFocusSearch: false
    })
  }
  onChangeText = async (text) => {
    this.setState({
      textSearch: text
    });
    await this.props.onGetSuggest(text);
    this.setState({
      suggestList: this.props.suggestList
    });
  }
  onPressItemAuto = (item) => {
    Keyboard.dismiss();
    const { cate } = this.state;
    this.setState({
      cate: { ...cate, id: item.category_id, name: item.name },
      textSearch: item.name,
    })
  }
  onDeleteItem = (id) => {
    const { List } = this.state;
    const foundIndex = List.findIndex(item => item.id === id);
    List.splice(foundIndex, 1);
    this.setState({
      List: List
    })
  }


  render() {
    const {
      isLoading,
      whatScreen,
      isNewUser,
      List,
      textSearch,
      isFocusSearch,
      suggestList,
      cate
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.Header}>
          <SearchBox
            text={textSearch}
            list={suggestList}
            // onChangeText={(text) => this.setState({ textSearch: text })}
            onChangeText={(text) => this.onChangeText(text)}
            onPressItemAuto={this.onPressItemAuto}
            onEndEditingSearch={() => this.onEndEditingSearch(textSearch)}
            onFocusSearch={this.onFocusSearch}
            isFocusSearch={isFocusSearch}
            onclearTextOnFocus={this.onclearTextOnFocus}
          />
          <View style={{}}>
            <TouchableOpacity style={styles.buttonLoc} onPress={this.navigateModal}>
              <Text style={{ fontSize: 18, color: 'white', fontWeight: '100' }}>Lọc</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.Content}>
          {
            isNewUser ? // nếu là user mới (true) => 2 nút, User cũ (false) => 3 nút
              //user mới
              <View style={styles.TabButton}>
                <TouchableOpacity
                  style={whatScreen == "match" ? styles.ChoseButtonNew : styles.unChoseButtonNew}
                  onPress={this.onPressDungNhieu}
                >
                  <Text style={whatScreen == "match" ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Nổi bật</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={whatScreen == "distance" ? styles.ChoseButtonNew : styles.unChoseButtonNew}
                  onPress={this.onPressGanToi}
                >
                  <Text style={whatScreen == "distance" ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Gần tôi</Text>
                </TouchableOpacity>
              </View>
              :
              //user cũ
              <View style={styles.TabButton}>
                <TouchableOpacity
                  style={whatScreen == "match" ? styles.ChoseButton : styles.unChoseButton}
                  onPress={this.onPressDungNhieu}
                >
                  <Text style={whatScreen == "match" ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Nổi bật</Text>
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
          }
          <View style={styles.contentHeader}>
            <TouchableOpacity style={{ height: 20, }} onPress={() => { this.props.navigation.goBack() }}><Text style={{ color: 'rgba(241, 58, 58, 0.78)', fontSize: 17, marginLeft: screenWidth * 0.03 }}>← Trở về</Text></TouchableOpacity>
            <View style={styles.viewTextDanhMuc}>
              <Text style={styles.TextDanhMuc}>{cate.name}</Text>
            </View>
          </View>
          {
            isLoading ?
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, }}></Text>
                <ActivityIndicator size="large" color="black" />
                <Text style={{ color: 'gray', fontSize: 13, marginTop: 5 }}>Đang tải dữ liệu...</Text>
              </View>
              :
              <View style={styles.ListDanhMuc}>
              <View style={styles.lineHorizon}></View>
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
    flex: 0.12,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  buttonLoc: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(241, 58, 58, 0.78)',
    borderRadius: 8,
    height: 45,
    width: 50,
  },
  Content: {
    borderTopWidth: 0.8,
    borderColor: '#BDBDBD',
    flex: 0.88,
    flexDirection: 'column',
  },
  contentHeader: {
    marginTop: 10,
    flexDirection: 'column',
  },
  viewTextDanhMuc: {
    alignSelf: 'center',
    borderColor: 'black',
    // borderBottomWidth: 1,
    // width: screenWidth * 0.6,

    //shadow
    // shadowColor: "#00CFB5",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.4,
    // shadowRadius: 10,
    // elevation: 5,
  },
  TextDanhMuc: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '400',
  },
  lineHorizon:{
    height:1,
    width :screenWidth,
    borderBottomColor:'rgba(51, 51, 51, 0.4)',
    borderBottomWidth:1,
        // shadow
    shadowColor: "rgba(51, 51, 51, 0.4)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  TabButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  //button for new user
  ChoseButtonNew: {
    height: 55,
    width: screenWidth * 0.5,
    borderBottomColor: '#00CFB5',
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unChoseButtonNew: {
    height: 55,
    width: screenWidth * 0.5,
    borderBottomColor: 'rgba(51, 51, 51, 0.4)',
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //button for old user
  ChoseButton: {
    height: 55,
    width: screenWidth * 0.333333,
    borderBottomColor: '#00CFB5',
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unChoseButton: {
    height: 55,
    width: screenWidth * 0.33333333,
    borderBottomColor: 'rgba(51, 51, 51, 0.4)',
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ChoseTabButtonText: {
    fontWeight: '600',
    fontSize: 20,
  },
  UnChoseTabButtonText: {
    fontSize: 20,
    color: 'gray'
  },
  ListDanhMuc: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  }
});
