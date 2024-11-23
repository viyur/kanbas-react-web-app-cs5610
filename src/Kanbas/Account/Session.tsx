import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
export default function Session({ children }: { children: any }) {
    const [pending, setPending] = useState(true);
    const dispatch = useDispatch();
    const fetchProfile = async () => {
        try {
            // get the current user recorded at the server side
            const currentUser = await client.profile();
            // update the current user in the redux store
            dispatch(setCurrentUser(currentUser));
        } catch (err: any) {
            console.error(err);
        }
        setPending(false);
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    // if (!pending) {
    //     return children;
    // }
    if (pending) {
        return <div>Loading...</div>; // Or return null if no UI is desired
    }

    return children;

}

