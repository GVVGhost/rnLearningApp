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
            borderRadius: CornerRadius.XS,
            elevation: Elevation.S,
            fontSize: FontSize.S,
            fontWeight: '500',
            paddingHorizontal: Indent.L,
            paddingVertical: Indent.M,
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
