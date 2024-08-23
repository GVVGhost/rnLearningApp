import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '@scenes/home/HomeScreen.tsx';
import TaskScreen from '@scenes/home/TaskScreen.tsx';
import {TaskContainerObj} from "@utils/data/TaskTypes.ts";
import {useTheme} from "@react-navigation/native";

export type HomeStackParamList = {
    HomeScreen: undefined;
    TaskScreen: { data: TaskContainerObj, isNewTask: boolean };
};

const {Navigator, Screen} = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
    const {colors} = useTheme();
    return (
        <Navigator>
            <Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
            <Screen name="TaskScreen" component={TaskScreen} options={{headerShown: false}}/>
        </Navigator>
    );
};
export default HomeStack;
