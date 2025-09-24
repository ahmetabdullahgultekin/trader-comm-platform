import React, {useEffect, useState} from 'react';
import {Globe, Mail, Menu, Phone, X} from 'lucide-react';
import {useTranslation} from '../../hooks';

interface HeaderProps {
    currentPage: string;
    onPageChange: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({currentPage, onPageChange}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const {language, changeLanguage, t} = useTranslation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        {key: 'home', label: t('nav.home')},
        {key: 'products', label: t('nav.products')},
        {key: 'about', label: t('nav.about')},
        {key: 'partners', label: t('nav.partners')},
        {key: 'contact', label: t('nav.contact')}
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm'
        }`}>
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div
                        className="flex items-center space-x-3 cursor-pointer"
                        onClick={() => onPageChange('home')}
                    >
                        <div
                            className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-xl">FE</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Fahri Eren</h1>
                            <p className="text-sm text-gray-600">{t('hero.subtitle')}</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.key}
                                onClick={() => onPageChange(item.key)}
                                className={`text-lg font-medium transition-colors ${
                                    currentPage === item.key
                                        ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                                        : 'text-gray-700 hover:text-blue-600'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Contact Info & Language Switcher */}
                    <div className="hidden lg:flex items-center space-x-6">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                                <Phone className="w-4 h-4"/>
                                <span>+90 532 123 45 67</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Mail className="w-4 h-4"/>
                                <span>fahri.eren@gmail.com</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Globe className="w-4 h-4 text-gray-600"/>
                            <button
                                onClick={() => changeLanguage(language === 'tr' ? 'en' : 'tr')}
                                className="px-3 py-1 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                {language === 'tr' ? 'EN' : 'TR'}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
                    >
                        {isMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
                        <nav className="container mx-auto px-6 py-4">
                            <div className="flex flex-col space-y-4">
                                {navItems.map((item) => (
                                    <button
                                        key={item.key}
                                        onClick={() => {
                                            onPageChange(item.key);
                                            setIsMenuOpen(false);
                                        }}
                                        className={`text-left text-lg font-medium transition-colors ${
                                            currentPage === item.key
                                                ? 'text-blue-600'
                                                : 'text-gray-700 hover:text-blue-600'
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}

                                <div className="pt-4 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Language</span>
                                        <button
                                            onClick={() => changeLanguage(language === 'tr' ? 'en' : 'tr')}
                                            className="px-3 py-1 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                        >
                                            {language === 'tr' ? 'EN' : 'TR'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
