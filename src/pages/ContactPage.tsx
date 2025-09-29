import React from 'react';
import {MessageCircle, Phone} from 'lucide-react';
import {useFahriErenConfig} from '../hooks/useFahriErenConfig';
import {useTranslation} from '../hooks';
import SEO from '../components/common/SEO';

const ContactPage: React.FC = () => {
    const config = useFahriErenConfig();
    const {t, language} = useTranslation();

    const handleCallPhone = () => {
        window.open(config.contact.phoneUri(), '_self');
    };

    const handleWhatsAppClick = () => {
        window.open(config.contact.whatsappUrl(), '_blank');
    };

    const handleEmailClick = () => {
        window.open(`mailto:${config.contact.email()}`, '_self');
    };

    return (
        <>
            <SEO
                title={t('contact.title')}
                description={t('contact.description')}
            />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                {t('contact.title')}
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                {config.business.description[language]}
                            </p>
                        </div>

                        {/* Contact Options */}
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            {/* Phone */}
                            <div
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                                <div
                                    className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Phone className="w-8 h-8 text-blue-600"/>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {t('contact.phone')}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {config.contact.phone()}
                                </p>
                                <button
                                    onClick={handleCallPhone}
                                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    {t('contact.call')}
                                </button>
                            </div>

                            {/* WhatsApp */}
                            <div
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                                <div
                                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <MessageCircle className="w-8 h-8 text-green-600"/>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    WhatsApp
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {t('contact.whatsapp_desc')}
                                </p>
                                <button
                                    onClick={handleWhatsAppClick}
                                    className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    {t('contact.whatsapp')}
                                </button>
                            </div>

                            {/* Email */}
                            <div
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                                <div
                                    className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    E-posta
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {config.contact.email()}
                                </p>
                                <button
                                    onClick={handleEmailClick}
                                    className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    {t('contact.email')}
                                </button>
                            </div>
                        </div>

                        {/* Working Hours */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                {t('contact.working_hours')}
                            </h3>
                            <p className="text-lg text-gray-600 mb-2">
                                {config.config.business.workingDays[language]}
                            </p>
                            <p className="text-lg text-gray-600">
                                {config.config.business.workingHours[language]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactPage;