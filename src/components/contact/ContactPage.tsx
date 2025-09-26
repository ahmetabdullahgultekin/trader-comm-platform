import React from 'react';
import {
    AlertCircle,
    CheckCircle,
    Clock,
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Send,
    Twitter
} from 'lucide-react';
import {useContactForm, useTranslation} from '../../hooks';
import {DataService} from '../../services/dataService';

const ContactPage: React.FC = () => {
    const {language, t} = useTranslation();
    const {formData, updateField, isSubmitting, status, submitForm} = useContactForm();
    const dataService = DataService.getInstance();
    const personalInfo = dataService.getPersonalInfo();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitForm();
    };

    const contactInfo = [
        {
            icon: Phone,
            title: t('contact.info.phone'),
            value: personalInfo.phone,
            href: `tel:${personalInfo.phone}`,
            color: 'accent'
        },
        {
            icon: Mail,
            title: t('contact.info.email'),
            value: personalInfo.email,
            href: `mailto:${personalInfo.email}`,
            color: 'primary'
        },
        {
            icon: MapPin,
            title: t('contact.info.address'),
            value: personalInfo.address[language],
            href: '#map',
            color: 'secondary'
        }
    ];


    return (
        <div className="min-h-screen pb-12">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-secondary-700 text-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('contact.title')}</h1>
                    <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                        {t('contact.subtitle')}
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-6 -mt-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                {language === 'tr' ? 'Mesaj Gönderin' : 'Send a Message'}
                            </h2>

                            {status === 'success' && (
                                <div
                                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-600"/>
                                    <span className="text-green-800">{t('contact.form.success')}</span>
                                </div>
                            )}

                            {status === 'error' && (
                                <div
                                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
                                    <AlertCircle className="w-5 h-5 text-red-600"/>
                                    <span className="text-red-800">{t('contact.form.error')}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('contact.form.name')} *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => updateField('name', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                            placeholder={t('contact.form.name')}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('contact.form.email')} *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => updateField('email', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                            placeholder={t('contact.form.email')}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('contact.form.phone')}
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => updateField('phone', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                            placeholder={t('contact.form.phone')}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('contact.form.subject')} *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.subject}
                                            onChange={(e) => updateField('subject', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                            placeholder={t('contact.form.subject')}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('contact.form.message')} *
                                    </label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={(e) => updateField('message', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                                        placeholder={t('contact.form.message')}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    <Send className="w-5 h-5"/>
                                    <span>
                    {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                  </span>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        {/* Contact Information */}
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">
                                {language === 'tr' ? 'İletişim Bilgileri' : 'Contact Information'}
                            </h3>

                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className={`p-3 rounded-xl ${
                                            info.color === 'primary' ? 'bg-primary-100 text-primary-600' :
                                            info.color === 'secondary' ? 'bg-secondary-100 text-secondary-600' :
                                            info.color === 'accent' ? 'bg-accent-100 text-accent-600' :
                                            'bg-gray-100 text-gray-600'
                                        }`}>
                                            <info.icon className="w-6 h-6"/>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                                            {info.href ? (
                                                <a
                                                    href={info.href}
                                                    className="text-gray-600 hover:text-primary-600 transition-colors"
                                                >
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className="text-gray-600">{info.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Business Hours */}
                        <div
                            className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white rounded-2xl shadow-2xl p-8">
                            <h3 className="text-xl font-bold mb-6">{t('contact.info.workHours')}</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center pb-2 border-b border-white/20">
                                    <span>{t('contact.info.weekdays')}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>{t('contact.info.weekend')}</span>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-white/10 rounded-xl">
                                <p className="text-sm text-primary-100">
                                    {language === 'tr'
                                        ? 'Acil durumlar için 7/24 ulaşabilirsiniz.'
                                        : 'Available 24/7 for emergencies.'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-12">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-8 border-b border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-900">{t('contact.map')}</h3>
                            <p className="text-gray-600 mt-2">
                                {language === 'tr'
                                    ? 'Ofisimizin konumunu harita üzerinden görüntüleyebilirsiniz.'
                                    : 'You can view the location of our office on the map.'
                                }
                            </p>
                        </div>
                        <div id="map" className="h-96 relative">
                            <iframe
                                src="https://www.openstreetmap.org/export/embed.html?bbox=34.4479%2C37.4622%2C34.4879%2C37.5022&amp;layer=mapnik&amp;marker=37.482235%2C34.467883"
                                className="w-full h-full border-0 rounded-lg"
                                title={language === 'tr' ? 'Ulukışla Konum Haritası' : 'Ulukışla Location Map'}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            <div
                                className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-3 rounded-lg shadow-lg">
                                <div className="flex items-center space-x-2">
                                    <MapPin className="w-5 h-5 text-primary-600"/>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Fahri Eren</p>
                                        <p className="text-xs text-gray-600">{personalInfo.address[language]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
