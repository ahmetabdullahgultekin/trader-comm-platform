import React, {useState} from 'react';
import {X} from 'lucide-react';
import AdminDashboard from './AdminDashboard';

interface AdminPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({isOpen, onClose}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    if (!isOpen) return null;

    const handleLogin = () => {
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Yanlış şifre!');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword('');
        onClose();
    };

    if (!isAuthenticated) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Admin Panel</h2>
                        <button onClick={onClose}>
                            <X className="w-6 h-6"/>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Şifre
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Şifre: admin123
                            </p>
                        </div>

                        <button
                            onClick={handleLogin}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            Giriş Yap
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-white z-50">
            <AdminDashboard onLogout={handleLogout}/>
        </div>
    );
};