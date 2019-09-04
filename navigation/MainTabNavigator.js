import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import Home from '../screens/Home';
import Account from '../screens/Account';

//home stack
const HomeStack = createStackNavigator(
  {
    Home: Home,
    
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='md-information-circle'
    />
  ),
};

// Account Stack
const AccountStack = createStackNavigator(
  {
    Account: Account,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='md-person'
    />
  ),
};


HomeStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  AccountStack,
}
);

tabNavigator.path = '';


export default tabNavigator;
