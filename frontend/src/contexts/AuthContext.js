import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();  

export const AuthProvider = ({ children }) => {  
    const [userRole, setUserRole] = useState(null);
    const [userInstrument, setUserInstrument] = useState(null);

    return (
        <AuthContext.Provider value={{
            userRole,
            userInstrument,
            setUserRole,
            setUserInstrument
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);