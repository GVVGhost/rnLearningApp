import {Button} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

interface Props {
  text?: string;
  onPress?: () => void;
}

const CustomButton: React.FC<Props> = ({
  text = 'Button',
  onPress = () => console.log('Button pressed'),
}) => {
  const {colors} = useTheme();

  return <Button color={colors.primary} title={text} onPress={onPress} />;
};

export default CustomButton;
