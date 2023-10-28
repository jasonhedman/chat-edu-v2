import React from 'react';

import {Button, useDisclosure} from "@chakra-ui/react";

import {BiUpload} from "react-icons/bi";

import UploadModal from "@/components/Home/UploadNotes/UploadModal";

const UploadNotes = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                colorScheme={'brand'}
                leftIcon={<BiUpload />}
                onClick={onOpen}
            >
                Upload your Notes
            </Button>
            <UploadModal
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
};

export default UploadNotes;
