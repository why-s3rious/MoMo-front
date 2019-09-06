import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class UploadPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.BackButton}
          onPress={() => { this.props.navigation.goBack(); }}
        >
          <Text style={{ fontSize: 30 }}> Trở về </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 30 }}> Tải ảnh lên </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BackButton: {
    width: 100,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
  }
});