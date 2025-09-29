import React from 'react';
import {Award, Building2, Handshake, Users} from 'lucide-react';
import {useFahriErenConfig} from '../hooks/useFahriErenConfig';
import {useTranslation} from '../hooks';
import SEO from '../components/common/SEO';

const PartnersPage: React.FC = () => {
    const config = useFahriErenConfig();
    const {language} = useTranslation();

    const handleContactClick = () => {
        window.open(config.contact.whatsappUrl(), '_blank');
    };

    const partnerCategories = [
        {
            title: language === 'tr' ? 'Emlak Ortakları' : 'Real Estate Partners',
            description: language === 'tr'
                ? 'Güvenilir emlak danışmanları ve kurumsal ortaklarımız'
                : 'Trusted real estate consultants and corporate partners',
            icon: Building2,
            color: 'blue'
        },
        {
            title: language === 'tr' ? 'Tarım Ortakları' : 'Agriculture Partners',
            description: language === 'tr'
                ? 'Tarım ürünleri tedarikçileri ve çiftçi ortaklarımız'
                : 'Agricultural product suppliers and farmer partners',
            icon: Users,
            color: 'green'
        },
        {
            title: language === 'tr' ? 'Araç Galeri Ortakları' : 'Vehicle Dealer Partners',
            description: language === 'tr'
                ? 'Otomobil galerisi ve araç satış ortaklarımız'
                : 'Automobile dealership and vehicle sales partners',
            icon: Handshake,
            color: 'purple'
        },
        {
            title: language === 'tr' ? 'İnşaat Ortakları' : 'Construction Partners',
            description: language === 'tr'
                ? 'İnşaat firmaları ve malzeme tedarikçi ortaklarımız'
                : 'Construction companies and material supplier partners',
            icon: Award,
            color: 'orange'
        }
    ];

    const benefits = [
        {
            title: language === 'tr' ? 'Güvenilir İş Birliği' : 'Reliable Cooperation',
            description: language === 'tr'
                ? '15+ yıllık deneyim ile güven tabanlı ortaklık'
                : 'Trust-based partnership with 15+ years of experience'
        },
        {
            title: language === 'tr' ? 'Karşılıklı Fayda' : 'Mutual Benefit',
            description: language === 'tr'
                ? 'Her iki taraf için de kazançlı iş modeli'
                : 'Profitable business model for both parties'
        },
        {
            title: language === 'tr' ? 'Geniş Ağ' : 'Wide Network',
            description: language === 'tr'
                ? 'Türkiye genelinde yaygın müşteri ve partner ağı'
                : 'Extensive customer and partner network across Turkey'
        }
    ];

    return (
        <>
            <SEO
                title={language === 'tr' ? 'İş Ortaklarımız' : 'Our Partners'}
                description={language === 'tr'
                    ? 'Fahri Eren ile güvenilir iş ortaklığı kurun. Emlak, tarım, araç ve inşaat sektörlerinde birlikte büyüyelim.'
                    : 'Establish a reliable business partnership with Fahri Eren. Grow together in real estate, agriculture, vehicles and construction sectors.'}
            />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                {language === 'tr' ? 'İş Ortaklarımız' : 'Our Business Partners'}
                            </h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                {language === 'tr'
                                    ? 'Güçlü iş ortaklıkları kurarak, birlikte büyüyor ve başarıya ulaşıyoruz. Siz de bu güvenilir ağın bir parçası olun.'
                                    : 'We grow together and achieve success by building strong business partnerships. Be part of this trusted network.'}
                            </p>
                        </div>

                        {/* Partner Categories */}
                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                            {partnerCategories.map((category, index) => {
                                const IconComponent = category.icon;
                                const colorClasses = {
                                    blue: 'bg-blue-100 text-blue-600 border-blue-200',
                                    green: 'bg-green-100 text-green-600 border-green-200',
                                    purple: 'bg-purple-100 text-purple-600 border-purple-200',
                                    orange: 'bg-orange-100 text-orange-600 border-orange-200'
                                };

                                return (
                                    <div key={index}
                                         className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border">
                                        <div
                                            className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${colorClasses[category.color as keyof typeof colorClasses]}`}>
                                            <IconComponent className="w-8 h-8"/>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                            {category.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {category.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Partnership Benefits */}
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                                {language === 'tr' ? 'Ortaklık Avantajları' : 'Partnership Benefits'}
                            </h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="text-center">
                                        <div
                                            className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <span className="text-white font-bold text-lg">{index + 1}</span>
                                        </div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                                            {benefit.title}
                                        </h4>
                                        <p className="text-gray-600">
                                            {benefit.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div
                            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
                            <h2 className="text-3xl font-bold mb-6">
                                {language === 'tr' ? 'İş Ortağımız Olun' : 'Become Our Business Partner'}
                            </h2>
                            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                                {language === 'tr'
                                    ? 'Güvenilir iş ortaklığı için bugün bizimle iletişime geçin. Birlikte daha büyük başarılara imza atalım.'
                                    : 'Contact us today for a reliable business partnership. Let\'s achieve greater success together.'}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={handleContactClick}
                                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                                >
                                    {language === 'tr' ? 'WhatsApp ile İletişim' : 'Contact via WhatsApp'}
                                </button>
                                <button
                                    onClick={() => window.open(`mailto:${config.contact.email()}`, '_self')}
                                    className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                                >
                                    {language === 'tr' ? 'E-posta Gönder' : 'Send Email'}
                                </button>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">
                                    {config.stats.experience}+
                                </div>
                                <div className="text-gray-600">
                                    {language === 'tr' ? 'Yıl Deneyim' : 'Years Experience'}
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600 mb-2">
                                    {config.stats.happyCustomers}+
                                </div>
                                <div className="text-gray-600">
                                    {language === 'tr' ? 'Mutlu Müşteri' : 'Happy Customers'}
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-2">
                                    {config.stats.completedProjects}+
                                </div>
                                <div className="text-gray-600">
                                    {language === 'tr' ? 'Tamamlanan Proje' : 'Completed Projects'}
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-600 mb-2">
                                    {config.stats.customerSatisfaction}
                                </div>
                                <div className="text-gray-600">
                                    {language === 'tr' ? 'Müşteri Memnuniyeti' : 'Customer Satisfaction'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PartnersPage;