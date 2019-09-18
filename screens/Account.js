import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {}
    };
  }
  async getInfo() {
      const token = await AsyncStorage.getItem("@Token");
      await this.props.onGetInfo(token);
      this.setState({
          info: this.props.info,
      })
  }
  componentDidMount = () => {
      this.getInfo();
  }
  async resetKey() {
    try {
      await AsyncStorage.removeItem('@Token');
      console.log("Token remove")
    } catch (error) {
      console.log("Error resetting data" + error);
    }
  }
  async getKey() {
    try {
      const value = await AsyncStorage.getItem('@Token');
      console.log("Token: " + value)
    } catch (error) {
      console.log("Error getting Token" + error);
    }
  }
  onPressLogoutButton = () => {
    this.resetKey();
    this.props.navigation.navigate("Login");
  }
  onPressDoneButton = () => {
    this.props.navigation.navigate("Home");
  }

  render() {
    const {info}=this.state
    return (
      <View style={styles.container}>
        <View style={styles.Header}>
          <TouchableOpacity style={{ width: 200, height: 200, borderRadius: 100 }}
            onPress={() => {
              this.props.navigation.navigate("UploadPicture");
            }}
          >
            <Image
              style={{ width: 200, height: 200, borderRadius: 100 }}
              source={require('../assets/coffee-dessert.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.Content}>
          <Text style={styles.InfoText}>Số điện thoại: {info.phone} </Text>
          <Text style={styles.InfoText}>Tên tài khoản: {info.name}</Text>
          <Text style={styles.InfoText}>Thông tin cơ bản: Đẹp trai khoai to 15cm 30 phút</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity onPress={this.onPressLogoutButton} style={styles.logoutButton}>
              <Text style={{ fontSize: 15, fontWeight: '400', color: 'white' }}>Đăng xuất</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPressDoneButton} style={styles.doneButton}>
              <Text style={{ fontSize: 15, fontWeight: '400', color: 'red' }}>Xong</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  Header: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Content: {
    flex: 0.5,
    justifyContent: 'space-around',
  },
  InfoText: {
    marginVertical: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 100,
    borderRadius: 10,
    backgroundColor: "#3578E5",
  },
  doneButton: {
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 100,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
