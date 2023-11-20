import React, { useState, useRef } from 'react';

import {Button, HStack, VStack} from "@chakra-ui/react";

import {MultipleChoiceQuestion as MultipleChoiceQuestionType} from "@/types/prompts/MultipleChoiceQuestion";

import confetti from 'canvas-confetti';
import Markdown from "@/components/Utilities/Markdown";
import {Command} from "@/types/prompts/Command";
import {answerCorrectnessCommand, hintCommand} from "@/prompts";
import useViewportDimensions from "@/hooks/utilities/useViewportDimensions";

interface Props {
    question: MultipleChoiceQuestionType,
    promptWithCommand: (command: Command<any>) => void,
    answered: boolean
}

const MultipleChoiceQuestion: React.FC<Props> = ({ question, promptWithCommand, answered }) => {

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const { height, width } = useViewportDimensions();

    const onClick = (option: string, index: number) => {
        if (selectedIndex == null) {
            setSelectedIndex(index);
            promptWithCommand(answerCorrectnessCommand(question.question, option));
            if (index === question.answerIndex) {
                const buttonRef = buttonRefs.current[index];
                if (buttonRef) {
                    triggerConfettiFromButton(buttonRef);
                }
            }
        }
    };

    const triggerConfettiFromButton = (button: HTMLButtonElement) => {
        const rect = button.getBoundingClientRect(); // get button's position
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        confetti({
            particleCount: 50,
            startVelocity: 25,
            spread: 360,
            gravity: 0.6,
            origin: { x: x / width, y: y / height },
            colors: ["#4caf50"]
        });
    }

    const buttonColorScheme = (index: number) => (
        selectedIndex == index
            ? (index == question.answerIndex ? 'green' : 'red')
            : (answered && index == question.answerIndex ? 'green' : undefined)
    )

    return (
        <HStack
            w={'100%'}
            spacing={4}
        >
            <VStack
                w={'100%'}
                alignItems={'flex-start'}
                flex={1}
            >
                <HStack
                    justifyContent={'space-between'}
                    gap={4}
                >
                    <Markdown>
                        {`***${question.question}***`}
                    </Markdown>
                    <Button
                        variant={'outline'}
                        colorScheme={'brand'}
                        onClick={() => promptWithCommand(hintCommand)}
                        isDisabled={answered}
                        size={{
                            base: 'sm',
                            md: 'md'
                        }}
                    >
                        Hint
                    </Button>
                </HStack>
                <VStack
                    w={'100%'}
                >
                    {
                        question.options.map((option, index) => (
                            <Button
                                ref={(el: HTMLButtonElement | null) => buttonRefs.current[index] = el}
                                variant={'outline'}
                                key={index}
                                maxW={'100%'}
                                w={'100%'}
                                wordBreak={'break-word'}
                                whiteSpace="normal"
                                h={'auto'}
                                py={2}
                                textAlign={'left'}
                                justifyContent={'flex-start'}
                                fontSize={{
                                    base: 'xs',
                                    md: 'md'
                                }}
                                fontWeight={'normal'}
                                colorScheme={buttonColorScheme(index)}
                                onClick={() => onClick(option, index)}
                                isDisabled={answered}
                            >
                                <Markdown>
                                    {option}
                                </Markdown>
                            </Button>
                        ))
                    }
                </VStack>
            </VStack>
        </HStack>
    );
};

export default MultipleChoiceQuestion;