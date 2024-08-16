import {TextInput, TextInputProps, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {
  BorderWidth,
  CornerRadius,
  Elevation,
  FontSize,
  Indent,
} from '@theme/DimensionValues.ts'; // import {useTheme} from '@react-navigation/native';

const CustomTextInput: React.FC<TextInputProps> = props => {
  const {colors} = useTheme();

  return (
    <View>
      <TextInput
        {...props}
        placeholderTextColor={colors.text}
        style={[
          {
            alignItems: 'baseline',
            borderWidth: BorderWidth.L,
            borderRadius: CornerRadius.L,
            elevation: Elevation.S,
            fontSize: FontSize.M,
            fontWeight: '500',
            paddingHorizontal: Indent.XL,
            paddingVertical: Indent.L,
            backgroundColor: colors.background,
            borderColor: colors.primary,
            color: colors.primary,
          },
        ]}
      />
    </View>
  );
};

export default CustomTextInput;
