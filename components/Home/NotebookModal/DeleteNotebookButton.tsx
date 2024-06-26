import React from 'react';

import {
    Button,
    Modal,
    ModalBody, ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";

import useDeleteNotebook from "@/hooks/mutators/delete/useDeleteNotebook";

interface Props {
    notebookId: number,
    notebookName: string,
    onDelete: () => void
}

const DeleteNotebookButton: React.FC<Props> = ({ notebookId, notebookName, onDelete }) => {

    const { deleteNotebook } = useDeleteNotebook(notebookId, notebookName);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteNotebook = async () => {
        await deleteNotebook();
        onClose();
        onDelete();
    }

    return (
        <>
            <Button
                colorScheme={'red'}
                variant={'ghost'}
                w={'100%'}
                onClick={onOpen}
            >
                Delete Notebook
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>Delete Notebook</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this notebook? This action cannot be undone.
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme={'red'}
                            onClick={handleDeleteNotebook}
                        >
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeleteNotebookButton;
