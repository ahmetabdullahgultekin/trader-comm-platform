import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AlertCircle, Lock, LogIn, Mail} from 'lucide-react';
import {useAuth} from '../../hooks/useAuth';
import {RouteKey} from '../../types/enums';
import {motion} from 'framer-motion';

const AdminLoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {signIn} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signIn(email, password);
            navigate(RouteKey.ADMIN_DASHBOARD);
        } catch (err: any) {
            setError(err.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                className="max-w-md w-full"
            >
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div
                            className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Lock className="w-8 h-8 text-white"/>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Girişi</h1>
                        <p className="text-gray-600">Yönetim paneline erişmek için giriş yapın</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{opacity: 0, scale: 0.95}}
                            animate={{opacity: 1, scale: 1}}
                            className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
                        >
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"/>
                            <p className="text-sm text-red-800">{error}</p>
                        </motion.div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                E-posta
                            </label>
                            <div className="relative">
                                <Mail
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="admin@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Şifre
                            </label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5"/>
                                    <span>Giriş Yap</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate(RouteKey.HOME)}
                            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            ← Ana Sayfaya Dön
                        </button>
                    </div>
                </div>

                {/* Security Note */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        🔒 Bu sayfa güvenli SSL bağlantısı ile korunmaktadır
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLoginPage;