import React, { Component } from 'react';
import { View, Text,StyleSheet , TouchableOpacity } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <AppNavigator />
    );
  }
}
