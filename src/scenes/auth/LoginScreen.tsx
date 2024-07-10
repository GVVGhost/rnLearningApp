import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootScreenWrapper from '@components/wrappers/RootScreenWrapper.tsx';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {AuthStackParamList} from '@navigation/stacks/AuthStack.tsx';
import {useTheme} from '@react-navigation/native';
import {IconSize, Indent} from '@theme/DimensionValues.ts';
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
import {authenticate} from '@api/requests/authenticateHelper.ts';

type Props = NativeStackScreenProps<AuthStackParamList, 'LoginScreen'>;

const LoginScreen: React.FC<Props> = ({}) => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [processing, setProcessing] = useState(false);
  const {colors} = useTheme();
  const {setIsLogged} = useAuth();

  const performAuth = () => {
    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      (!isLogin && name.trim().length === 0)
    ) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        textBody: 'Please fill all fields',
      });
      return;
    }
    const url = isLogin ? '/login' : '/register';
    let data = {email, password, name};
    setProcessing(true);
    authenticate(url, data)
      .then(response => {
        if (response) {
          const saved = saveData({
            name: response.name,
            email: response.email,
            id: response.id,
          });
          if (saved) {
            setEmail('');
            setPassword('');
            setName('');
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: isLogin ? 'Login' : 'Registration',
              textBody: isLogin
                ? 'Login successful'
                : 'Registration successful',
              autoClose: 400,
            });
            setIsLogged(true);
          }
        }
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  const saveData = (sessionData: LocalSessionDataObj): boolean => {
    const sd: storageKeyValue[] = [{key: SK.name, value: sessionData.name}];
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
      <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
        <View style={{gap: Indent.L}}>
          {!isLogin && (
            <CustomTextInput
              placeholder={'Enter your name'}
              keyboardType={'default'}
              value={name}
              onChangeText={setName}
            />
          )}
          <CustomTextInput
            placeholder={'Enter your email'}
            keyboardType={'email-address'}
            value={email}
            onChangeText={setEmail}
          />
          <CustomTextInput
            placeholder={'Enter your password'}
            keyboardType={'default'}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <CustomButton
            onPress={performAuth}
            text={isLogin ? 'Log In' : 'Register'}
          />
          <CustomButton
            onPress={() => setIsLogin(prevState => !prevState)}
            text={isLogin ? 'Register' : 'Return to login'}
          />
        </View>
      </ScrollView>
      <ActivityIndicator
        animating={processing}
        size={IconSize.M}
        color={colors.primary}
      />
    </RootScreenWrapper>
  );
};

export default LoginScreen;
