import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screens/Login';
import Onboarding from '../screens/Onboarding';
import Register from '../screens/Register';
import Term from '../screens/Term';
import Logo from '../screens/Logo';

//home stack
const StartStack = createStackNavigator(
  {
    //add login, onboarding, logo, register, term
    Onboarding: Onboarding,
    Logo: Logo,
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
