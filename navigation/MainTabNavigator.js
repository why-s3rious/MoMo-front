import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeContainer from '../container/HomeScreen';
import AccountContainer from '../container/AccountScreen';
import ModalContainer from '../container/ModalScreen';
import MainHomeContainer from '../container/MainHomeScreen';
import ItemDetail from '../screens/ItemDetail';
import ItemAddress from '../screens/ItemAddress';
import UploadPicture from '../screens/UploadPicture';

//home stack
const HomeStack = createStackNavigator(
  {
    Home: HomeContainer,
    Modal: ModalContainer,
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
    activeTintColor: "#000000",
    inactiveTintColor: "#ddd",
    style: {
      shadowOffset: { width: 0, height: 0 },
      borderTopColor: 'transparent',
      backgroundColor: '#E5FAF7',
    },
  }
}
);

tabNavigator.path = '';


export default tabNavigator;
