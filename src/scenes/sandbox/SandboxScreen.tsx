import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootScreenWrapper from '@components/wrappers/RootScreenWrapper.tsx';
import {Text, TouchableOpacity} from 'react-native';
import {Indent} from '@theme/DimensionValues.ts';
import {useTheme} from "@react-navigation/native";
import {taskFormTIStyle} from "@theme/TextInputStyles.ts";
import {labelTextStyle} from "@theme/TextStyles.ts";
import {SandboxStackParamList} from "@navigation/stacks/SandboxStack.tsx";
import {create} from "zustand";

type Props = NativeStackScreenProps<SandboxStackParamList, 'SandboxScreen'>;

export type SandboxStore = {
    count: number;
    inc: () => void;
    dec: () => void;
}

export const useStore = create<SandboxStore>()((set) => ({
    count: 1,
    inc: () => set((state) => ({count: state.count + 1})),
    dec: () => set((state) => ({count: state.count - 1}))
}))

const SandboxScreen: React.FC<Props> = ({navigation}) => {
    const theme = useTheme();
    const textInputStyle = taskFormTIStyle(theme)
    const textLabelStyle = labelTextStyle(theme)
    const {count} = useStore()

    const goToDetailScreen = () => {
        navigation.navigate('DetailScreen');
    }

    return (
        <RootScreenWrapper
            style={{flex: 1, gap: Indent.L, justifyContent: 'center', alignItems: 'center', columnGap: Indent.XL}}>
            <Text style={[textLabelStyle]}>Counter: {count}</Text>
            <TouchableOpacity onPress={goToDetailScreen} style={{marginVertical: Indent.XL}}>
                <Text style={[textLabelStyle, {color: theme.colors.primary}]}>Detail screen</Text>
            </TouchableOpacity>
        </RootScreenWrapper>
    )
};

export default SandboxScreen;
