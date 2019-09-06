import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import Home from '../screens/Home';
import Account from '../screens/Account';
import Modal from '../screens/Modal';
import MainHome from '../screens/MainHome';
import ItemDetail from '../screens/ItemDetail';
import ItemAddress from '../screens/ItemAddress';
import Direction from '../screens/Direction';
import SearchScreen from '../screens/SearchScreen';
import UploadPicture from '../screens/UploadPicture';

//home stack
const HomeStack = createStackNavigator(
  {
    Home: Home,
    Modal: Modal,
    MainHome: MainHome,
    ItemDetail: ItemDetail,
    ItemAddress: ItemAddress,
    Direction: Direction,
    SearchScreen: SearchScreen,
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
    UploadPicture: UploadPicture,
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
