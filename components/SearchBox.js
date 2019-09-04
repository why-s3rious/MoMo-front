import React, { Component } from 'react';
import { View, Text,TextInput,StyleSheet,TouchableOpacity } from 'react-native';

class SearchBox extends Component {
  render() {
    return (
      <View>
          <TouchableOpacity
            style={styles.textBox}
          >
            <Text>Tìm kiếm hợp lệ</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    textBox:{
        height:40,
        width:200,
        borderWidth:1,
        borderColor:'gray',
    }

});


export default SearchBox;
