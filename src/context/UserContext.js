import { createContext, useEffect, useState } from "react";
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore';
import { database } from "../firebaseConfig";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [clickedUser, setClickedUser] = useState(null);

    useEffect(() => {
        const q = query(collection(database, 'users'), orderBy("displayName"));
        onSnapshot(q, (snapshot) => {
            setUsers(snapshot.docs.map((item) => {
                return { ...item.data() };
            }))
        });
    }, []);

    return (
        <UserContext.Provider value={{ users, clickedUser, setClickedUser }}>
            {children}
        </UserContext.Provider>
    );
}