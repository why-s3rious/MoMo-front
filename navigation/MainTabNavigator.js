import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import Home from '../screens/Home';
import Account from '../screens/Account';
import Modal from '../screens/Modal';
import DungNhieu from '../screens/DungNhieuScreen';
import Login from '../screens/Login';
import Onboarding from '../screens/Onboarding';
import Onboarding_1 from '../screens/Onboarding_1';
import Onboarding_2 from '../screens/Onboarding_2';

//home stack
const HomeStack = createStackNavigator(
  {
    //add login, onboarding
    Onboarding: Onboarding,
    Onboarding_1: Onboarding_1,
    Onboarding_2: Onboarding_2,
    Login: Login,
    Home: Home,
    Modal: Modal,
    DungNhieu: DungNhieu,
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
