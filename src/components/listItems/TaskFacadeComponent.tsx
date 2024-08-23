import React, {memo} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FontSize, IconSize, Indent,} from '@theme/DimensionValues.ts';
import {useTheme} from '@react-navigation/native';
import CardWrapper from "@components/wrappers/CardWrapper.tsx";
import {TaskContainerObj} from "@utils/data/TaskTypes.ts";
import RoundedIconButton from "@components/buttons/RoundedIconButton.tsx";
import moment from "moment";

export interface TaskFacadeComponentProps {
    taskContainer: TaskContainerObj;
    onPress?: () => void;
}

const TaskFacadeComponent: React.FC<TaskFacadeComponentProps> = memo((
        {
            taskContainer,
            onPress = () => {
            }
        }
    ) => {
        const {colors} = useTheme();

        return (
            <CardWrapper style={{flexDirection: 'column'}}>
                <View style={{gap: Indent.L}}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Text style={{fontSize: FontSize.M, color: colors.primary, fontWeight: 'bold'}}>
                            {taskContainer.title}
                        </Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: Indent.M}}>
                            <Icon name={'account'} size={IconSize.S} color={colors.primary}/>
                            <Text style={{fontSize: FontSize.M, color: colors.primary, fontWeight: 'bold'}}>
                                {taskContainer.owner.name}
                            </Text>
                        </View>
                    </View>
                    <Text style={{fontSize: FontSize.S, color: colors.text, fontWeight: '400'}}>
                        {taskContainer.description}
                    </Text>
                    <View style={{gap: Indent.M, marginVertical: Indent.L}}>
                        {taskContainer.tasks.map((task, index) =>
                            <View key={index}>
                                <Text style={{
                                    fontSize: FontSize.S,
                                    color: colors.text,
                                    fontWeight: task.isComplete ? '300' : '600',
                                    textDecorationStyle: task.isComplete ? "dashed" : 'solid'
                                }}>
                                    {task.place}. {task.title} {task.isComplete && "(completed)"}
                                </Text>
                                <Text style={{
                                    paddingStart: Indent.XL,
                                    fontSize: FontSize.S,
                                    color: colors.text,
                                    fontWeight: task.isComplete ? '300' : '400'
                                }}>
                                    {task.description}
                                </Text>
                            </View>
                        )}
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{fontSize: FontSize.S, color: colors.text, fontWeight: '300', textAlign: 'right'}}>
                            Last edit {moment(taskContainer.updatedAt).format('DD/MM/YYYY hh:mm')}
                        </Text>
                        <RoundedIconButton onPress={onPress}/>
                    </View>

                </View>
            </CardWrapper>
        );
    },
);

export default TaskFacadeComponent;
