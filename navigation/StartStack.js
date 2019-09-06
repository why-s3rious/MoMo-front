import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screens/Login';
import Onboarding from '../screens/Onboarding';
import Register from '../screens/Register';
import Term from '../screens/Term';

//home stack
const StartStack = createStackNavigator(
  {
    //add login, onboarding, register, term
    Onboarding: Onboarding,
    Login: Login,
    Register: Register,
    Term: Term
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);


export default StartStack;
