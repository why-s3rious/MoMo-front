import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import CategoryButton from '../components/CategoryButton';
import { screenWidth, screenHeight } from '../costants/DeviceSize';

export default class Home extends Component {
  state = {
    Data: [],
  }
  componentWillMount = async () => {
    //ask for list category
    await this.props.onGetListCategory();
    this.setState({
      Data: this.props.listCategory
    })
    // ask for location
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.props.onGetLocation(null);
      console.log("location permission denine");
    }
    else {
      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      let lat = location.coords.latitude;
      let long = location.coords.longitude;
      let coords = {
        latitude: lat,
        longitude: long,
      }
      this.props.onGetLocation(coords);
      console.log("get location success");
    }
  }
  navigateModal = () => {
    this.props.navigation.navigate("Modal");
  };
  onPressCategoryButton = item => {
    this.props.navigation.navigate("MainHome", { data: item });
  };
  render() {
    const {
      Data
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.Header}>
          <Text style={{ fontWeight: '400', fontSize: 30, marginBottom: 10, }}>TRANG CHỦ</Text>
          <View>
            <TouchableOpacity style={styles.buttonLoc} onPress={this.navigateModal}>
              <Text>Lọc</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.Content}>
          <Text style={styles.TextDanhMuc}>DANH MỤC</Text>
          <ScrollView contentContainerStyle={styles.ListDanhMuc}>
            {
              Data != [] ?
                Data.map(item => {
                  return (
                    <CategoryButton
                      onPress={() => this.onPressCategoryButton(item)}
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
    flex: 0.15,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'flex-end'
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
    flex: 0.85,
    flexDirection: 'column',
  },
  TextDanhMuc: {
    marginLeft: 25,
    fontSize: 20,
    fontWeight: '400',
  },
  ListDanhMuc: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
