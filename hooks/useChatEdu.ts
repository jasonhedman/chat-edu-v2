import {useEffect, useState, FormEvent} from "react";

import {Message, nanoid} from "ai";
import {useChat} from "ai/react";

import chunkString from "@/lib/chunkString";
import {multipleChoiceAnswerPrePrompt, multipleChoicePrePrompt, multipleChoicePrompt} from "@/prompts/multipleChoice";
import {textBasedAnswerPrompt, textBasedPrePrompt, textBasedPrompt} from "@/prompts/textBased";
import {answerCheckTag, incorrectTag} from "@/prompts/answerCorrectness";

import {Note} from "@/types/Note";
import {studyGuidePrePrompt, studyGuidePrompt} from "@/prompts/studyGuide";
import {hintPrePrompt, hintPrompt} from "@/prompts/hints";

const MAX_LENGTH = 16385 * 3;

export enum PromptTypes {
    REGULAR,
    MULTIPLE_CHOICE,
    TEXT_BASED,
    STUDY_GUIDE
}

const useOpenAi = (notes: Note[]) => {

    const [promptType, setPromptType] = useState<PromptTypes>(PromptTypes.REGULAR);

    const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);

    const [correctMapping, setCorrectMapping] = useState<{[key: string]: boolean}>({});

    const [messageBottomRef, setMessageBottomRef] = useState<HTMLDivElement | null>(null);

    const onFinish =  (message: Message) => {
        // setLoading(false);
        if(!currentQuestionId && message.content.includes('Question: ')) {
            setCurrentQuestionId(message.id);
        } else if(message.content.includes(answerCheckTag)) {
            setCorrectMapping({
                ...correctMapping,
                [currentQuestionId || ""]: !message.content.includes(incorrectTag)
            })
        }
        scrollToBottom();
    }

    const scrollToBottom = () => {
        if (!messageBottomRef) return;
        messageBottomRef.scroll({
            top: messageBottomRef.scrollHeight,
            behavior: 'auto'
        })
    }

    const {
        messages,
        input,
        setInput,
        handleInputChange,
        handleSubmit,
        setMessages,
        append
    } = useChat({
        api: '/api/chat',
        onFinish,
    });

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    useEffect(() => {

        const content = `
            ${notes.map((note) => `
                ${note.content}
            `)}
        `;

        setMessages([
            {
                id: nanoid(),
                content: `
                    You are to act as a teacher helping a student learn content they have taken notes on. 
                    
                    You can only respond with information that is within the notes include below. If they ask a question that is not in the notes, kindly tell them that you can only answer questions that are in the notes.
                    
                    You can use external information to describe concepts.
                    
                    These are the notes the student has taken so far:
                `,
                role: 'system',
            },
            ...chunkString(content, MAX_LENGTH).map((content): Message => ({
                id: nanoid(),
                content,
                role: 'system',
            }))
        ])

        setCurrentQuestionId(null);
        setCorrectMapping({});
        setPromptType(PromptTypes.REGULAR)
    }, [notes])

    const promptWithContext = async (context: string, prompt: string) => {
        setMessages([
            ...messages,
            {
                id: nanoid(),
                content: context,
                role: 'system',
            }
        ])
        await append({
            id: nanoid(),
            content: prompt,
            role: 'user',
        });
    }

    const askMultipleChoiceQuestion = async () => {
        setPromptType(PromptTypes.MULTIPLE_CHOICE);
        await promptWithContext(multipleChoicePrePrompt, multipleChoicePrompt);
    }

    const answerMultipleChoiceQuestion = async (answer: string) => {
        await promptWithContext(multipleChoiceAnswerPrePrompt, answer)
        setPromptType(PromptTypes.REGULAR);
        setCurrentQuestionId(null);
    }

    const askFreeFormQuestion = async () => {
        setPromptType(PromptTypes.TEXT_BASED);
        await promptWithContext(textBasedPrePrompt, textBasedPrompt);
    }

    const askForHint = async () => {
        await promptWithContext(hintPrePrompt, hintPrompt)
    }

    const answerFreeFormQuestion = async (text: string) => {
        await promptWithContext(textBasedAnswerPrompt, text)
        setPromptType(PromptTypes.REGULAR);
        setCurrentQuestionId(null);
    }

    const generateStudyGuide = async () => {
        await promptWithContext(studyGuidePrePrompt, studyGuidePrompt)
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        if(promptType == PromptTypes.TEXT_BASED) {
            e.preventDefault();
            await answerFreeFormQuestion(input);
            setInput('');
        } else {
            handleSubmit(e)
        }
    }

    return {
        messages: messages.filter((message) => (message.role !== 'system')),
        input,
        promptType,
        correctMapping,
        handleInputChange,
        onSubmit,
        askMultipleChoiceQuestion,
        askFreeFormQuestion,
        generateStudyGuide,
        answerMultipleChoiceQuestion,
        askForHint,
        setMessageBottomRef
    };
}

export default useOpenAi;