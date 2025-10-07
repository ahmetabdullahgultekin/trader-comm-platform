import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import type {User} from 'firebase/auth';
import {authService} from '../services/firebaseService';

interface AuthContextType {
    user: User | null;
    isAdmin: boolean;
    loading: boolean;
    error: string | null;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    createAdminUser: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Listen to auth state changes - only once on mount
    useEffect(() => {
        const unsubscribe = authService.onAuthStateChanged(async (user) => {
            setLoading(true);
            if (user) {
                const adminStatus = await authService.isAdmin(user);
                setUser(user);
                setIsAdmin(adminStatus);
            } else {
                setUser(null);
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);
            const user = await authService.signIn(email, password);
            const adminStatus = await authService.isAdmin(user);
            setUser(user);
            setIsAdmin(adminStatus);
        } catch (error: any) {
            setError(error.message || 'Giriş yapılırken hata oluştu');
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const signOut = useCallback(async () => {
        try {
            setLoading(true);
            await authService.signOut();
            setUser(null);
            setIsAdmin(false);
            setError(null);
        } catch (error: any) {
            setError(error.message || 'Çıkış yapılırken hata oluştu');
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const createAdminUser = useCallback(async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);
            await authService.createAdminUser(email, password);
            // Sign in the newly created admin user
            await signIn(email, password);
        } catch (error: any) {
            setError(error.message || 'Admin kullanıcı oluşturulurken hata oluştu');
            throw error;
        } finally {
            setLoading(false);
        }
    }, [signIn]);

    const value: AuthContextType = {
        user,
        isAdmin,
        loading,
        error,
        signIn,
        signOut,
        createAdminUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
