import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { screenWidth, screenHeight } from '../costants/DeviceSize';
import Swipeout from 'react-native-swipeout';
class ItemRecommend extends Component {
  state = {
    activeRowKey: null,
  }
  render() {
    const {
      itemData,
      onPress,
      onDeleteItem
    } = this.props;
    const swipeSettings = {
      autocClose: true,
      style: styles.Swipeout,
      buttonWidth: screenWidth * 0.4,
      onClose: (secId, rowId, direction) => {
        if (this.state.activeRowKey != null) {
          this.setState({
            activeRowKey: null,
          })
        }
      },
      onOpen: (secId, rowId, direction) => {
        this.setState({
          activeRowKey: itemData.id,
        })
      },
      right: [
        {
          onPress: () => {
            Alert.alert(
              'Hey honey..',
              "Are you sure you want to do that :( ? ",
              [
                { text: 'No', onPress: () => console.log('Cancel Dislike!'), style: 'cancel' },
                { text: 'Yes', onPress: () => onDeleteItem(itemData.id) }
              ]
            );
          },
          backgroundColor: 'rgba(241, 58, 58, 0.78)',
          text: "Not interested", type: 'delete'
        }
      ],
      rowId: this.props.itemData.id,
      sectionId: 1,
    };

    return (
      <Swipeout {...swipeSettings} >
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
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  Swipeout: {
    width: screenWidth,
    height: screenHeight * 0.41,
    backgroundColor: 'white',
    marginTop: 30,
  },
  RecommendItem: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: screenWidth * 0.9,
    height: screenHeight * 0.4,
    borderRadius: 8,
    //shadow
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.6655,
shadowRadius: 3.84,

elevation: 5,

  },
  content: {
    zIndex: 1,
    flex: 1,
    borderTopColor: 'white',
    borderTopWidth: 0.5,
    borderRadius: 8,
    flexDirection: 'column',
  },
  NameText: {
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: '700',
    marginHorizontal: screenWidth * 0.01,
    marginVertical: 3,
  },
  AddressText: {
    fontFamily: 'Roboto',
    marginHorizontal: screenWidth * 0.01,
    marginTop: 3,
    fontSize: 13,
  },
  ItemImage: {
    marginBottom: 8,
    alignSelf: 'center',
    height: screenHeight * 0.28,
    width: screenWidth * 0.88,
    borderRadius: 8
  }
});

export default ItemRecommend;
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