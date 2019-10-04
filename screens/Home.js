import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, AsyncStorage, Image } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import CategoryButton from '../components/CategoryButton';
import { screenWidth, screenHeight } from '../costants/DeviceSize';

export default class Home extends Component {
  state = {
    Data: [],
    isLoading: true,
  }
  componentWillMount = async () => {
    //ask for list category
    this.props.onGetZones();
    await this.props.onGetListCategory();
    if (this.props.listCategory === 401) {
      alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
      await AsyncStorage.removeItem('@Token');
      this.props.navigation.navigate("Login");
      return;
    }
    const token = await AsyncStorage.getItem('@Token');
    await this.props.onGetInfo(token);

    this.setState({
      Data: this.props.listCategory,
      isLoading: false,
    })
    // ask for location
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.props.onGetLocation('');
      console.log("location permission denine");
    }
    else {
      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      console.log("get location: ", location)
      let lat = location.coords.latitude;
      let long = location.coords.longitude;
      let coords = {
        latitude: lat,
        longitude: long,
      }
      this.props.onGetLocation(coords);
    }
  }
  onPressCategoryButton = item => {
    this.props.navigation.navigate("MainHome", { data: item });
  };
  render() {
    const {
      Data,
      isLoading
    } = this.state;
    if (isLoading) {
      return (
        <View style={styles.container}>
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.85 }}>
            <ActivityIndicator size="large" color="black" />
            <Text style={{ color: 'gray', fontSize: 13, marginTop: 5 }}>Đang tải dữ liệu...</Text>
          </View>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.Header}>
          <Image
            style={{ width: 50, height: 50, marginLeft: screenWidth * 0.05, marginBottom: 5, }}
            source={require('../assets/momo-mini-logo.png')}
          />
        </View>
        <View style={styles.Content}>
          <Text style={styles.TextDanhMuc}>DANH MỤC</Text>
          <ScrollView contentContainerStyle={styles.ListDanhMuc}>
            {
              Data.length > 0 ?
                Data.map(item => {
                  return (
                    <CategoryButton
                      onPress={this.onPressCategoryButton}
                      Data={item}
                      key={item.id} />
                  )
                })
                :
                <View>
                  <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold', flex: 1 }}>Server lỗi hoặc quá tải</Text>
                  <Text style={{ fontSize: 25, color: 'black', fontWeight: 'bold', flex: 1 }}>Vui lòng thử lại sau</Text>
                </View>
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
    flex: 0.12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderColor: "rgba(51, 51, 51, 0.1)",
  },
  buttonLoc: {
    marginBottom: 10,
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
    flex: 0.88,
    flexDirection: 'column',
  },
  TextDanhMuc: {
    fontFamily: 'Roboto',
    marginLeft: screenWidth * 0.1,
    fontSize: 20,
    fontWeight: '400',
    borderColor: 'black',
    borderBottomWidth: 1,
    width: screenWidth * 0.4,
  },
  ListDanhMuc: {
    flexDirection: 'column',
    justifyContent: 'center',
  }
});