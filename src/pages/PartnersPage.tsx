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

                        {/* Our Businesses - Eren Ticaret & Eren Yumurta */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                                {language === 'tr' ? 'Markalarımız' : 'Our Brands'}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Eren Ticaret */}
                                <div
                                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-100">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div
                                            className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                                            <Building2 className="w-8 h-8 text-white"/>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-blue-900">Eren Ticaret</h3>
                                            <p className="text-sm text-blue-600">İnşaat & Yapı Malzemeleri</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mb-4 leading-relaxed">
                                        {language === 'tr'
                                            ? 'İnşaat malzemeleri ve yapı malzemeleri ticareti alanında 20 yıllık deneyim. TSE sertifikalı ürünler, toplu satış avantajları ve hızlı teslimat.'
                                            : 'Construction and building materials trading with 20 years of experience. TSE certified products, wholesale advantages and fast delivery.'}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">İnşaat Demiri</span>
                                        <span
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Çimento</span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Yapı Kimyasalları</span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Demir Çelik</span>
                                    </div>
                                    <a
                                        href="https://erenticaret.com.tr"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2"
                                    >
                                        {language === 'tr' ? 'Detaylı Bilgi' : 'Learn More'} →
                                    </a>
                                </div>

                                {/* Eren Yumurta */}
                                <div
                                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-green-100">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div
                                            className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center">
                                            <Award className="w-8 h-8 text-white"/>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-green-900">Eren Yumurta</h3>
                                            <p className="text-sm text-green-600">Organik Çiftlik Ürünleri</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mb-4 leading-relaxed">
                                        {language === 'tr'
                                            ? 'Organik yumurta üretimi ve dağıtımında uzman. Doğal beslenme anlayışı ile gezen tavuklardan üretilen sağlıklı yumurtalar.'
                                            : 'Expert in organic egg production and distribution. Healthy eggs produced from free-range chickens with natural nutrition philosophy.'}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">%100 Organik</span>
                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Gezen Tavuk</span>
                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Günlük Taze</span>
                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Toptan Satış</span>
                                    </div>
                                    <a
                                        href="https://erenyumurta.com.tr"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-600 hover:text-green-800 font-semibold flex items-center gap-2"
                                    >
                                        {language === 'tr' ? 'Detaylı Bilgi' : 'Learn More'} →
                                    </a>
                                </div>
                            </div>
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