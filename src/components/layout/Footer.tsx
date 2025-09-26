import React from 'react';
import {Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter} from 'lucide-react';
import {useTranslation} from '../../hooks';

interface FooterProps {
    onPageChange?: (page: string) => void;
    onContact?: () => void;
    onEmail?: () => void;
    onWhatsApp?: () => void;
}

const Footer: React.FC<FooterProps> = ({onPageChange, onContact, onEmail, onWhatsApp}) => {
    const {t} = useTranslation();

    const handlePrivacyPolicy = () => {
        alert('Gizlilik Politikası sayfası yakında eklenecektir. / Privacy Policy page will be added soon.');
    };

    const handleTermsOfService = () => {
        alert('Hizmet Koşulları sayfası yakında eklenecektir. / Terms of Service page will be added soon.');
    };

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <div
                                className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">FE</span>
                            </div>
                            <h3 className="text-xl font-bold">Fahri Eren</h3>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            {t('footer.companyDescription')}
                        </p>

                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">{t('footer.quickLinks')}</h4>
                        <ul className="space-y-3">
                            <li>
                                <button
                                    onClick={() => onPageChange?.('products')}
                                    className="text-gray-300 hover:text-white transition-colors">{t('nav.products')}</button>
                            </li>
                            <li>
                                <button
                                    onClick={() => onPageChange?.('about')}
                                    className="text-gray-300 hover:text-white transition-colors">{t('nav.about')}</button>
                            </li>
                            <li>
                                <button
                                    onClick={() => onPageChange?.('partners')}
                                    className="text-gray-300 hover:text-white transition-colors">{t('nav.partners')}</button>
                            </li>
                            <li>
                                <button
                                    onClick={() => onPageChange?.('contact')}
                                    className="text-gray-300 hover:text-white transition-colors">{t('nav.contact')}</button>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">{t('footer.categories')}</h4>
                        <ul className="space-y-3">
                            <li>
                                <button
                                    onClick={() => onPageChange?.('products')}
                                    className="text-gray-300 hover:text-white transition-colors">{t('categories.realestate')}</button>
                            </li>
                            <li>
                                <button
                                    onClick={() => onPageChange?.('products')}
                                    className="text-gray-300 hover:text-white transition-colors">{t('categories.vehicles')}</button>
                            </li>
                            <li>
                                <button
                                    onClick={() => onPageChange?.('products')}
                                    className="text-gray-300 hover:text-white transition-colors">{t('categories.construction')}</button>
                            </li>
                            <li>
                                <button
                                    onClick={() => onPageChange?.('products')}
                                    className="text-gray-300 hover:text-white transition-colors">{t('categories.farm')}</button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">{t('contact.title')}</h4>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <Phone className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0"/>
                                <div>
                                    <button
                                        onClick={onContact}
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        05368536265
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Mail className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0"/>
                                <div>
                                    <button
                                        onClick={onEmail}
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        fahri.eren@gmail.com
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0"/>
                                <div>
                                    <p className="text-gray-300">Ulukışla, Niğde, Türkiye</p>
                                </div>
                            </div>
                            <div className="pt-4">
                                <p className="text-sm text-gray-400">{t('contact.info.workHours')}</p>
                                <p className="text-sm text-gray-300">{t('contact.info.weekdays')}</p>
                                <p className="text-sm text-gray-300">{t('contact.info.weekend')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            {t('footer.copyright')}
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <button onClick={handlePrivacyPolicy}
                                    className="text-gray-400 hover:text-white text-sm transition-colors">
                                {t('footer.privacyPolicy')}
                            </button>
                            <button onClick={handleTermsOfService}
                                    className="text-gray-400 hover:text-white text-sm transition-colors">
                                {t('footer.termsOfService')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
