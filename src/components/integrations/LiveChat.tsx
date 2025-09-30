import React, {useEffect, useState} from 'react';
import {MessageCircle, X} from 'lucide-react';
import {useFahriErenConfig} from '../../hooks/useFahriErenConfig';

const LiveChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const config = useFahriErenConfig();

    const handleWhatsAppClick = () => {
        const message = encodeURIComponent('Merhaba, web sitenizden ulaşıyorum. Bilgi almak istiyorum.');
        window.open(config.contact.whatsappUrl(message), '_blank');
    };

    // Show after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-24 right-6 z-40">
            <div className="bg-white rounded-lg shadow-2xl p-4 w-80 border border-gray-200 animate-bounce-once">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div
                                className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                <MessageCircle className="w-6 h-6 text-white"/>
                            </div>
                            <div
                                className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"/>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Canlı Destek</h4>
                            <p className="text-xs text-green-600">● Online</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-4 h-4"/>
                    </button>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                    Merhaba! 👋 Size nasıl yardımcı olabiliriz?
                </p>

                <button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63z"/>
                    </svg>
                    WhatsApp ile Konuş
                </button>

                <p className="text-xs text-gray-500 text-center mt-3">
                    Genellikle birkaç dakika içinde yanıt veririz
                </p>
            </div>
        </div>
    );
};

export default LiveChat;