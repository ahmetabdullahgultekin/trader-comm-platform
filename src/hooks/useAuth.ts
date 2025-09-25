import {useCallback, useEffect, useState} from 'react';
import type {User} from 'firebase/auth';
import {authService} from '../services/firebaseService';

interface AuthState {
    user: User | null;
    isAdmin: boolean;
    loading: boolean;
    error: string | null;
}

export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isAdmin: false,
        loading: true,
        error: null
    });

    const signIn = useCallback(async (email: string, password: string) => {
        try {
            setAuthState(prev => ({...prev, loading: true, error: null}));
            const user = await authService.signIn(email, password);
            const isAdmin = await authService.isAdmin(user);

            setAuthState({
                user,
                isAdmin,
                loading: false,
                error: null
            });
        } catch (error: any) {
            setAuthState(prev => ({
                ...prev,
                loading: false,
                error: error.message || 'Giriş yapılırken hata oluştu'
            }));
        }
    }, []);

    const signOut = useCallback(async () => {
        try {
            await authService.signOut();
            setAuthState({
                user: null,
                isAdmin: false,
                loading: false,
                error: null
            });
        } catch (error: any) {
            setAuthState(prev => ({
                ...prev,
                error: error.message || 'Çıkış yapılırken hata oluştu'
            }));
        }
    }, []);

    const createAdminUser = useCallback(async (email: string, password: string) => {
        try {
            setAuthState(prev => ({...prev, loading: true, error: null}));
            await authService.createAdminUser(email, password);

            // Sign in the newly created admin user
            await signIn(email, password);
        } catch (error: any) {
            setAuthState(prev => ({
                ...prev,
                loading: false,
                error: error.message || 'Admin kullanıcı oluşturulurken hata oluştu'
            }));
        }
    }, [signIn]);

    // Listen to auth state changes
    useEffect(() => {
        const unsubscribe = authService.onAuthStateChanged(async (user) => {
            if (user) {
                const isAdmin = await authService.isAdmin(user);
                setAuthState({
                    user,
                    isAdmin,
                    loading: false,
                    error: null
                });
            } else {
                setAuthState({
                    user: null,
                    isAdmin: false,
                    loading: false,
                    error: null
                });
            }
        });

        return () => unsubscribe();
    }, []);

    return {
        user: authState.user,
        isAdmin: authState.isAdmin,
        loading: authState.loading,
        error: authState.error,
        signIn,
        signOut,
        createAdminUser
    };
};