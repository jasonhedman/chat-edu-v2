import React from 'react';

import {VStack} from "@chakra-ui/react";

import NotebookGrid from "@/components/NotebookGrids/NotebookGrid";
import Points from "@/components/Utilities/Points";

import useTopNotebooks from "@/hooks/queries/scores/notebooks/useTopNotebooks";

import {RankedNotebookScore} from "@/types/score";

interface Props {
    onClick: (notebook: RankedNotebookScore) => void
}

const PopularNotebooks: React.FC<Props> = ({ onClick }) => {

    const { notebooks, loading } = useTopNotebooks(6);

    return (
        <NotebookGrid
            heading={'Popular Notebooks'}
            notebooks={notebooks}
            loading={loading}
            onClick={onClick}
            rightComponent={(notebook) => (
                <VStack
                    justifyContent={'end'}
                    align={'end'}
                    h={'100%'}
                >
                    <Points
                        points={notebook.score}
                    />
                </VStack>
            )}
        />
    );
};

export default PopularNotebooks;
