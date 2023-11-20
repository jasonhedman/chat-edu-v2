import React from 'react';

import {Card, HStack, Text, VStack} from "@chakra-ui/react";

import MobileSidebar from "@/components/Home/NotesMenu/MobileSidebar";

import {Note} from "@/types/Note";

export const mobileHeaderHeight = 60;

interface Props {
    notes: Note[];
    addNote: (note: Note) => void;
    removeNote: (id: string) => void;
}

const MobileHeader: React.FC<Props> = ({ notes, addNote, removeNote}) => {
    return (
        <Card
            display={{base: 'flex', md: 'none'}}
            h={`${mobileHeaderHeight}px`}
            roundedTop={'none'}
            roundedBottom={'md'}
            justifyContent={'center'}
            py={0}
            px={4}
        >
            <HStack
                w={'100%'}
                justifyContent={'space-between'}
            >
                <VStack
                    alignItems={'flex-start'}
                    spacing={0}
                >
                    <Text
                        fontSize={'sm'}
                        fontWeight={'semibold'}
                    >
                        Notebooks
                    </Text>
                    <Text
                        fontSize={'sm'}
                        opacity={0.7}
                    >
                        {notes.length} notes selected
                    </Text>
                </VStack>
                <MobileSidebar
                    selectedNotes={notes}
                    addNote={addNote}
                    removeNote={removeNote}
                />
            </HStack>
        </Card>
    );
};

export default MobileHeader;