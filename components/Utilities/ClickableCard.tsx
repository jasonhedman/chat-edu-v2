import React from 'react';

import {Card, useColorModeValue} from "@chakra-ui/react";

import { CardProps } from "@chakra-ui/card";

interface Props extends CardProps {
    onClick: () => void,
    children: React.ReactNode,
    darkModeHoverBackground?: string,
    lightModeHoverBackground?: string
}

const ClickableCard: React.FC<Props> = ({ onClick, children, darkModeHoverBackground = 'whiteAlpha.50', lightModeHoverBackground = 'whiteAlpha.400', ...props }) => {

    const hoverBackground = useColorModeValue(lightModeHoverBackground, darkModeHoverBackground);

    return (
        <Card
            cursor={'pointer'}
            _hover={{
                bg: hoverBackground
            }}
            onClick={onClick}
            transition={'all 0.2s ease-in-out'}
            {...props}
        >
            {children}
        </Card>
    );
};

export default ClickableCard;
