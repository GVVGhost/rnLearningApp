import {ReactNode} from 'react';
import {SafeAreaView, StatusBar, StyleProp, ViewStyle} from 'react-native';
import {useTheme} from '@react-navigation/native';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const RootScreenWrapper: React.FC<Props> = ({children, style}) => {
  const {colors} = useTheme();
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: colors.background,
          padding: 10,
        },
        style,
      ]}>
      <StatusBar backgroundColor={colors?.primary} barStyle="light-content" />
      {children}
    </SafeAreaView>
  );
};

export default RootScreenWrapper;