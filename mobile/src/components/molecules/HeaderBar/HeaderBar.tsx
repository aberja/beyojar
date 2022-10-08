import React, { FC, ReactNode } from "react";
import { GestureResponderEvent } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { BackIcon } from "@src/assets/icons";
import { IconSize, Spacing } from "@src/common/theme";
import { Box, FlexBox, Text } from "@src/components/atoms";

interface Props {
    title?: ReactNode | string;
    endIcon?: ReactNode;
    onBackPress?: (event: GestureResponderEvent) => void;
}

export const HeaderBar: FC<Props> = ({ title, endIcon, onBackPress }) => {
    const { pallette } = useTheme();
    const navigation = useNavigation();

    return (
        <FlexBox p={Spacing.medium}>
            <BackIcon
                size={IconSize.large}
                color={pallette.grey}
                touchable={{ onPress: onBackPress || navigation.goBack, width: 40 }}
            />
            <Box flex={1}>{typeof title === "string" ? <Text ml={Spacing.medium}>{title}</Text> : title}</Box>
            <FlexBox width={40} alignItems="center" justifyContent="center" height="100%">
                {endIcon}
            </FlexBox>
        </FlexBox>
    );
};
