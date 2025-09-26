import React from 'react';
import {Award, Building, Egg, Globe, Store, Truck, Users} from 'lucide-react';
import {useTranslation} from '../../hooks';
import {DataService} from '../../services/dataService';

interface PartnersPageProps {
    onContact?: () => void;
}

const PartnersPage: React.FC<PartnersPageProps> = ({onContact}) => {
    const {language, t} = useTranslation();
    const dataService = DataService.getInstance();
    const partners = dataService.getPartners();

    const handleGetInTouch = () => {
        if (onContact) {
            onContact();
        } else {
            alert(language === 'tr'
                ? 'İletişim için: 05368536265 numarasını arayabilir veya fahri.eren@gmail.com adresine email gönderebilirsiniz.'
                : 'For contact: You can call 05368536265 or send an email to fahri.eren@gmail.com'
            );
        }
    };

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
                return {
                    gradient: 'from-primary-600 to-primary-700',
                    bg: 'bg-primary-500',
                    text: 'text-primary-600'
                };
            case 'eren-yumurta':
                return {
                    gradient: 'from-accent-600 to-accent-700',
                    bg: 'bg-accent-500',
                    text: 'text-accent-600'
                };
            case 'eren-emlak':
                return {
                    gradient: 'from-secondary-600 to-secondary-700',
                    bg: 'bg-secondary-500',
                    text: 'text-secondary-600'
                };
            case 'eren-lojistik':
                return {
                    gradient: 'from-primary-600 to-accent-600',
                    bg: 'bg-accent-500',
                    text: 'text-accent-600'
                };
            default:
                return {
                    gradient: 'from-gray-600 to-gray-700',
                    bg: 'bg-gray-500',
                    text: 'text-gray-600'
                };
        }
    };

    return (
        <div className="min-h-screen pb-12">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-secondary-700 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('partners.title')}</h1>
                    <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
                        {t('partners.subtitle')}
                    </p>

                    {/* Stats */}
                    <div className="flex justify-center gap-16 mt-12">
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-2">25+</div>
                            <div className="text-primary-100 text-sm">
                                {language === 'tr' ? 'Yıllık Deneyim' : 'Years Experience'}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-2">1000+</div>
                            <div className="text-primary-100 text-sm">
                                {language === 'tr' ? 'Tamamlanan Proje' : 'Completed Projects'}
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
                            const colors = getPartnerColor(partner.id);

                            return (
                                <div
                                    key={partner.id}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2"
                                >
                                    {/* Header */}
                                    <div
                                        className={`bg-gradient-to-r ${colors.gradient} p-8 text-white relative overflow-hidden`}>
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
                                                    <div className={`w-2 h-2 ${colors.bg} rounded-full`}></div>
                                                    <span className="text-gray-700">{service}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Features */}
                                        <div className="grid grid-cols-3 gap-4 mb-6 pt-6 border-t border-gray-100">
                                            <div className="text-center">
                                                <Award className={`w-6 h-6 ${colors.text} mx-auto mb-2`}/>
                                                <div className="text-sm text-gray-600">
                                                    {language === 'tr' ? 'Kaliteli' : 'Quality'}
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <Users className={`w-6 h-6 ${colors.text} mx-auto mb-2`}/>
                                                <div className="text-sm text-gray-600">
                                                    {language === 'tr' ? 'Güvenilir' : 'Reliable'}
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <Globe className={`w-6 h-6 ${colors.text} mx-auto mb-2`}/>
                                                <div className="text-sm text-gray-600">
                                                    {language === 'tr' ? 'Deneyimli' : 'Experienced'}
                                                </div>
                                            </div>
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
                                className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                                className="w-16 h-16 bg-accent-100 text-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                                className="w-16 h-16 bg-secondary-100 text-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
            <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        {language === 'tr' ? 'İş Ortağı Olmak İster misiniz?' : 'Would You Like to Become a Partner?'}
                    </h2>
                    <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                        {language === 'tr'
                            ? 'Kaliteli hizmet anlayışımıza sahip firmalar için iş ortaklığı fırsatları sunuyoruz.'
                            : 'We offer partnership opportunities for companies with our quality service approach.'
                        }
                    </p>
                    <button
                        onClick={handleGetInTouch}
                        className="px-8 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors">
                        {language === 'tr' ? 'İletişime Geçin' : 'Get in Touch'}
                    </button>
                </div>
            </section>
        </div>
    );
};

export default PartnersPage;
