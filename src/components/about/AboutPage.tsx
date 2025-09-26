import React from 'react';
import {
    Building2,
    Calendar,
    Car,
    CheckCircle,
    Egg,
    Home,
    Star,
    Users
} from 'lucide-react';
import {useTranslation} from '../../hooks';
import {DataService} from '../../services/dataService';

interface AboutPageProps {
    onNavigateToContact: () => void;
    onContact?: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({onNavigateToContact, onContact}) => {
    const {language, t} = useTranslation();
    const dataService = DataService.getInstance();
    const personalInfo = dataService.getPersonalInfo();


    const stats = [
        {icon: Calendar, value: '25+', label: t('about.stats.years'), color: 'primary'},
        {icon: Users, value: '5000+', label: t('about.stats.customers'), color: 'accent'},
        {icon: CheckCircle, value: '500+', label: t('about.stats.products'), color: 'secondary'},
        {icon: Star, value: '4.9', label: t('about.stats.rating'), color: 'yellow'}
    ];

    const services = [
        {
            icon: Home,
            title: t('categories.realestate'),
            description: language === 'tr'
                ? 'Emlak alım-satım ve kiralama hizmetleri'
                : 'Real estate sales and rental services',
            color: 'primary'
        },
        {
            icon: Car,
            title: t('categories.vehicles'),
            description: language === 'tr'
                ? 'Araç alım-satım ve ekspertiz hizmetleri'
                : 'Vehicle sales and expertise services',
            color: 'accent'
        },
        {
            icon: Building2,
            title: t('categories.construction'),
            description: language === 'tr'
                ? 'İnşaat malzemeleri ticareti'
                : 'Construction materials trading',
            color: 'secondary'
        },
        {
            icon: Egg,
            title: t('categories.farm'),
            description: language === 'tr'
                ? 'Organik tarım ürünleri üretimi'
                : 'Organic agricultural products production',
            color: 'accent'
        }
    ];

    const achievements = [
        {year: '1998', title: language === 'tr' ? 'Ticaret Hayatına Başlangıç' : 'Start of Business Life'},
        {year: '2003', title: language === 'tr' ? 'İlk Şirket Kuruluşu' : 'First Company Establishment'},
        {year: '2010', title: language === 'tr' ? 'Emlak Sektörüne Giriş' : 'Entry into Real Estate Sector'},
        {
            year: '2015',
            title: language === 'tr' ? 'Tarım Ürünleri Üretimine Başlama' : 'Start of Agricultural Production'
        },
        {year: '2020', title: language === 'tr' ? 'Dijital Platforma Geçiş' : 'Transition to Digital Platform'},
        {year: '2024', title: language === 'tr' ? 'Çok Sektörlü Hizmet' : 'Multi-Sector Service'}
    ];

    return (
        <div className="min-h-screen pb-12">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-secondary-700 text-white py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                {t('about.title')}
                            </h1>
                            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                                {t('about.subtitle')}
                            </p>
                            <p className="text-lg text-primary-50 mb-8 leading-relaxed">
                                {personalInfo.bio[language]}
                            </p>
                        </div>

                        <div className="relative">
                            <div className="relative z-10">
                                <img
                                    src={personalInfo.photo}
                                    alt={personalInfo.name}
                                    className="w-80 h-80 object-cover rounded-2xl shadow-2xl mx-auto"
                                />
                            </div>
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-secondary-400/20 to-accent-400/20 rounded-2xl transform rotate-6"></div>
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-accent-400/20 to-secondary-400/20 rounded-2xl transform -rotate-6"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div
                                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 group-hover:scale-110 transition-transform ${
                                        stat.color === 'primary' ? 'bg-primary-100 text-primary-600' :
                                        stat.color === 'secondary' ? 'bg-secondary-100 text-secondary-600' :
                                        stat.color === 'accent' ? 'bg-accent-100 text-accent-600' :
                                        'bg-yellow-100 text-yellow-600'
                                    }`}>
                                    <stat.icon className="w-8 h-8"/>
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                                <div className="text-gray-600 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('about.experience')}</h2>
                            <p className="text-gray-700 text-lg leading-relaxed mb-8">
                                {t('about.experienceText')}
                            </p>

                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-xl shadow-sm">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('about.mission')}</h3>
                                    <p className="text-gray-600 leading-relaxed">{t('about.missionText')}</p>
                                </div>

                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('about.achievements')}</h2>
                            <div className="space-y-4">
                                {achievements.map((achievement, index) => (
                                    <div key={index}
                                         className="flex items-start space-x-4 bg-white p-4 rounded-xl shadow-sm">
                                        <div
                                            className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">
                                            {achievement.year}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about.services')}</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {language === 'tr'
                                ? 'Çeşitli sektörlerde sunduğum profesyonel hizmetler'
                                : 'Professional services I offer in various sectors'
                            }
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <div key={index}
                                 className="bg-gray-50 p-8 rounded-2xl text-center hover:bg-white hover:shadow-lg transition-all duration-300 group">
                                <div
                                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 group-hover:scale-110 transition-transform ${
                                        service.color === 'primary' ? 'bg-primary-100 text-primary-600' :
                                        service.color === 'secondary' ? 'bg-secondary-100 text-secondary-600' :
                                        service.color === 'accent' ? 'bg-accent-100 text-accent-600' :
                                        'bg-gray-100 text-gray-600'
                                    }`}>
                                    <service.icon className="w-8 h-8"/>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;
