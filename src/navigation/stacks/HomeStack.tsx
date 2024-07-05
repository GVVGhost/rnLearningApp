import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '@scenes/home/HomeScreen.tsx';

export type HomeStackParamList = {
  HomeScreen: undefined;
};

const {Navigator, Screen} = createStackNavigator<HomeStackParamList>();

const HomeStack = () => (
  <Navigator screenOptions={{headerShown: false}}>
    <Screen name="HomeScreen" component={HomeScreen} />
  </Navigator>
);
export default HomeStack;
