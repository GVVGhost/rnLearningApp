import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootScreenWrapper from '@components/wrappers/RootScreenWrapper.tsx';
import {SectionList, Text, View} from 'react-native';
import {SettingsStackParamList} from '@navigation/stacks/SettingsStack.tsx';
import {deleteMultiple, readOne, SK} from '@utils/storage/mmkvStorage.ts';
import {useAuth} from '@contexts/AuthContext.tsx';
import PressableListComponent, {PressableListComponentProps,} from '@components/listItems/PressableListComponent.tsx';
import {logOutDialog} from '@utils/notifications/Dialog.ts';
import VersionInfo from 'react-native-version-info';
import {BorderWidth, FontSize, Indent} from "@theme/DimensionValues.ts";
import {useTheme} from "@react-navigation/native";
import {ALERT_TYPE, IConfigToast, Toast} from "react-native-alert-notification";

type Props = NativeStackScreenProps<SettingsStackParamList, 'SettingsScreen'>;

type SectionListProps = {
    title: string;
    data: PressableListComponentProps[]
}

const SettingsScreen: React.FC<Props> = ({}) => {
    const {colors} = useTheme();
    const {setIsLogged} = useAuth();
    const [list, setList] = useState<SectionListProps[]>([]);

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showToast = (args: IConfigToast): void => Toast.show(args);

    const init = () => {
        const id = readOne(SK.id);
        const email = readOne(SK.email);
        const name = readOne(SK.name);
        setList([
            {
                title: "Info",
                data: [
                    {label: `User: ${name}`, leftIconName: 'account'},
                    {label: `User email: ${email}`, leftIconName: 'account'},
                    {label: `User id: ${id}`, leftIconName: 'account'},
                    {label: 'Package name: ' + VersionInfo.bundleIdentifier, leftIconName: 'widgets-outline'},
                    {label: 'Version name: ' + VersionInfo.appVersion, leftIconName: 'information-outline'},
                    {label: 'Version code: ' + VersionInfo.buildVersion, leftIconName: 'information-outline'}
                ]
            },
            {
                title: "Actions",
                data: [
                    {
                        label: 'Show WARNING Toast', leftIconName: 'information-outline',
                        handler: {
                            onPress: () => showToast({
                                type: ALERT_TYPE.WARNING,
                                title: 'This is a WARNING Toast'
                            }),
                            iconName: "chevron-right"
                        }
                    },
                    {
                        label: 'Show SUCCESS Toast',
                        leftIconName: 'information-outline',
                        handler: {
                            onPress: () => showToast({
                                type: ALERT_TYPE.SUCCESS,
                                title: 'This is a SUCCESS Toast',
                            }),
                            iconName: "chevron-right"
                        },
                    },
                    {
                        label: 'Show INFO Toast',
                        leftIconName: 'information-outline',
                        handler: {
                            onPress: () => showToast({
                                type: ALERT_TYPE.INFO,
                                title: 'This is a INFO Toast',
                            }),
                            iconName: "chevron-right"
                        },
                    },
                    {
                        label: 'Show DANGER Toast',
                        leftIconName: 'information-outline',
                        handler: {
                            onPress: () => showToast({
                                type: ALERT_TYPE.DANGER,
                                title: 'This is a warning Toast',
                            }),
                            iconName: "chevron-right"
                        },
                    },
                    {
                        label: 'Log out',
                        leftIconName: 'account-arrow-right',
                        handler: {onPress: handleLogout, iconName: 'logout'},
                    },
                ]
            }
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
            <SectionList
                sections={list}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <PressableListComponent
                        label={item.label}
                        handler={item.handler}
                        leftIconName={item.leftIconName}
                    />
                )}
                contentContainerStyle={{gap: Indent.M, padding: Indent.M}}
                renderSectionHeader={({section: {title}}) => (
                    <View style={{
                        marginHorizontal: Indent.L,
                        borderBottomWidth: BorderWidth.S,
                        borderBottomColor: colors.border
                    }}>
                        <Text style={{fontSize: FontSize.M, fontWeight: 'bold', color: colors.text}}>{title}</Text>
                    </View>
                )}
            />
        </RootScreenWrapper>
    );
};

export default SettingsScreen;
