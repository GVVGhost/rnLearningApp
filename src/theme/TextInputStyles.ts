import {Theme} from "@react-navigation/native";
import {StyleProp, TextStyle} from "react-native";
import {BorderWidth, CornerRadius, Elevation, FontSize, Indent} from "@theme/DimensionValues.ts";

export const customTIStyle = (theme: Theme): StyleProp<TextStyle> => ({
        alignItems: 'baseline',
        borderWidth: BorderWidth.L,
        borderRadius: CornerRadius.L,
        elevation: Elevation.S,
        fontSize: FontSize.M,
        fontWeight: '500',
        paddingHorizontal: Indent.XL,
        paddingVertical: Indent.L,
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.primary,
        color: theme.colors.primary,
})

export const taskFormTIStyle = (theme: Theme): StyleProp<TextStyle> => ({
        alignItems: 'baseline',
        borderRadius: CornerRadius.L,
        fontSize: FontSize.S,
        fontWeight: '400',
        padding: Indent.L,
        marginHorizontal: Indent.S,
        backgroundColor: theme.colors.card,
        color: theme.colors.text,
        elevation: Elevation.M,
})
