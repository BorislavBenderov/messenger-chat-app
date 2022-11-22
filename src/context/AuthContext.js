import { createContext, useEffect, useState } from "react";
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState([]);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedUser(user);
            } else {
                setLoggedUser(null);
            }
        });

        return (() => {
            unsub();
        });
    }, []);

    return (
        <AuthContext.Provider value={{ auth, loggedUser }}>
            {children}
        </AuthContext.Provider>
    );
}