
import {transformUserScorePartial, transformRanked} from "@/hooks/queries/scores/transformers";

import {
    UserScoreRow,
    UserNotebookScoreRow,
    RankedUserNotebookScoreRow,
    UserCreatorScoreRow,
    RankedUserCreatorScoreRow
} from "@/azure/cosmos/types";
import {
    UserScore,
    UserNotebookScore,
    RankedUserNotebookScore,
    UserCreatorScore,
    RankedUserCreatorScore
} from "@/types/score";
import {transformNotebookScore} from "@/hooks/queries/scores/notebooks/transformers";

export const transformUserScore = (row: UserScoreRow): UserScore => ({
    ...transformUserScorePartial(row),
    name: row.name,
    username: row.username,
    profilePictureUrl: row.profile_picture_url,
    verified: row.verified
});

export const transformUserCreatorScore = (row: UserCreatorScoreRow): UserCreatorScore => ({
    ...transformUserScore(row),
    numNotebooks: parseInt(row.num_notebooks)
});

export const transformRankedUserCreator = (row: RankedUserCreatorScoreRow): RankedUserCreatorScore => ({
    ...transformUserCreatorScore(row),
    ...transformRanked(row)
});

export const transformUserNotebookScore = (row: UserNotebookScoreRow): UserNotebookScore => ({
    ...transformUserScore(row),
    ...transformNotebookScore(row)
})

export const transformRankedUserNotebook = (row: RankedUserNotebookScoreRow): RankedUserNotebookScore => ({
    ...transformUserNotebookScore(row),
    ...transformRanked(row)
});

