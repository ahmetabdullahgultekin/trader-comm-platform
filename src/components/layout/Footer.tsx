import React from 'react';
import {Link} from 'react-router-dom';
import {Facebook, Instagram, Linkedin, Mail, MapPin, Phone} from 'lucide-react';
import {useTranslation} from '../../hooks';
import {useFahriErenConfig} from '../../hooks/useFahriErenConfig';
import {EmailType, NAVIGATION_ITEMS, PhoneType, SocialPlatform} from '../../types/enums';

const Footer: React.FC = () => {
    const {t} = useTranslation();
    const config = useFahriErenConfig();

    const handlePhoneCall = () => {
        window.open(config.contact.phoneUri(PhoneType.PRIMARY), '_self');
    };

    const handleEmail = () => {
        window.open(`mailto:${config.contact.email(EmailType.PRIMARY)}`, '_self');
    };

    const handleWhatsApp = () => {
        window.open(config.contact.whatsappUrl(), '_blank');
    };

    const handleSocialClick = (platform: keyof typeof SocialPlatform) => {
        const url = config.social.getUrl(SocialPlatform[platform]);
        if (url) {
            window.open(url, '_blank');
        }
    };

    const navItems = NAVIGATION_ITEMS.map(item => ({
        ...item,
        label: t(item.translationKey),
    }));

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <img
                                src="/logo.png"
                                alt={config.personal.fullName}
                                className="w-10 h-10 object-contain"
                            />
                            <h3 className="text-xl font-bold">{config.personal.fullName}</h3>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            {config.business.description()}
                        </p>

                        {/* Social Media Links */}
                        <div className="flex space-x-4">
                            {config.social.linkedin && (
                                <button
                                    onClick={() => handleSocialClick('LINKEDIN')}
                                    className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-4 h-4"/>
                                </button>
                            )}
                            {config.social.instagram && (
                                <button
                                    onClick={() => handleSocialClick('INSTAGRAM')}
                                    className="w-8 h-8 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-4 h-4"/>
                                </button>
                            )}
                            {config.social.facebook && (
                                <button
                                    onClick={() => handleSocialClick('FACEBOOK')}
                                    className="w-8 h-8 bg-gray-800 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="w-4 h-4"/>
                                </button>
                            )}
                            {config.social.youtube && (
                                <button
                                    onClick={() => handleSocialClick('YOUTUBE')}
                                    className="w-8 h-8 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                                    aria-label="YouTube"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">{t('footer.quickLinks')}</h4>
                        <ul className="space-y-3">
                            {navItems.map((item) => (
                                <li key={item.key}>
                                    <Link
                                        to={item.key}
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">{t('footer.services')}</h4>
                        <ul className="space-y-3">
                            {config.serviceAreas().map((service, index) => (
                                <li key={index}>
                                    <span className="text-gray-300">{service}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">{t('contact.title')}</h4>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <Phone className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0"/>
                                <div>
                                    <button
                                        onClick={handlePhoneCall}
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        {config.contact.phone(PhoneType.DISPLAY)}
                                    </button>
                                    <p className="text-sm text-gray-400">{t('contact.callAnytime')}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <Mail className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0"/>
                                <div>
                                    <button
                                        onClick={handleEmail}
                                        className="text-gray-300 hover:text-white transition-colors"
                                    >
                                        {config.contact.email(EmailType.PRIMARY)}
                                    </button>
                                    <p className="text-sm text-gray-400">{t('contact.emailUs')}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0"/>
                                <div>
                                    <p className="text-gray-300">{config.contact.fullAddress()}</p>
                                    <p className="text-sm text-gray-400">{config.contact.workingHours()}</p>
                                </div>
                            </div>

                            {/* WhatsApp Quick Contact */}
                            <div className="pt-4 border-t border-gray-800">
                                <button
                                    onClick={handleWhatsApp}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63z"/>
                                    </svg>
                                    {t('contact.whatsapp')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-gray-400 text-sm">
                                © {new Date().getFullYear()} {config.business.name()}. {t('footer.allRightsReserved')}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                                {config.business.experience} {t('footer.yearsExperience')} • {config.stats.happyCustomers}+ {t('footer.happyCustomers')}
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6 text-sm">
                            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                                {t('footer.privacyPolicy')}
                            </Link>
                            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                                {t('footer.termsOfService')}
                            </Link>
                            <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                                {t('footer.cookiePolicy')}
                            </Link>
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-6 pt-6 border-t border-gray-800">
                        <div className="flex flex-wrap justify-center gap-8 text-xs text-gray-500">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>{t('footer.secureTransactions')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>{t('footer.trustedBy')} {config.stats.happyCustomers}+ {t('footer.customers')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <span>{config.stats.customerSatisfaction}/5 {t('footer.customerRating')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
