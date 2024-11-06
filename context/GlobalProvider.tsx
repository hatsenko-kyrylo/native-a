import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    SetStateAction,
    Dispatch,
} from 'react';
import { Models } from 'react-native-appwrite';

import { getCurrentUser } from '@/lib/appwrite';

interface GlobalContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    user: Models.Document | null;
    setUser: Dispatch<SetStateAction<Models.Document | null>>;
    isLoading: boolean;
}

const GlobalContext = createContext<GlobalContextType | null>(null);

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === null) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};

interface GlobalProviderProps {
    children: ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<Models.Document | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if (res) {
                    setIsLoggedIn(true);
                    setUser(res);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
