import { createContext, useContext, useState } from 'react';
import users from './UserList.jsx';

const AuthGetUserContext = createContext(null);
export function GetUser() {
    return useContext(AuthGetUserContext);
}

const AuthUpdateUserContext = createContext(null);
export function UpdateUser() {
    return useContext(AuthUpdateUserContext);
}

export function RenderAuthProvider({ children }) {
    const [user, setUser] = useState(null);

    function authenticateUser(username, password) {
        if (username === null && password === null) {
            setUser(null);
            return null;
        }

        const user = users.find((userObj) => userObj.username.toLowerCase() === username.toLowerCase() && userObj.password === password);

        // Debug
        //console.log("Found User.", user);

        setUser(user);
    }

    return (
        <AuthGetUserContext.Provider value={user}>
            <AuthUpdateUserContext.Provider value={(username, password) => authenticateUser(username, password)}>
                {children}
            </AuthUpdateUserContext.Provider>
        </AuthGetUserContext.Provider>
    );
}