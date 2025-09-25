import React, {useState} from 'react';
import {Eye, EyeOff, Lock, User, X} from 'lucide-react';
import {useAuth} from '../../hooks/useAuth';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({isOpen, onClose, onSuccess}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isFirstTimeSetup, setIsFirstTimeSetup] = useState(false);
    const {signIn, createAdminUser, loading, error} = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isFirstTimeSetup) {
                await createAdminUser(email, password);
            } else {
                await signIn(email, password);
            }

            onSuccess();
            onClose();
            setEmail('');
            setPassword('');
        } catch (error) {
            // Error is handled by useAuth hook
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md p-8 mx-4 bg-white rounded-lg shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-5 h-5"/>
                </button>

                <div className="mb-6 text-center">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
                        <Lock className="w-8 h-8 text-red-600"/>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        {isFirstTimeSetup ? 'İlk Admin Oluştur' : 'Admin Girişi'}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {isFirstTimeSetup
                            ? 'Sistem yönetimi için ilk admin hesabınızı oluşturun'
                            : 'Ürün yönetimi için admin olarak giriş yapın'
                        }
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-md">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            E-posta
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="admin@example.com"
                                required
                            />
                            <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400"/>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Şifre
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="••••••••"
                                required
                                minLength={6}
                            />
                            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400"/>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4"/>
                                ) : (
                                    <Eye className="w-4 h-4"/>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Giriş yapılıyor...' :
                            isFirstTimeSetup ? 'Admin Hesabı Oluştur' : 'Giriş Yap'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button
                        type="button"
                        onClick={() => setIsFirstTimeSetup(!isFirstTimeSetup)}
                        className="text-sm text-red-600 hover:text-red-700"
                    >
                        {isFirstTimeSetup
                            ? 'Mevcut hesabınla giriş yap'
                            : 'İlk admin hesabı oluştur'
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};