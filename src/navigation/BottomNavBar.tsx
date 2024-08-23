import HomeStack, {HomeStackParamList} from '@navigation/stacks/HomeStack.tsx';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsStack, {SettingsStackParamList,} from '@navigation/stacks/SettingsStack.tsx';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CornerRadius, Elevation, Indent} from '@theme/DimensionValues.ts';
import {useTheme} from '@react-navigation/native';
import SandboxStack, {SandboxStackParamList} from "@navigation/stacks/SandboxStack.tsx";

export type BottomNavBarProps = {
    HomeStack: HomeStackParamList;
    SettingsStack: SettingsStackParamList;
    SandboxStack: SandboxStackParamList;
};

const {Navigator, Screen} = createBottomTabNavigator<BottomNavBarProps>();

const BottomNavBar = () => {
    const {colors} = useTheme();

    return (
        <Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    margin: Indent.M,
                    borderColor: colors.card,
                    borderRadius: CornerRadius.M,
                    elevation: Elevation.M,
                },
            }}>
            <Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Icon name="home" color={color} size={size}/>
                    ),
                }}
            />
            <Screen
                name="SandboxStack"
                component={SandboxStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Icon name="apps-box" color={color} size={size}/>
                    ),
                }}
            />
            <Screen
                name="SettingsStack"
                component={SettingsStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Icon name="cog" color={color} size={size}/>
                    ),
                }}
            />
        </Navigator>
    );
};

export default BottomNavBar;
