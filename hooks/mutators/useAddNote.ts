import { useState, useEffect } from 'react';

import * as Yup from "yup";

import {useFormik} from "formik";

import { addNote } from "@/services/notes";

import useAuth from "@/hooks/auth/useAuth";
import {useToast} from "@chakra-ui/react";

import {emitNotesChangedEvent} from "@/eventEmitters/notesEventEmitter";

import {NoteInput} from "@/types/Note";
import {Notebook} from "@/types/Notebook";

const NoteSchema: Yup.ObjectSchema<NoteInput> = Yup.object().shape({
    title: Yup.string()
        .required('Title is Required')
        .min(1, 'Title is Required'),
    content: Yup.string()
        .required('Content is Required')
        .min(1, 'Content is Required'),
    notebookId: Yup.string()
        .required('Notebook ID is Required')
        .min(1, 'Course ID is Required'),
});

const useAddNote = (initNotebook?: Notebook) => {

    const { user } = useAuth();

    const [notebook, setNotebook] = useState<Notebook | null>(initNotebook || null);

    const toast = useToast();

    useEffect(() => {
        setNotebook(initNotebook || null)
    }, [initNotebook])

    const {
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        submitForm,
        resetForm,
    } = useFormik<NoteInput>({
        initialValues: {
            title: '',
            content: '',
            notebookId: notebook?.id || '',
        },
        validationSchema: NoteSchema,
        onSubmit: async note => {
            if(!user) return;
            const success = await addNote(note);
            if(success) {
                emitNotesChangedEvent(note.notebookId);
                toast({
                    title: "Note Added",
                    description: "Your note has been added.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: "Error",
                    description: "There was an error adding your note.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            }
            resetForm();
        },
    });

    useEffect(() => {
        setFieldValue('notebookId', notebook?.id || '');
    }, [setFieldValue, notebook]);

    const updateNotebook = (notebook: Notebook | null) => {
        setNotebook(notebook);
    }

    return {
        notebook,
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        submitForm,
        updateNotebook,
        resetForm,
        disabled: Object.keys(errors).length > 0,
    }
}

export default useAddNote;