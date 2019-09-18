import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeContainer from '../container/HomeScreen';
import AccountContainer from '../container/AccountScreen';
import Modal from '../screens/Modal';
import MainHomeContainer from '../container/MainHomeScreen';
import ItemDetail from '../screens/ItemDetail';
import ItemAddress from '../screens/ItemAddress';
import UploadPicture from '../screens/UploadPicture';

//home stack
const HomeStack = createStackNavigator(
  {
    Home: HomeContainer,
    Modal: Modal,
    MainHome: MainHomeContainer,
    ItemDetail: ItemDetail,
    ItemAddress: ItemAddress,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    initialRouteName: 'Home',
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
    Account: AccountContainer,
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
