import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screens/Login';
import Onboarding from '../screens/Onboarding';

//home stack
const StartStack = createStackNavigator(
  {
    //add login, onboarding
    Onboarding: Onboarding,
    Login: Login,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);


export default StartStack;
