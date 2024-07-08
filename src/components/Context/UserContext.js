import React, { createContext, useState } from 'react'

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [loggedInUser,setLoggedInUser] = useState({
        name: 'Abul',
        email: 'abu@gmail.com',
        isSignedIn: false,
    });
    
    return (
        <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
            {children}
        </UserContext.Provider>
    );
};