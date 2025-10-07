import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Eye, EyeOff, Lock, LogIn, User} from 'lucide-react';
import {motion} from 'framer-motion';
import {useAuth} from '../../contexts/AuthContext';
import {RouteKey} from '../../types/enums';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const {signIn, loading, error} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await signIn(email, password);
            navigate(RouteKey.ADMIN_DASHBOARD);
        } catch (error) {
            // Error is handled by useAuth hook
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.4}}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Logo/Header */}
                    <div className="text-center mb-8">
                        <div
                            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full mb-4">
                            <Lock className="w-8 h-8 text-white"/>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Girişi</h1>
                        <p className="text-gray-600">Sisteme giriş yapmak için bilgilerinizi girin</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                        >
                            <p className="text-sm text-red-700 text-center">{error}</p>
                        </motion.div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                E-posta Adresi
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 pl-11 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    placeholder="admin@fahrieren.com"
                                    required
                                    disabled={loading}
                                />
                                <User className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400"/>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Şifre
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pl-11 pr-11 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    disabled={loading}
                                />
                                <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400"/>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                                    disabled={loading}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5"/>
                                    ) : (
                                        <Eye className="w-5 h-5"/>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 px-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                                    Giriş yapılıyor...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5"/>
                                    Giriş Yap
                                </>
                            )}
                        </button>
                    </form>

                    {/* Back to Home */}
                    <div className="mt-6 text-center">
                        <Link
                            to={RouteKey.HOME}
                            className="text-sm text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-1"
                        >
                            ← Ana Sayfaya Dön
                        </Link>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Hesabınız yok mu?{' '}
                        <span className="text-gray-500">Yönetici ile iletişime geçin.</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
