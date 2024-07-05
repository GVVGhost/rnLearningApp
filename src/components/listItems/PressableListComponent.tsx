import React, {memo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  BorderWidth,
  FontSize,
  IconSize,
  Indent,
} from '@theme/DimensionValues.ts';
import {useTheme} from '@react-navigation/native';

export interface PressableListComponentProps {
  label?: string;
  leftIconName?: string;
  handler?: {
    onPress: () => void;
    iconName: string;
  };
}

const PressableListComponent: React.FC<PressableListComponentProps> = memo(
  ({
    label = 'Pressable list component',
    handler,
    leftIconName = 'information-outline',
  }) => {
    const {colors} = useTheme();

    return (
      <TouchableOpacity
        disabled={!handler}
        onPress={() => {
          if (handler) {
            handler.onPress();
          }
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: Indent.M,
            paddingVertical: Indent.M,
            borderBottomColor: colors.primary,
            borderBottomWidth: BorderWidth.M,
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', gap: Indent.L}}>
            <Icon
              name={leftIconName}
              size={IconSize.S}
              color={colors.primary}
            />
            <Text
              style={{
                fontSize: FontSize.S,
                color: colors.primary,
                fontWeight: '500',
              }}>
              {label}
            </Text>
          </View>
          {handler && (
            <Icon
              name={handler.iconName}
              size={IconSize.S}
              color={colors.primary}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  },
);

export default PressableListComponent;
