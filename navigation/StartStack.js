import { AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import LoginContainer from '../container/LoginScreen';
import Onboarding from '../screens/Onboarding';
import RegisterContainer from '../container/RegisterScreen';
import TermContainer from '../container/TermScreen';
import LogoContainer from '../container/LogoScreen';
import AuthScreen from './AuthScreen';

//home stack
const StartStack = createStackNavigator(
  {
    // add login, onboarding, logo, register, term
    Auth: AuthScreen,
    Onboarding: Onboarding,
    Logo: LogoContainer,
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
