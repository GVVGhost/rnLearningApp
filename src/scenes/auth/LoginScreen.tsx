import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootScreenWrapper from '@components/wrappers/RootScreenWrapper.tsx';
import {ActivityIndicator, ScrollView, TextInput, View} from 'react-native';
import {AuthStackParamList} from '@navigation/stacks/AuthStack.tsx';
import {useTheme} from '@react-navigation/native';
import {IconSize, Indent} from '@theme/DimensionValues.ts';
import PrimaryButton from '@components/buttons/PrimaryButton.tsx';
import {LocalSessionDataObj, saveMultiple, SK, storageKeyValue,} from '@utils/storage/mmkvStorage.ts';
import {useAuth} from '@contexts/AuthContext.tsx';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {authenticate} from '@api/requests/authenticateHelper.ts';
import {customTIStyle} from "@theme/TextInputStyles.ts";

type Props = NativeStackScreenProps<AuthStackParamList, 'LoginScreen'>;

const LoginScreen: React.FC<Props> = ({}) => {
    const theme = useTheme();
    const textInputStyle = customTIStyle(theme)
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
        setProcessing(true);
        authenticate(
            isLogin ? '/login' : '/register',
            {email, password, name}
        ).then(response => {
            if (response) {
                const saved = saveData({
                    name: response.name,
                    email: response.email,
                    id: response.id,
                    token: response.token,
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
        }).finally(() => {
            setProcessing(false);
        });
    };

    const saveData = (sessionData: LocalSessionDataObj): boolean => {
        const sd: storageKeyValue[] = [
            {key: SK.id, value: sessionData.id},
            {key: SK.name, value: sessionData.name},
            {key: SK.email, value: sessionData.email},
            {key: SK.token, value: sessionData.token},
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

    return <RootScreenWrapper style={{padding: Indent.XL}}>
        <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
            <View style={{gap: Indent.L}}>
                {!isLogin && <TextInput
                    placeholder={'Enter your name'}
                    keyboardType={'default'}
                    value={name}
                    onChangeText={setName}
                    style={textInputStyle}
                />}
                <TextInput
                    placeholder={'Enter your email'}
                    keyboardType={'email-address'}
                    value={email}
                    onChangeText={setEmail}
                    style={textInputStyle}
                />
                <TextInput
                    placeholder={'Enter your password'}
                    keyboardType={'default'}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    style={textInputStyle}
                />
                <PrimaryButton
                    onPress={performAuth}
                    text={isLogin ? 'Log In' : 'Register'}
                />
                <PrimaryButton
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
    </RootScreenWrapper>;
};

export default LoginScreen;
