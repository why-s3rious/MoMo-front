import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screens/Login';
import Onboarding from '../screens/Onboarding';
import Onboarding_1 from '../screens/Onboarding_1';
import Onboarding_2 from '../screens/Onboarding_2';

//home stack
const StartStack = createStackNavigator(
  {
    //add login, onboarding
    Onboarding: Onboarding,
    Onboarding_1: Onboarding_1,
    Onboarding_2: Onboarding_2,
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
