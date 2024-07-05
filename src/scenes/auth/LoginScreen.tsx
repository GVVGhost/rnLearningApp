import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootScreenWrapper from '@components/wrappers/RootScreenWrapper.tsx';
import {KeyboardAvoidingView, ScrollView, View} from 'react-native';
import {AuthStackParamList} from '@navigation/stacks/AuthStack.tsx';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import {Indent, LargeViewSize} from '@theme/DimensionValues.ts';
import CustomTextInput from '@components/textInputs/CustomTextInput.tsx';
import CustomButton from '@components/buttons/CustomButton.tsx';
import {
  LocalSessionDataObj,
  saveMultiple,
  SK,
  storageKeyValue,
} from '@utils/storage/mmkvStorage.ts';
import {useAuth} from '@contexts/AuthContext.tsx';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

type Props = NativeStackScreenProps<AuthStackParamList, 'LoginScreen'>;

const LoginScreen: React.FC<Props> = ({}) => {
  const [username, setUsername] = useState<string>('');
  const {colors} = useTheme();
  const {setIsLogged} = useAuth();

  const onLogInPressed = () => {
    if (username && username.trim().length > 0) {
      const saved = saveData({username});
      if (saved) {
        setUsername('');
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Login',
          textBody: 'Log in successful',
          autoClose: 400,
        });
        setIsLogged(true);
      }
    }
  };

  const saveData = (sessionData: LocalSessionDataObj): boolean => {
    const sd: storageKeyValue[] = [
      {key: SK.username, value: sessionData.username},
    ];
    const result = saveMultiple(sd);
    const hasUnsaved = result.some(item => !item.success);
    if (hasUnsaved) {
      const missedCred = result
        .filter(item => !item.success)
        .map(item => item.key)
        .join(', ');
      Toast.show({
        autoClose: 3000,
        type: ALERT_TYPE.WARNING,
        textBody: `Failed to save session locally. Missed data: ${missedCred}`,
      });
    }
    return !hasUnsaved;
  };

  return (
    <RootScreenWrapper>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center'}}>
          <View style={{gap: Indent.XL}}>
            <Icon
              name="login"
              style={{alignSelf: 'center'}}
              size={LargeViewSize.M}
              color={colors.primary}
            />
            <CustomTextInput
              placeholder={'Enter your username'}
              keyboardType={'default'}
              value={username}
              onChangeText={setUsername}
              onSubmitEditing={onLogInPressed}
            />
            <CustomButton onPress={onLogInPressed} text={'Log In'} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </RootScreenWrapper>
  );
};

export default LoginScreen;
