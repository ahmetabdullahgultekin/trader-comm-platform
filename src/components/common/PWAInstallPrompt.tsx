import React, {useEffect, useState} from 'react';
import {X, Download} from 'lucide-react';
import {useTranslation} from '../../hooks';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {
        // Check if already dismissed
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        if (dismissed === 'true') {
            return;
        }

        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            return;
        }

        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            const installEvent = e as BeforeInstallPromptEvent;
            setDeferredPrompt(installEvent);
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            return;
        }

        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;

        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }

        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    const handleDismiss = () => {
        localStorage.setItem('pwa-install-dismissed', 'true');
        setShowPrompt(false);
    };

    if (!showPrompt || !deferredPrompt) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
            <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <Download className="w-5 h-5 text-blue-600"/>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">
                                {t('pwa.installTitle')}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {t('pwa.installDesc')}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleDismiss}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5"/>
                    </button>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={handleInstallClick}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                        {t('pwa.install')}
                    </button>
                    <button
                        onClick={handleDismiss}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                    >
                        {t('pwa.later')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PWAInstallPrompt;
