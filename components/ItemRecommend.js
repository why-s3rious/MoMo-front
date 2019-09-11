import React, { Component } from 'react';
import { View, Text , TouchableOpacity, StyleSheet,Image } from 'react-native';

class ItemRecommend extends Component {
  render() {
    const {
        itemData,
        onPress,
    } = this.props;
    return (
      <View style={styles.RecommendItem}>
        <TouchableOpacity onPress={onPress}>
            <Image 
                source={{uri: itemData.image}}
                style ={styles.ItemImage}
            />
            <Text style={styles.NameText}>Tên cửa hàng : {itemData.name}</Text>
            <Text style={styles.AddressText}>Địa chỉ: {itemData.address}</Text>
            <Text> Danh mục : {itemData.categodyid}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    RecommendItem:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:20,
    },
    ItemImage:{
        height:100,
        width:300,
    }
});

export default ItemRecommend;