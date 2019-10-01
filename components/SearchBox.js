import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { screenWidth, screenHeight } from '../costants/DeviceSize';


class SearchBox extends Component {

  findStore(query) {
    if (query === '') {
      return [];
    }
    if (this.props.list != null) {
      const newData = this.props.list.filter(function (item) {
        //applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = query.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      return newData;
    }
    return [];
  }

  render() {
    const {
      text,
      onChangeText,
      onPressItemAuto,
      onEndEditingSearch,
      onFocusSearch,
      isFocusSearch
    } = this.props;
    const list = this.findStore(text);
    return (
      <View style={styles.searchGroup}>
        <Autocomplete
          onFocus={onFocusSearch}
          onEndEditing={onEndEditingSearch}
          onChangeText={onChangeText}
          style={styles.inputText}
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          inputContainerStyle={styles.searchBar}  // css xung quanh cai input Text
          listContainerStyle={isFocusSearch ? styles.listContainerStyleFocus : styles.listContainerStyle} // xung quanh cai list result
          listStyle={styles.listStyle} // cái list result
          data={list}
          defaultValue={text}
          placeholder='Nhập từ khóa tìm kiếm'
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
  searchGroup: {
    width: screenWidth * 0.7,
    height: 45,
  },
  searchBar: {
    height: '100%',
    backgroundColor: "#FBFBFB",
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 20,
  },
  inputText: {
    fontSize: 18,
    height: 28,
    width: screenWidth * 0.65
  },
  listContainerStyleFocus: {
    borderColor: 'white',
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 80,
    zIndex: 1,
  },
  listContainerStyle: {
    borderColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    height: 80,
  },
  listStyle: {

  },
});


export default SearchBox;
