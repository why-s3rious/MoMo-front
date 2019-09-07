import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

const Data = [
  { id: 1, name: 'Phúc Long', image: require('../assets/Momo_1.jpg'), address: 'quận 1', longdis: '7km', price: '100.000 - 200.000' },
  { id: 2, name: 'The Coffee House', image: require('../assets/Momo_2.jpg'), address: 'quận 2', longdis: '6km', price: '150.000 - 200.000' },
  { id: 3, name: 'Hoàng Yến Buffet', image: require('../assets/Momo_3.jpg'), address: 'quận 3', longdis: '5km', price: '300.000 - 400.000' },
  { id: 4, name: 'Phúc Long', image: require('../assets/Momo_1.jpg'), address: 'quận 4', longdis: '4km', price: '250.000 - 300.000' },
  { id: 5, name: 'The Coffee House', image: require('../assets/Momo_2.jpg'), address: 'quận 5', longdis: '3km', price: '50.000- 100.000' },
  { id: 6, name: 'Hoàng Yến Buffet', image: require('../assets/Momo_3.jpg'), address: 'quận 6', longdis: '2km', price: '500.000 - 1.000.000' },
];

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: Data,
    };
  }

  findFilm(query) {
    if (query === '') {
      return [];
    }
    const { list } = this.state;
    const newData = list.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = query.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    return newData;
  }

  render() {
    const {
      text,
      onChangeText,
      onPressItemAuto,
    } = this.props;
    const list = this.findFilm(text);
    return (
      // <View>
      //   {/* <TextInput style={styles.textBox}
      //     value={text}
      //     onChangeText={onChangeText}
      //     placeholder='Tìm kiếm'
      //     onEndEditing={onEndEditing}
      //   /> */}

      // </View>
      <View style={styles.searchBar}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autoContainerStyle}
          listContainerStyle ={styles.listContainerStyle}
          data={list}
          defaultValue={text}
          onChangeText={onChangeText}
          placeholder='Tìm kiếm'
          renderItem={
            ({ item }) =>
              <TouchableOpacity onPress={() => onPressItemAuto(item)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    width: 200,
    height: 40,
    flexDirection: 'column',
  },
  autoContainerStyle: {
  },
  listContainerStyle:{
    backgroundColor: 'rgba(255,255,255,1.0)',
    height:60,
  }
});


export default SearchBox;
