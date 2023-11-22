import React from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, Flex,
} from '@chakra-ui/react'

import TextareaInput from "@/components/Utilities/TextareaInput";
import TextInput from "@/components/Utilities/TextInput";
import NotebookMenu from "@/components/Utilities/NotebookMenu";

import useAddNote from "@/hooks/mutators/useAddNote";

import { Notebook } from "@/types/Notebook";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    initNotebook?: Notebook
}

const AddModal: React.FC<Props> = ({ isOpen, onClose , initNotebook}) => {

    const { values, setFieldValue, touched, setFieldTouched, disabled, submitForm, updateNotebook, errors, notebook } = useAddNote(initNotebook);

    const onSubmit = async () => {
        await submitForm();
        onClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={'xl'}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Upload Notes</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex
                        direction={'column'}
                        gap={4}
                    >
                        <NotebookMenu
                            label={"Notebook"}
                            notebook={notebook}
                            setNotebook={updateNotebook}
                            onBlur={() => setFieldTouched('notebookId', true)}
                            error={touched.notebookId && errors.notebookId || undefined}
                        />
                        <TextInput
                            label={"Title"}
                            placeholder={"Enter your title here..."}
                            value={values.title}
                            onChange={(title) => setFieldValue('title', title)}
                            onBlur={() => setFieldTouched('title', true)}
                            error={touched.title && errors.title || undefined}
                            helperText={"Ex: Lecture 1"}
                        />
                        <TextareaInput
                            label={"Notes"}
                            placeholder={"Enter your notes here..."}
                            value={values.content}
                            onChange={(content) => setFieldValue('content', content)}
                            onBlur={() => setFieldTouched('content', true)}
                            error={touched.content && errors.content || undefined}
                            helperText={"Ex: A programming language is a system of notation for writing computer programs. A programming language is usually described in terms of its syntax and semantics."}
                        />
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme={'brand'}
                        onClick={onSubmit}
                        isDisabled={disabled}
                    >
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddModal;