import React, { createContext, useContext, useEffect } from 'react'
import type { UserProps } from '../helper/types';
import { toast } from 'sonner';
import { setupInterceptors } from '../helper/axios';

interface userContextType {
    user: UserProps | null;
    token: string | null;
    role: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
    login: (token: string, user: UserProps) => void;
    logout: () => void;
    isLoggedIn: boolean;
    // refreshUser: (token: string) => Promise<void>;
    loading: boolean;
}

const UserContext = createContext<userContextType | undefined>(undefined);

export default function UserProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = React.useState<UserProps | null>(null);
    const [token, setToken] = React.useState<string | null>(localStorage.getItem("token"));
    const [role, setRole] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        setRole(null);
        toast.success('Logged out successfully');
    }

    const login = (token: string, user: UserProps) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setUser(user);
        setRole(user?.role || null);
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')

        if (storedToken && storedUser) {
            const parseUser = JSON.parse(storedUser) as UserProps;

            setToken(storedToken);
            setUser(parseUser);
            setRole(parseUser?.role || null);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        setupInterceptors(logout);
    }, [])

    const isLoggedIn = Boolean(token);

    return (
        <UserContext.Provider
            value={{
                user,
                token,
                role,
                setToken,
                setUser,
                logout,
                login,
                isLoggedIn,
                loading
            }}
        >
            {children}
        </UserContext.Provider>
    )
};

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context;
}
