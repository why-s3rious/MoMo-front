import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.Header}>
          <TouchableOpacity style={{ width: 200, height: 200, borderRadius: 100 }}
            onPress = {()=>{
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
          <Text style={styles.InfoText}>Tên tài khoản: 0356775770</Text>
          <Text style={styles.InfoText}>Tên tài khoản: Ngọc Thiện</Text>
          <Text style={styles.InfoText}>Thông tin cơ bản: Đẹp trai khoai to 15cm 30 phút</Text>
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  InfoText: {
    marginVertical: 10,
  }
});
