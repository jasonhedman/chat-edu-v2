import {NextRequest} from "next/server";

import {UserIdParams} from "@/app/api/notebooks/[notebookId]/scores/[userId]/UserIdParams";
import {updateScore} from "@/cosmos/services/scores";

export const POST = async (request: NextRequest, {params}: {params: UserIdParams}) => {
    const {notebookId, userId} = params;
    const {incrementAmount} = await request.json();
    if (!notebookId || !userId || !incrementAmount) {
        return Response.json(false);
    }
    return Response.json(await updateScore(userId, notebookId, incrementAmount));
}