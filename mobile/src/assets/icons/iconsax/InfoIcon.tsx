import * as React from "react";

import Svg, { Path } from "react-native-svg";
import { useTheme } from "styled-components";

import { IconProps } from "@src/common/interfaces";
import { IconSize, IconStrokeWidth } from "@src/common/theme";
import { Box } from "@src/components/atoms";
import { withTouchable } from "@src/components/hoc";

export const InfoIcon = withTouchable(
    ({ size = IconSize.normal, strokeWidth = IconStrokeWidth.default, color }: IconProps) => {
        const { pallette } = useTheme();

        return (
            <Box height={size} width={size}>
                <Svg height="100%" width="100%" viewBox="0 0 24 24" fill="none">
                    <Path
                        d="M12 8v5M4 6c-1.25 1.67-2 3.75-2 6 0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2c-1.43 0-2.8.3-4.03.85"
                        stroke={color || pallette.black}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <Path
                        d="M11.994 16h.01"
                        stroke={color || pallette.black}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </Svg>
            </Box>
        );
    }
);