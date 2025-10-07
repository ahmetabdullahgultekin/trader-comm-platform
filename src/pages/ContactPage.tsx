import React, {useState} from 'react';
import {MapPin, MessageCircle, Phone, Send} from 'lucide-react';
import {useFahriErenConfig} from '../hooks/useFahriErenConfig';
import {useTranslation} from '../hooks';
import SEO from '../components/common/SEO';
import GoogleMap from '../components/common/GoogleMap';
import toast from 'react-hot-toast';

const ContactPage: React.FC = () => {
    const config = useFahriErenConfig();
    const {t, language} = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCallPhone = () => {
        window.open(config.contact.phoneUri(), '_self');
    };

    const handleWhatsAppClick = () => {
        window.open(config.contact.whatsappUrl(), '_blank');
    };

    const handleEmailClick = () => {
        window.open(`mailto:${config.contact.email()}`, '_self');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // WhatsApp mesajı oluştur
            const message = `
Yeni İletişim Formu Mesajı

İsim: ${formData.name}
E-posta: ${formData.email}
Telefon: ${formData.phone}
Konu: ${formData.subject}

Mesaj:
${formData.message}
            `.trim();

            const whatsappUrl = config.contact.whatsappUrl(message);
            window.open(whatsappUrl, '_blank');

            toast.success(t('contact.form.success'));
            setFormData({name: '', email: '', phone: '', subject: '', message: ''});
        } catch (error) {
            toast.error(t('contact.form.error'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <SEO
                title={t('contact.title')}
                description={t('contact.description')}
            />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                {t('contact.title')}
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                {config.business.description[language]}
                            </p>
                        </div>

                        {/* Contact Options */}
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            {/* Phone */}
                            <div
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                                <div
                                    className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Phone className="w-8 h-8 text-blue-600"/>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {t('contact.phone')}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {config.contact.phone()}
                                </p>
                                <button
                                    onClick={handleCallPhone}
                                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    {t('contact.call')}
                                </button>
                            </div>

                            {/* WhatsApp */}
                            <div
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                                <div
                                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <MessageCircle className="w-8 h-8 text-green-600"/>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    WhatsApp
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {t('contact.whatsapp_desc')}
                                </p>
                                <button
                                    onClick={handleWhatsAppClick}
                                    className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    {t('contact.whatsapp')}
                                </button>
                            </div>

                            {/* Email */}
                            <div
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                                <div
                                    className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    E-posta
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {config.contact.email()}
                                </p>
                                <button
                                    onClick={handleEmailClick}
                                    className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    {t('contact.email')}
                                </button>
                            </div>
                        </div>

                        {/* Working Hours & Address */}
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                                    {t('contact.working_hours')}
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-semibold text-gray-700 mb-1">
                                            {t('contact.days')}
                                        </p>
                                        <p className="text-lg text-gray-600">
                                            {config.config.business.workingDays[language]}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-700 mb-1">
                                            {t('contact.hours')}
                                        </p>
                                        <p className="text-lg text-gray-600">
                                            {config.config.business.workingHours[language]}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <MapPin className="w-6 h-6 text-blue-600"/>
                                    {t('contact.address')}
                                </h3>
                                <p className="text-lg text-gray-700 mb-4">
                                    {config.contact.fullAddress()}
                                </p>
                                <p className="text-gray-600">
                                    {config.config.contact.location.city}, {config.config.contact.location.country}
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                                {t('contact.form.title') || 'Mesaj Gönderin'}
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('contact.form.name')}
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                            placeholder={t('contact.form.name')}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('contact.form.email')}
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                            placeholder={t('contact.form.email')}
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('contact.form.phone')}
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                            placeholder={t('contact.form.phone')}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="subject"
                                               className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('contact.form.subject')}
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                            placeholder={t('contact.form.subject')}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('contact.form.message')}
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                                        placeholder={t('contact.form.message')}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <span>{t('contact.form.sending')}</span>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5"/>
                                            <span>{t('contact.form.send')}</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Google Map */}
                        {config.config.contact.location.coordinates && (
                            <div className="mb-8">
                                <GoogleMap
                                    lat={config.config.contact.location.coordinates.lat}
                                    lng={config.config.contact.location.coordinates.lng}
                                    title={config.contact.fullAddress()}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactPage;