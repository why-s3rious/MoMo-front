import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import StartStack from './StartStack';
export default createAppContainer(
  createSwitchNavigator(
    {
      Start : StartStack,
      Main: MainTabNavigator,
    },
    {
      initialRouteName: 'Start',
    }
  )
);
