import React, {useState} from 'react';

import {HStack, Icon, Text,} from "@chakra-ui/react";

import {FaBookBookmark} from "react-icons/fa6";

import {Note as NoteType} from "@/types/Note";
import ChatWithNotesButton from "@/components/Notebook/NotebookMenu/NotesSelect/ChatWithNotesButton";

interface Props {
    note: NoteType,
    onSelect: () => void,
    selected: boolean,
    selectNotes: (note: NoteType[]) => void,
}

const Note: React.FC<Props> = ({ note, onSelect, selected, selectNotes }) => {

    const [isHovering, setIsHovering] = useState(false);

    return (
        <HStack
            w={'100%'}
            justifyContent={'flex-start'}
            onClick={onSelect}
            px={4}
            py={2}
            _hover={{
                bg: 'blackAlpha.50'
            }}
            cursor={'pointer'}
            transition={'background 0.2s ease-in-out'}
            rounded={'md'}
            borderWidth={selected ? 2 : 0}
            borderColor={'brand.500'}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <HStack
                w={'100%'}
                justifyContent={'space-between'}
                spacing={2}
            >
                <HStack
                    spacing={4}
                >
                    <Icon
                        as={FaBookBookmark}
                        height={'20px'}
                    />
                    <Text>
                        {note.name}
                    </Text>
                </HStack>
                {
                    isHovering && (
                        <ChatWithNotesButton
                            onClick={() => selectNotes([note])}
                        />
                    )
                }
            </HStack>
        </HStack>
    );
};

export default Note;
