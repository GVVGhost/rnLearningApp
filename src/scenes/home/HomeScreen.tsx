import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/stacks/HomeStack.tsx';
import RootScreenWrapper from '@components/wrappers/RootScreenWrapper.tsx';
import {Text} from 'react-native';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC<Props> = ({}) => {
  return (
    <RootScreenWrapper
      style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
      <Text>Home screen</Text>
    </RootScreenWrapper>
  );
};

export default HomeScreen;
