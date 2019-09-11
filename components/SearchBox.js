import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';


class SearchBox extends Component {
  state = {
    list : this.props.list
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
