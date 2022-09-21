import React, { MutableRefObject, PropsWithChildren } from "react";
import { TextInput as TextInputNative, TextInputProps } from "react-native";
import fonts from "@src/assets/fonts";
import { fontSize, spacing } from "@src/utils/theme";
import styled from "styled-components/native";
import {
    borders,
    BordersProps,
    color,
    ColorProps,
    flexbox,
    FlexboxProps,
    layout,
    LayoutProps,
    space,
    SpaceProps,
    typography,
    TypographyProps,
} from "styled-system";

type Props = TextInputProps &
    ColorProps &
    SpaceProps &
    LayoutProps &
    FlexboxProps &
    BordersProps &
    TypographyProps & {
        inputRef?: MutableRefObject<TextInputNative | undefined>;
    };

const StyledTextInput = styled.TextInput<Props>`
    text-decoration: none;
    ${color}
    ${space}
    ${layout}
    ${flexbox}
    ${borders}
    ${typography}
`;

export const TextInput: React.FC<PropsWithChildren<Props>> = ({
    inputRef,
    padding = spacing.tiny,
    fontFamily = fonts.regular,
    ...props
}) => {
    return (
        <StyledTextInput
            ref={inputRef}
            underlineColorAndroid="transparent"
            fontSize={fontSize.medium}
            fontFamily={fontFamily}
            padding={padding}
            {...props}
        />
    );
};
