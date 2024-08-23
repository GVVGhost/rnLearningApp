import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {BorderWidth, CornerRadius, Elevation, FontSize, Indent,} from '@theme/DimensionValues.ts';
import {useTheme} from '@react-navigation/native';
import {TaskObj} from "@utils/data/TaskTypes.ts";
import RoundedIconButton from "@components/buttons/RoundedIconButton.tsx";

export interface TaskListComponentProps {
    item: TaskObj;
    onPress: () => void;
}

const TaskListComponent: React.FC<TaskListComponentProps> = memo((
        {
            item,
            onPress,
        }
    ) => {
        const {colors} = useTheme();

        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: Indent.L,
                    padding: Indent.M,
                    borderRadius: CornerRadius.XL,
                    borderWidth: BorderWidth.L,
                    borderColor: colors.border,
                }}
            >
                <Text style={{
                    backgroundColor: colors.card,
                    padding: Indent.M,
                    borderRadius: CornerRadius.L,
                    fontSize: FontSize.M,
                    fontWeight: 'bold',
                    color: colors.text,
                    elevation: Elevation.S,
                    textAlign: 'center',
                    minWidth: 34
                }}>{item.place}</Text>
                <View style={{flex: 1}}>
                    <Text style={{fontWeight: 'bold', color: colors.text}}>{item.title}</Text>
                    <Text style={{color: colors.text}}>{item.description}</Text>
                </View>
                <RoundedIconButton iconName={'pencil'} onPress={onPress}/>
            </View>
        );
    },
);

export default TaskListComponent;
