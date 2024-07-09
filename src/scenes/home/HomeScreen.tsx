import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@navigation/stacks/HomeStack.tsx';
import RootScreenWrapper from '@components/wrappers/RootScreenWrapper.tsx';
import {ALERT_TYPE, IConfigToast, Toast} from 'react-native-alert-notification';
import CustomButton from '@components/buttons/CustomButton.tsx';
import {View} from 'react-native';
import {Indent} from '@theme/DimensionValues.ts';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC<Props> = ({}) => {
  const showToast = (args: IConfigToast): void => Toast.show(args);

  const list: {label: string; args: IConfigToast}[] = [
    {
      label: 'Show WARNING Toast',
      args: {
        type: ALERT_TYPE.WARNING,
        title: 'This is a WARNING Toast',
      },
    },
    {
      label: 'Show SUCCESS Toast',
      args: {
        type: ALERT_TYPE.SUCCESS,
        title: 'This is a SUCCESS Toast',
      },
    },
    {
      label: 'Show INFO Toast',
      args: {
        type: ALERT_TYPE.INFO,
        title: 'This is a INFO Toast',
      },
    },
    {
      label: 'Show DANGER Toast',
      args: {
        type: ALERT_TYPE.DANGER,
        title: 'This is a warning Toast',
      },
    },
  ];

  return (
    <RootScreenWrapper
      style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
      <View style={{gap: Indent.XL}}>
        {list.map((value, index) => (
          <CustomButton
            key={index}
            text={value.label}
            onPress={() => showToast(value.args)}
          />
        ))}
      </View>
    </RootScreenWrapper>
  );
};

export default HomeScreen;
