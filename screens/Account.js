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
          <Image
            style={{ width: 200, height: 200,borderRadius:100 }}
            source={require('../assets/coffee-dessert.png')}
          />
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
  Header: {
    flex: 0.5,
    justifyContent:'center',
    alignItems:'center',
  },
  Content: {
    flex: 0.5,
  }
});
