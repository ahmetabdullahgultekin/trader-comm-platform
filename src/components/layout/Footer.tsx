import React from 'react';
import {Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter} from 'lucide-react';
import {useTranslation} from '../../hooks';

const Footer: React.FC = () => {
    const {t} = useTranslation();

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <div
                                className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">FE</span>
                            </div>
                            <h3 className="text-xl font-bold">Fahri Eren</h3>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            25 yıllık tecrübe ile güvenilir ticaret ortağınız.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="w-5 h-5"/>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="w-5 h-5"/>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5"/>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin className="w-5 h-5"/>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">{t('nav.home')}</h4>
                        <ul className="space-y-3">
                            <li><a href="#"
                                   className="text-gray-300 hover:text-white transition-colors">{t('nav.products')}</a>
                            </li>
                            <li><a href="#"
                                   className="text-gray-300 hover:text-white transition-colors">{t('nav.about')}</a>
                            </li>
                            <li><a href="#"
                                   className="text-gray-300 hover:text-white transition-colors">{t('nav.partners')}</a>
                            </li>
                            <li><a href="#"
                                   className="text-gray-300 hover:text-white transition-colors">{t('nav.contact')}</a>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">{t('categories.all')}</h4>
                        <ul className="space-y-3">
                            <li><a href="#"
                                   className="text-gray-300 hover:text-white transition-colors">{t('categories.realestate')}</a>
                            </li>
                            <li><a href="#"
                                   className="text-gray-300 hover:text-white transition-colors">{t('categories.vehicles')}</a>
                            </li>
                            <li><a href="#"
                                   className="text-gray-300 hover:text-white transition-colors">{t('categories.construction')}</a>
                            </li>
                            <li><a href="#"
                                   className="text-gray-300 hover:text-white transition-colors">{t('categories.farm')}</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">{t('contact.title')}</h4>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <Phone className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0"/>
                                <div>
                                    <p className="text-gray-300">+90 532 123 45 67</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Mail className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0"/>
                                <div>
                                    <p className="text-gray-300">fahri.eren@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0"/>
                                <div>
                                    <p className="text-gray-300">Muratpaşa, Antalya, Türkiye</p>
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
                            © 2024 Fahri Eren. Tüm hakları saklıdır.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Gizlilik Politikası
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Kullanım Şartları
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
