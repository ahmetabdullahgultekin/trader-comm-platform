import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Clock, Mail, MapPin, Menu, Phone, X} from 'lucide-react';
import {useTranslation} from '../../hooks';
import {useFahriErenConfig} from '../../hooks/useFahriErenConfig';
import {AnimatePresence, motion} from 'framer-motion';
import type {LanguageValue, RouteKeyValue} from '../../types/enums';
import {EmailType, Language, NAVIGATION_ITEMS, PhoneType, RouteKey} from '../../types/enums';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const {language, changeLanguage, t} = useTranslation();
    const location = useLocation();
    const config = useFahriErenConfig();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const navItems = NAVIGATION_ITEMS.map(item => ({
        ...item,
        label: t(item.translationKey),
        path: item.key
    }));

    const isActiveRoute = (path: RouteKeyValue) => {
        if (path === RouteKey.HOME) return location.pathname === RouteKey.HOME;
        return location.pathname.startsWith(path);
    };

    const handlePhoneCall = () => {
        window.open(config.contact.phoneUri(PhoneType.PRIMARY), '_self');
    };

    const handleWhatsApp = () => {
        window.open(config.contact.whatsappUrl(), '_blank');
    };

    const currentLanguage = language as LanguageValue;

    return (
        <>
            {/* Top bar with contact info - Professional Turkish style */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2 text-sm">
                <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4"/>
                            <span>{config.contact.phone(PhoneType.DISPLAY)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4"/>
                            <span>{config.contact.email(EmailType.PRIMARY)}</span>
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                            <MapPin className="w-4 h-4"/>
                            <span>{config.contact.fullAddress()}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4"/>
                        <span>{config.business.title()}: {config.contact.workingHours()}</span>
                    </div>
                </div>
            </div>

            {/* Main header */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled ? 'bg-white shadow-xl border-b' : 'bg-white/95 backdrop-blur-md'
            } ${isMenuOpen ? 'bg-white' : ''}`} style={{top: scrolled ? '0' : '40px'}}>
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to={RouteKey.HOME}
                              className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                            <div className="relative">
                                <img
                                    src="/logo.png"
                                    alt={config.personal.fullName}
                                    className="w-12 h-12 object-contain"
                                />
                                <div
                                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">{config.personal.fullName}</h1>
                                <p className="text-sm text-gray-600 hidden sm:block">{config.business.title()}</p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.key}
                                    to={item.path}
                                    className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                        isActiveRoute(item.path as RouteKeyValue)
                                            ? 'text-blue-600 bg-blue-50'
                                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {item.label}
                                    {isActiveRoute(item.path as RouteKeyValue) && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                                        />
                                    )}
                                </Link>
                            ))}
                        </nav>

                        {/* Action buttons */}
                        <div className="hidden lg:flex items-center space-x-3">
                            {/* Language switcher */}
                            <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => changeLanguage(Language.TR)}
                                    className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                                        currentLanguage === Language.TR ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                                    }`}
                                >
                                    {Language.TR.toUpperCase()}
                                </button>
                                <button
                                    onClick={() => changeLanguage(Language.EN)}
                                    className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                                        currentLanguage === Language.EN ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                                    }`}
                                >
                                    {Language.EN.toUpperCase()}
                                </button>
                            </div>

                            {/* Contact buttons */}
                            <button
                                onClick={handlePhoneCall}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                            >
                                <Phone className="w-4 h-4"/>
                                <span className="hidden xl:inline">{t('contact.call')}</span>
                            </button>

                            <button
                                onClick={handleWhatsApp}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63z"/>
                                </svg>
                                <span className="hidden xl:inline">WhatsApp</span>
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Menü"
                        >
                            {isMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{opacity: 0, height: 0}}
                                animate={{opacity: 1, height: 'auto'}}
                                exit={{opacity: 0, height: 0}}
                                className="lg:hidden border-t bg-white"
                            >
                                <nav className="py-4 space-y-2">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.key}
                                            to={item.path}
                                            className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                                                isActiveRoute(item.path as RouteKeyValue)
                                                    ? 'text-blue-600 bg-blue-50'
                                                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}

                                    {/* Mobile contact buttons */}
                                    <div className="pt-4 space-y-3 border-t">
                                        <button
                                            onClick={handlePhoneCall}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Phone className="w-4 h-4"/>
                                            {t('contact.callNow')}
                                        </button>
                                        <button
                                            onClick={handleWhatsApp}
                                            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63z"/>
                                            </svg>
                                            WhatsApp
                                        </button>

                                        {/* Language switcher for mobile */}
                                        <div className="flex items-center justify-center gap-2 pt-2">
                                            <button
                                                onClick={() => changeLanguage(Language.TR)}
                                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                    currentLanguage === Language.TR ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                                                }`}
                                            >
                                                Türkçe
                                            </button>
                                            <button
                                                onClick={() => changeLanguage(Language.EN)}
                                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                    currentLanguage === Language.EN ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                                                }`}
                                            >
                                                English
                                            </button>
                                        </div>
                                    </div>
                                </nav>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </header>
        </>
    );
};

export default Header;
