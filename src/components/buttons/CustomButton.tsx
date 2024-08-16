import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {CornerRadius, Elevation, FontSize, Indent} from "@theme/DimensionValues.ts";

interface Props {
    text?: string;
    onPress?: () => void;
}

const CustomButton: React.FC<Props> = (
    {
        text = 'Button',
        onPress = () => console.log('Button pressed'),
    }
) => {
    const {colors} = useTheme();

    return <View style={{backgroundColor: colors.background, elevation: Elevation.S}}>
        <TouchableOpacity onPress={onPress} style={{
            backgroundColor: colors.primary,
            borderRadius: CornerRadius.M,
            padding: Indent.L
        }}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{
                    color: colors.background,
                    fontWeight: 'bold',
                    fontSize: FontSize.M,
                }}>{text.toUpperCase()}</Text>
            </View>
        </TouchableOpacity>
    </View>

};

export default CustomButton;
