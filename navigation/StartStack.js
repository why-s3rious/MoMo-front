import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';

import LoginContainer from '../container/LoginScreen';
import Onboarding from '../screens/Onboarding';
import RegisterContainer from '../container/RegisterScreen';
import TermContainer from '../container/TermScreen';
import Logo from '../screens/Logo';

//home stack
const StartStack = createStackNavigator(
  {
    //add login, onboarding, logo, register, term
    Onboarding: Onboarding,
    Logo: Logo,
    Login: LoginContainer,
    Register: RegisterContainer,
    Term: TermContainer
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);


export default StartStack;
