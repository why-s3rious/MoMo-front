import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { screenWidth, screenHeight } from '../costants/DeviceSize';
class ItemRecommend extends Component {
  render() {
    const {
      itemData,
      onPress,
    } = this.props;
    return (
      <View style={styles.RecommendItem}>
        <TouchableOpacity style={styles.content} onPress={onPress}>
          <Image
            source={require('../assets/Momo_3.jpg')}
            style={styles.ItemImage}
          />
          <Text style={styles.NameText}>Tên cửa hàng : {itemData.name}</Text>
          <Text style={styles.AddressText}>Địa chỉ: {itemData.address}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  RecommendItem: {
    flexDirection: 'column',
    width: screenWidth * 0.9,
    height: screenHeight * 0.3,
    marginVertical: 20,
  },
  content: {

  },
  ItemImage: {
    height: screenHeight*0.2,
    width: screenWidth*0.9,
  }
});

export default ItemRecommend;