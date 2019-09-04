import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

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

        </View>
        <View style={styles.Content}>

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
  Header:{
    flex:0.3,
    backgroundColor:'red',
  },
  Content:{
    flex:0.7,
    backgroundColor:'blue'
  }
});
