import React, {useState} from 'react';
import {ChevronDown, ChevronRight, LogOut, Settings, Shield} from 'lucide-react';
import {useAuth} from '../../hooks/useAuth';
import {AuthModal} from './AuthModal';
import {ProductManager} from './ProductManager';

interface AdminPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({isOpen, onClose}) => {
    const {user, isAdmin, signOut} = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleAuthSuccess = () => {
        setShowAuthModal(false);
    };

    const handleSignOut = async () => {
        await signOut();
        onClose();
    };

    if (!isOpen) return null;

    // Show auth modal if user is not authenticated or not admin
    if (!user || !isAdmin) {
        return (
            <>
                <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={onClose}/>
                <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 p-6">
                    <div className="text-center">
                        <Shield className="w-16 h-16 mx-auto mb-4 text-red-600"/>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Admin Erişimi</h2>
                        <p className="text-gray-600 mb-6">Bu alana erişmek için admin yetkilendirmesi gereklidir.</p>
                        <button
                            onClick={() => setShowAuthModal(true)}
                            className="w-full py-3 px-4 bg-red-600 text-white font-medium rounded-md hover:bg-red-700"
                        >
                            Admin Girişi Yap
                        </button>
                    </div>
                </div>

                <AuthModal
                    isOpen={showAuthModal}
                    onClose={() => setShowAuthModal(false)}
                    onSuccess={handleAuthSuccess}
                />
            </>
        );
    }

    return (
        <>
            <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={onClose}/>
            <div className={`fixed top-0 right-0 h-full bg-white shadow-xl z-50 transition-all duration-300 ${
                isCollapsed ? 'w-16' : 'w-96'
            }`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b bg-red-600 text-white">
                    <div className="flex items-center space-x-3">
                        {!isCollapsed && (
                            <>
                                <Settings className="w-6 h-6"/>
                                <h2 className="text-lg font-bold">Admin Panel</h2>
                            </>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="p-1 rounded hover:bg-red-700"
                        >
                            {isCollapsed ? <ChevronRight className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                        </button>
                        <button
                            onClick={onClose}
                            className="p-1 rounded hover:bg-red-700 text-xl leading-none"
                        >
                            ×
                        </button>
                    </div>
                </div>

                {!isCollapsed && (
                    <>
                        {/* User Info */}
                        <div className="p-4 border-b bg-gray-50">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-medium">
                                        {user.email?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {user.email}
                                    </p>
                                    <p className="text-xs text-red-600">Admin</p>
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="p-1 text-gray-400 hover:text-gray-600"
                                    title="Çıkış Yap"
                                >
                                    <LogOut className="w-4 h-4"/>
                                </button>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="flex border-b">
                            <button
                                onClick={() => setActiveTab('products')}
                                className={`flex-1 py-3 px-4 text-sm font-medium ${
                                    activeTab === 'products'
                                        ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Ürünler
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`flex-1 py-3 px-4 text-sm font-medium ${
                                    activeTab === 'settings'
                                        ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Ayarlar
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            {activeTab === 'products' && <ProductManager/>}
                            {activeTab === 'settings' && (
                                <div className="p-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Sistem Ayarları</h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-medium text-gray-900">Firebase Bağlantısı</h4>
                                            <p className="text-sm text-green-600 mt-1">✓ Bağlı</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-medium text-gray-900">Admin Kullanıcı</h4>
                                            <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};