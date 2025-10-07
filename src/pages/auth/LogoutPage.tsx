import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {CheckCircle, LogOut} from 'lucide-react';
import {motion} from 'framer-motion';
import {useAuth} from '../../contexts/AuthContext';
import {RouteKey} from '../../types/enums';

const LogoutPage: React.FC = () => {
    const {signOut, user} = useAuth();
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(true);

    useEffect(() => {
        const performLogout = async () => {
            // If user is not logged in, redirect immediately
            if (!user) {
                navigate(RouteKey.HOME);
                return;
            }

            // Wait a moment for visual feedback
            await new Promise(resolve => setTimeout(resolve, 800));

            try {
                await signOut();
                setIsLoggingOut(false);

                // Redirect after showing success message
                setTimeout(() => {
                    navigate(RouteKey.HOME);
                }, 1500);
            } catch (error) {
                console.error('Logout error:', error);
                // Redirect anyway even if there's an error
                setTimeout(() => {
                    navigate(RouteKey.HOME);
                }, 1500);
            }
        };

        performLogout();
    }, [signOut, navigate, user]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <motion.div
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.3}}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                    {isLoggingOut ? (
                        <>
                            {/* Logging Out State */}
                            <motion.div
                                initial={{scale: 0}}
                                animate={{scale: 1, rotate: 360}}
                                transition={{duration: 0.5}}
                                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-6"
                            >
                                <LogOut className="w-10 h-10 text-white"/>
                            </motion.div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Çıkış Yapılıyor...</h1>
                            <p className="text-gray-600 mb-6">Lütfen bekleyin</p>
                            <div className="flex justify-center">
                                <div
                                    className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"/>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Success State */}
                            <motion.div
                                initial={{scale: 0}}
                                animate={{scale: 1}}
                                transition={{type: 'spring', stiffness: 200, damping: 15}}
                                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6"
                            >
                                <CheckCircle className="w-10 h-10 text-white"/>
                            </motion.div>
                            <motion.div
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.2}}
                            >
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">Başarıyla Çıkış Yapıldı</h1>
                                <p className="text-gray-600">Ana sayfaya yönlendiriliyorsunuz...</p>
                            </motion.div>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default LogoutPage;
