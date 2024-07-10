import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootScreenWrapper from '@components/wrappers/RootScreenWrapper.tsx';
import {FlatList} from 'react-native';
import {SettingsStackParamList} from '@navigation/stacks/SettingsStack.tsx';
import {deleteMultiple, readOne, SK} from '@utils/storage/mmkvStorage.ts';
import {useAuth} from '@contexts/AuthContext.tsx';
import PressableListComponent, {
  PressableListComponentProps,
} from '@components/listItems/PressableListComponent.tsx';
import {logOutDialog} from '@utils/notifications/Dialog.ts';
import VersionInfo from 'react-native-version-info';

type Props = NativeStackScreenProps<SettingsStackParamList, 'SettingsScreen'>;

const SettingsScreen: React.FC<Props> = ({}) => {
  const {setIsLogged} = useAuth();
  const [list, setList] = useState<PressableListComponentProps[]>([]);

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const init = () => {
    const name = readOne(SK.name);
    setList([
      {
        label: `User: ${name}`,
        leftIconName: 'account',
      },
      {
        label: 'Package name: ' + VersionInfo.bundleIdentifier,
        leftIconName: 'widgets-outline',
      },
      {
        label: 'Version name: ' + VersionInfo.appVersion,
        leftIconName: 'information-outline',
      },
      {
        label: 'Version code: ' + VersionInfo.buildVersion,
        leftIconName: 'information-outline',
      },
      {
        label: 'Log out',
        leftIconName: 'account-arrow-right',
        handler: {onPress: handleLogout, iconName: 'logout'},
      },
    ]);
  };

  const handleLogout = () => {
    logOutDialog(() => {
      deleteMultiple([SK.name]);
      setIsLogged(false);
    });
  };

  return (
    <RootScreenWrapper>
      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <PressableListComponent
            label={item.label}
            handler={item.handler}
            leftIconName={item.leftIconName}
          />
        )}
      />
    </RootScreenWrapper>
  );
};

export default SettingsScreen;
