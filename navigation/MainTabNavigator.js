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
  tabBarLabel: 'Trang chính',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='md-home'
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
  tabBarLabel: 'Tài khoản',
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
}, {
  tabBarOptions: {
    activeTintColor: "#00CFB5",
    inactiveTintColor: "#ddd",
    style: {
      shadowOffset: { width: 0, height: 0 },
      borderTopColor: 'transparent',
      backgroundColor: '#FFF',
    },
  }
}
);

tabNavigator.path = '';


export default tabNavigator;
