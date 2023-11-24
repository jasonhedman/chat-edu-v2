import {useCallback, useEffect} from "react";

import useItemData from "@/hooks/queries/useItemData";

import {subscribeToUsersChangedEvent, unsubscribeFromUsersChangedEvent} from "@/eventEmitters/userEventEmitter";

import {User} from "@/types/User";


const useUser = (userId: string) => {

    const [userData, loading, error, fetchUserData] = useItemData<User>(
        userId === undefined ? "" : `/api/users/${userId}`);

    const handleUserChanged = useCallback(async (changedUserId: string) => {
        if(changedUserId === userId) {
            await fetchUserData();
        }
    }, [fetchUserData, userId])

    useEffect(() => {
        subscribeToUsersChangedEvent(handleUserChanged);
        return () => {
            unsubscribeFromUsersChangedEvent(handleUserChanged)
        };
    }, [handleUserChanged]);

    return {
        userData,
        loading,
        error,
        fetchUserData
    }
}

export default useUser;