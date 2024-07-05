import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from '@navigation/stacks/AuthStack.tsx';
import {useAuth} from '@contexts/AuthContext.tsx';
import BottomNavBar from '@navigation/BottomNavBar.tsx';
import {useColorScheme} from 'react-native';
import DarkTheme from '@theme/DarkTheme.tsx';
import LightTheme from '@theme/LightTheme.tsx';

export type RootStackParamList = {
  BottomNavBar: undefined;
  AuthStack: undefined;
};

const {Navigator, Screen} = createStackNavigator<RootStackParamList>();
const screenOptions = {headerShown: false};

export const RootNavigator = () => {
  const {isLogged} = useAuth();
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
      <Navigator screenOptions={screenOptions}>
        {isLogged ? (
          <Screen name="BottomNavBar" component={BottomNavBar} />
        ) : (
          <Screen name="AuthStack" component={AuthStack} />
        )}
      </Navigator>
    </NavigationContainer>
  );
};
