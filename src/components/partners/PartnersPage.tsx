import React from 'react';
import {Award, Building, Egg, ExternalLink, Globe, Store, Truck, Users} from 'lucide-react';
import {useTranslation} from '../../hooks';
import {DataService} from '../../services/dataService';

const PartnersPage: React.FC = () => {
    const {language, t} = useTranslation();
    const dataService = DataService.getInstance();
    const partners = dataService.getPartners();

    const getPartnerIcon = (id: string) => {
        switch (id) {
            case 'eren-ticaret':
                return Building;
            case 'eren-yumurta':
                return Egg;
            case 'eren-emlak':
                return Store;
            case 'eren-lojistik':
                return Truck;
            default:
                return Building;
        }
    };

    const getPartnerColor = (id: string) => {
        switch (id) {
            case 'eren-ticaret':
                return 'blue';
            case 'eren-yumurta':
                return 'green';
            case 'eren-emlak':
                return 'purple';
            case 'eren-lojistik':
                return 'orange';
            default:
                return 'gray';
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('partners.title')}</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                        {t('partners.subtitle')}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-2">4</div>
                            <div className="text-blue-100 text-sm">
                                {language === 'tr' ? 'Aktif İş Ortağı' : 'Active Partners'}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-2">25+</div>
                            <div className="text-blue-100 text-sm">
                                {language === 'tr' ? 'Yıllık Deneyim' : 'Years Experience'}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-2">1000+</div>
                            <div className="text-blue-100 text-sm">
                                {language === 'tr' ? 'Tamamlanan Proje' : 'Completed Projects'}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-2">50+</div>
                            <div className="text-blue-100 text-sm">
                                {language === 'tr' ? 'Şehir' : 'Cities'}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Grid */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {partners.map((partner) => {
                            const Icon = getPartnerIcon(partner.id);
                            const color = getPartnerColor(partner.id);

                            return (
                                <div
                                    key={partner.id}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2"
                                >
                                    {/* Header */}
                                    <div
                                        className={`bg-gradient-to-r from-${color}-600 to-${color}-700 p-8 text-white relative overflow-hidden`}>
                                        <div className="absolute top-0 right-0 opacity-10 transform rotate-12">
                                            <Icon className="w-32 h-32"/>
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex items-center space-x-4 mb-4">
                                                <div
                                                    className={`w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center`}>
                                                    <Icon className="w-8 h-8"/>
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold">{partner.name}</h3>
                                                    <p className="text-white/80">
                                                        {language === 'tr' ? 'İş Ortağımız' : 'Our Partner'}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-white/90 leading-relaxed">
                                                {partner.description[language]}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8">
                                        <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                            {language === 'tr' ? 'Hizmetler' : 'Services'}
                                        </h4>

                                        <div className="grid grid-cols-1 gap-3 mb-6">
                                            {partner.services[language].map((service, index) => (
                                                <div key={index}
                                                     className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                                    <div className={`w-2 h-2 bg-${color}-500 rounded-full`}></div>
                                                    <span className="text-gray-700">{service}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Features */}
                                        <div className="grid grid-cols-3 gap-4 mb-6 pt-6 border-t border-gray-100">
                                            <div className="text-center">
                                                <Award className={`w-6 h-6 text-${color}-600 mx-auto mb-2`}/>
                                                <div className="text-sm text-gray-600">
                                                    {language === 'tr' ? 'Kaliteli' : 'Quality'}
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <Users className={`w-6 h-6 text-${color}-600 mx-auto mb-2`}/>
                                                <div className="text-sm text-gray-600">
                                                    {language === 'tr' ? 'Güvenilir' : 'Reliable'}
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <Globe className={`w-6 h-6 text-${color}-600 mx-auto mb-2`}/>
                                                <div className="text-sm text-gray-600">
                                                    {language === 'tr' ? 'Deneyimli' : 'Experienced'}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex space-x-3">
                                            {partner.website && (
                                                <a
                                                    href={partner.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`flex-1 px-4 py-3 bg-${color}-600 text-white rounded-xl hover:bg-${color}-700 transition-colors font-medium flex items-center justify-center space-x-2`}
                                                >
                                                    <ExternalLink className="w-4 h-4"/>
                                                    <span>{t('partners.visitWebsite')}</span>
                                                </a>
                                            )}
                                            <button
                                                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-colors font-medium">
                                                {t('partners.learnMore')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Partnership Benefits */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            {language === 'tr' ? 'Ortaklık Avantajları' : 'Partnership Benefits'}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {language === 'tr'
                                ? 'İş ortaklarımızla birlikte sunduğumuz değerler ve avantajlar'
                                : 'Values and benefits we offer together with our business partners'
                            }
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                            <div
                                className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Award className="w-8 h-8"/>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                {language === 'tr' ? 'Kalite Garantisi' : 'Quality Guarantee'}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {language === 'tr'
                                    ? 'Tüm iş ortaklarımız kalite standartlarımıza uygun hizmet sunar'
                                    : 'All our partners provide services in accordance with our quality standards'
                                }
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                            <div
                                className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Users className="w-8 h-8"/>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                {language === 'tr' ? 'Güvenilir İş Birliği' : 'Reliable Cooperation'}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {language === 'tr'
                                    ? 'Uzun süreli ve güvene dayalı iş ortaklıkları kuruyoruz'
                                    : 'We establish long-term and trust-based business partnerships'
                                }
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                            <div
                                className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Globe className="w-8 h-8"/>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                {language === 'tr' ? 'Geniş Hizmet Ağı' : 'Wide Service Network'}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {language === 'tr'
                                    ? 'Çok sektörlü hizmet ağımızla eksiksiz çözümler sunuyoruz'
                                    : 'We offer complete solutions with our multi-sector service network'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        {language === 'tr' ? 'İş Ortağı Olmak İster misiniz?' : 'Would You Like to Become a Partner?'}
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        {language === 'tr'
                            ? 'Kaliteli hizmet anlayışımıza sahip firmalar için iş ortaklığı fırsatları sunuyoruz.'
                            : 'We offer partnership opportunities for companies with our quality service approach.'
                        }
                    </p>
                    <button
                        className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                        {language === 'tr' ? 'İletişime Geçin' : 'Get in Touch'}
                    </button>
                </div>
            </section>
        </div>
    );
};

export default PartnersPage;
