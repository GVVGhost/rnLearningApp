import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootScreenWrapper from '@components/wrappers/RootScreenWrapper.tsx';
import {Text, TouchableOpacity} from 'react-native';
import {Indent} from '@theme/DimensionValues.ts';
import {useTheme} from "@react-navigation/native";
import {taskFormTIStyle} from "@theme/TextInputStyles.ts";
import {labelTextStyle} from "@theme/TextStyles.ts";
import {SandboxStackParamList} from "@navigation/stacks/SandboxStack.tsx";
import {useStore} from "@scenes/sandbox/SandboxScreen.tsx";

type Props = NativeStackScreenProps<SandboxStackParamList, 'DetailScreen'>;

const DetailScreen: React.FC<Props> = ({navigation}) => {
    const theme = useTheme();
    const textInputStyle = taskFormTIStyle(theme)
    const textLabelStyle = labelTextStyle(theme)
    const {count, inc, dec} = useStore()

    return (
        <RootScreenWrapper
            style={{flex: 1, gap: Indent.L, justifyContent: 'center', alignItems: 'center', columnGap: Indent.XL}}>
            <Text style={[textLabelStyle]}>Counter: {count}</Text>
            <TouchableOpacity onPress={inc} style={{marginVertical: Indent.XL}}>
                <Text style={[textLabelStyle, {color: theme.colors.primary}]}>Increase counter</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={dec} style={{marginVertical: Indent.XL}}>
                <Text style={[textLabelStyle, {color: theme.colors.primary}]}>Decrease counter</Text>
            </TouchableOpacity>
        </RootScreenWrapper>
    )
};

export default DetailScreen;
