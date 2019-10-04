import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, ActivityIndicator, FlatList, Alert } from 'react-native';

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
      whatScreen: "",
      isNewUser: this.props.infoUser.is_new,  // đọc trans, nếu có trans thì = true (user cũ), ko có thì = fasle (user mới)
      isFocusSearch: false,  // xét search input text focus, true/false gọi css khác nhau
      zone: '',
      area: '',
      disFrom: 0,
      disTo: 0,
      isSearch: false,
      saveTextSearch: '',
    };
    this.didFocusSubscription = props.navigation.addListener(
      'willFocus',
      async payload => {
        const { navigation } = this.props;
        const { whatScreen } = this.state;
        if (navigation.getParam("isFilter") == true) {
          await this.setState({
            List: [],
            cate: cateData,
            zone: navigation.getParam("zone"),
            area: navigation.getParam("area"),
            disFrom: navigation.getParam("disFrom"),
            disTo: navigation.getParam("disTo"),
            isSearch: true,
          })
          this.callApiGetListItem(whatScreen, 1);
        }
      }
    );
  }
  // call api
  async componentWillMount() {
    const { isNewUser } = this.state;
    if (isNewUser) {
      this.setState({
        whatScreen: "popular"
      })
      this.callApiGetListItem("popular", this.state.pageNum);
    }
    else {
      this.setState({
        whatScreen: "match"
      })
      this.callApiGetListItem("match", this.state.pageNum);
    }
  }

  callApiGetListItem = async (whatScreen, page) => {
    if (page == 1) {
      this.setState({
        isLoading: true,
      })
    }
    const { cate, textSearch, List, zone, area, disFrom, disTo } = this.state;
    let location = this.props.location;
    let locationUser = '';
    if (location != '') {
      locationUser = `${location.latitude},${location.longitude}`
    }
    let distanceFilter = '';
    if (disFrom != 0 || disTo != 0) {
      distanceFilter = `distance,${disFrom},${disTo}`
    }
    await this.props.onGetCategoryListItem(textSearch, whatScreen, page, cate.id, locationUser, zone, area, distanceFilter);
    if (typeof this.props.categoryListItem == 'object') {
      this.setState({
        isLoading: false,
        List: List.concat(this.props.categoryListItem.stores)
      })
    }
    else {
      this.setState({
        isLoading: false,
      })
    }

  }


  navigateModal = () => {
    this.props.navigation.navigate("Modal");
  }
  onPressPhuHop = async () => {
    const { isNewUser } = this.state;
    if (isNewUser) {
      Alert.alert(
        'Bạn là người dùng mới',
        'không đủ dữ kiện để xử lí - Hãy sử dụng ví MoMo thường xuyên để nhận được gợi ý phù hợp với bạn!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    }
    else {
      await this.setState({
        List: [],
        whatScreen: "match",
        pageNum: 1
      })
      this.callApiGetListItem("match", 1);
    }

  }
  onPressGanToi = async () => {
    await this.setState({
      List: [],
      whatScreen: "distance",
      pageNum: 1
    })
    this.callApiGetListItem("distance", 1);
  }
  onPressPhoBien = async () => {
    await this.setState({
      List: [],
      whatScreen: "popular",
      pageNum: 1
    })
    this.callApiGetListItem("popular", 1);
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
    const { whatScreen, textSearch } = this.state;
    await this.setState({
      List: [],
    })
    this.callApiGetListItem(whatScreen, 1);
    this.setState({
      saveTextSearch: textSearch,
      textSearch: '',
      suggestList: [],
      isFocusSearch: false,
      isSearch: true,
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
      // zone: '',
      // area: '',
      // disFrom: 0,
      // disTo: 0,
    })
  }
  onDeleteItem = async (id) => {
    this.setState({
      isLoading: true,
    })
    await this.props.onPostNotInterested(id);
    console.log("status post nt:", this.props.statusPostNotInterested);
    if (this.props.statusPostNotInterested == 'success') {
      const { List } = this.state;
      const foundIndex = List.findIndex(item => item.id === id);
      List.splice(foundIndex, 1);
      this.setState({
        isLoading: false,
        List: List
      })
    }
    else {
      alert("Server bị lỗi hoặc đang quá tải,vui lòng thử lại sau");
      this.setState({
        isLoading: false,
      })
    }
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
      isSearch,
      cate,
      zone, area, disFrom, disTo, saveTextSearch
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
          <View style={styles.TabButton}>
            <TouchableOpacity
              style={whatScreen == "match" ? styles.ChoseButton : styles.unChoseButton}
              onPress={this.onPressPhuHop}
            >
              <Text style={whatScreen == "match" ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Phù hợp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={whatScreen == "popular" ? styles.ChoseButton : styles.unChoseButton}
              onPress={this.onPressPhoBien}
            >
              <Text style={whatScreen == "popular" ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Phổ biến</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={whatScreen == "distance" ? styles.ChoseButton : styles.unChoseButton}
              onPress={this.onPressGanToi}
            >
              <Text style={whatScreen == "distance" ? styles.ChoseTabButtonText : styles.UnChoseTabButtonText}>Gần bạn</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentHeader}>
            <TouchableOpacity style={{ height: 20, width: screenWidth * 0.25 }} onPress={() => { this.props.navigation.goBack() }}><Text style={{ color: 'rgba(241, 58, 58, 0.78)', fontSize: 17, marginLeft: screenWidth * 0.03, }}>← Trở về</Text></TouchableOpacity>
            <View style={styles.viewTextDanhMuc}>
              <Text style={styles.TextDanhMuc}>{cate.name}</Text>
              <View style={styles.lineHorizon}></View>
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
                    isSearch ?
                      < View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 22, color: 'gray', fontWeight: '400' }}>Không tìm thấy cửa hàng phù hợp</Text>
                        <Text style={{ fontSize: 20, color: 'gray', fontWeight: '300' }}>Thông tin lọc:</Text>
                        <Text style={{ fontSize: 17, color: 'gray', fontWeight: '300' }}>{saveTextSearch} - Hồ Chí mình - {area}</Text>
                        <Text style={{ fontSize: 17, color: 'gray', fontWeight: '300' }}>khoảng cách từ {disFrom}-{disTo} km</Text>
                      </View>
                      :
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>Server lỗi hoặc quá tải</Text>
                        <Text style={{ fontSize: 25, color: 'black', fontWeight: 'bold' }}>Vui lòng thử lại sau</Text>
                      </View>
                }
              </View>
          }
        </View>
      </View >
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
    // marginTop: 10,
    flexDirection: 'column',
    backgroundColor:'rgba(208, 254, 240, 0.57)',
    paddingLeft:5,
    paddingRight:5,

  },
  viewTextDanhMuc: {
    alignSelf: 'center',
    borderColor: 'black',
  },
  TextDanhMuc: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '400',
  },
  lineHorizon: {
    height: 1,
    width: screenWidth,
    backgroundColor: 'rgba(51, 51, 51, 0.1)',
    // borderBottomColor: 'rgba(51, 51, 51, 0.4)',
    // borderBottomWidth: 1,
    // shadow
    shadowColor: "rgba(51, 51, 51, 0.4)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5,
  },
  TabButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ChoseButton: {
    height: 55,
    width: screenWidth * 0.333333,
    borderBottomColor: 'black',
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
