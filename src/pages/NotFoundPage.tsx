import React from 'react';
import {useNavigate} from 'react-router-dom';
import {ArrowLeft, Home, Search} from 'lucide-react';
import {useTranslation} from '../hooks';
import SEO from '../components/common/SEO';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();
    const {language} = useTranslation();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const suggestions = [
        {
            title: language === 'tr' ? 'Ana Sayfa' : 'Home',
            description: language === 'tr' ? 'Ana sayfaya dönün' : 'Return to homepage',
            path: '/',
            icon: Home
        },
        {
            title: language === 'tr' ? 'Ürünler' : 'Products',
            description: language === 'tr' ? 'Tüm ürünleri görün' : 'View all products',
            path: '/urunler',
            icon: Search
        }
    ];

    return (
        <>
            <SEO
                title={language === 'tr' ? 'Sayfa Bulunamadı - 404' : 'Page Not Found - 404'}
                description={language === 'tr' ? 'Aradığınız sayfa bulunamadı.' : 'The page you are looking for was not found.'}
            />

            <div
                className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* 404 Visual */}
                        <div className="mb-12">
                            <div className="text-8xl md:text-9xl font-bold text-blue-200 mb-4">
                                404
                            </div>
                            <div
                                className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                        </div>

                        {/* Error Message */}
                        <div className="mb-12">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                {language === 'tr' ? 'Sayfa Bulunamadı' : 'Page Not Found'}
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                                {language === 'tr'
                                    ? 'Aradığınız sayfa mevcut değil veya taşınmış olabilir. Aşağıdaki seçenekleri deneyebilirsiniz.'
                                    : 'The page you are looking for does not exist or may have been moved. You can try the options below.'}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <button
                                onClick={handleGoHome}
                                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Home className="w-5 h-5"/>
                                <span>{language === 'tr' ? 'Ana Sayfaya Dön' : 'Go to Homepage'}</span>
                            </button>
                            <button
                                onClick={handleGoBack}
                                className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5"/>
                                <span>{language === 'tr' ? 'Geri Dön' : 'Go Back'}</span>
                            </button>
                        </div>

                        {/* Suggestions */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {suggestions.map((suggestion, index) => {
                                const IconComponent = suggestion.icon;
                                return (
                                    <div
                                        key={index}
                                        onClick={() => navigate(suggestion.path)}
                                        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer border hover:border-blue-200"
                                    >
                                        <div
                                            className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <IconComponent className="w-8 h-8 text-blue-600"/>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                            {suggestion.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {suggestion.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Search Suggestion */}
                        <div className="mt-16 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-white">
                            <h2 className="text-2xl font-bold mb-4">
                                {language === 'tr' ? 'Yardıma mı ihtiyacınız var?' : 'Need help?'}
                            </h2>
                            <p className="text-lg opacity-90 mb-6">
                                {language === 'tr'
                                    ? 'Aradığınızı bulamadıysanız, doğrudan bizimle iletişime geçebilirsiniz.'
                                    : 'If you can\'t find what you\'re looking for, you can contact us directly.'}
                            </p>
                            <button
                                onClick={() => navigate('/iletisim')}
                                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                            >
                                {language === 'tr' ? 'İletişime Geç' : 'Contact Us'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;