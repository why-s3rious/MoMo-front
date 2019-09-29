import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { screenWidth, screenHeight } from '../costants/DeviceSize';

class ItemRecommend extends Component {
  render() {
    const {
      itemData,
      onPress,
    } = this.props;
    // let icon = '';
    // switch (screen) {
    //   case 'distance':
    //     {
    //       icon = require('../assets/directions_run_24px.png');
    //       break;
    //     }
    //   case 'time':
    //     {
    //       icon = require('../assets/book_24px.png');
    //       break;
    //     }
    //   default:
    //     {
    //       icon = require('../assets/whatshot_24px.png');
    //       break;
    //     }
    // }
    return (
      <View style={styles.RecommendItem}>
        <TouchableOpacity style={styles.content} onPress={() => onPress(itemData)}>
            <Text style={styles.NameText}>{itemData.name}</Text>
          <Image
            source={itemData.image}
            style={styles.ItemImage}
          />
          <Text style={styles.AddressText}>{itemData.address}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  RecommendItem: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: screenWidth * 0.9,
    height: screenHeight * 0.35,
    marginTop: 30,
    borderRadius: 8,
    //shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,

  },
  content: {
    flex: 1,
    borderTopColor: 'white',
    borderTopWidth: 0.5,
    borderRadius: 8,
    flexDirection: 'column',
  },
  NameText: {
    fontFamily: 'Roboto',
    fontSize: 17,
    fontWeight: '700',
    marginHorizontal: screenWidth * 0.01,
    marginVertical: 2,
  },
  AddressText: {
    fontFamily: 'Roboto',
    marginHorizontal: screenWidth * 0.01,
    marginTop: 2,
    fontSize: 15,
  },
  ItemImage: {
    marginBottom: 8,
    alignSelf: 'center',
    height: screenHeight * 0.24,
    width: screenWidth * 0.88,
    borderRadius: 8
  }
});

export default ItemRecommend;