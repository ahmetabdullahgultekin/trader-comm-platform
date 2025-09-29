import React from 'react';
import {motion} from 'framer-motion';
import {Quote, Star} from 'lucide-react';
import {useFahriErenConfig} from '../../hooks/useFahriErenConfig';
import {useTranslation} from '../../hooks';
import type {LanguageValue} from '../../types/enums';

interface TestimonialCardProps {
    testimonial: {
        id: number;
        name: string;
        title: string;
        rating: number;
        comment: {
            tr: string;
            en: string;
        };
        date: string;
    };
    index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({testimonial, index}) => {
    const {language} = useTranslation();
    const currentLanguage = language as LanguageValue;

    return (
        <motion.div
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: index * 0.1, duration: 0.5}}
            whileHover={{y: -5}}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
            {/* Quote Icon */}
            <div className="flex justify-between items-start mb-4">
                <Quote className="w-8 h-8 text-blue-600 opacity-50"/>
                <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${
                                i < testimonial.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Comment */}
            <blockquote className="text-gray-700 text-base leading-relaxed mb-6 italic">
                "{testimonial.comment[currentLanguage]}"
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                </div>
                <div className="text-xs text-gray-500">
                    {new Date(testimonial.date).toLocaleDateString(currentLanguage === 'tr' ? 'tr-TR' : 'en-US')}
                </div>
            </div>
        </motion.div>
    );
};

const TestimonialsSection: React.FC = () => {
    const config = useFahriErenConfig();
    const {t} = useTranslation();

    const testimonials = [
        // Müşteri yorumları
        {
            id: 3,
            name: "Hasan Özkan",
            title: "Emlak Yatırımcısı",
            rating: 5,
            comment: {
                tr: "Emlak yatırımı konusunda çok başarılı. Güvenilir ve profesyonel yaklaşımı sayesinde karlı yatırımlar yaptık.",
                en: "Very successful in real estate investment. We made profitable investments thanks to his reliable and professional approach."
            },
            date: "2024-09-10"
        },
        {
            id: 4,
            name: "Fatma Yılmaz",
            title: "İşletmeci",
            rating: 5,
            comment: {
                tr: "İşletmem için gerekli araçları bulmasında çok yardımcı oldu. Fiyat-performans açısından mükemmel seçenekler sundu.",
                en: "He was very helpful in finding the necessary vehicles for my business. He offered excellent options in terms of price-performance."
            },
            date: "2024-08-28"
        },
        {
            id: 5,
            name: "Ali Demir",
            title: "Çiftçi",
            rating: 5,
            comment: {
                tr: "Tarım aletleri konusunda çok bilgili. Doğru ürünü doğru fiyata bulmasını bilir. Kesinlikle tavsiye ederim.",
                en: "Very knowledgeable about agricultural tools. He knows how to find the right product at the right price. I definitely recommend it."
            },
            date: "2024-07-15"
        },
        {
            id: 6,
            name: "Zeynep Aktaş",
            title: "Mimar",
            rating: 5,
            comment: {
                tr: "İnşaat projelerimde ihtiyaç duyduğum malzemeleri her zaman kaliteli ve uygun fiyata temin ediyor.",
                en: "He always provides the materials I need for my construction projects at quality and affordable prices."
            },
            date: "2024-06-20"
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        {t('testimonials.title')}
                    </motion.h2>
                    <motion.p
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{delay: 0.1}}
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        {t('testimonials.subtitle')}
                    </motion.p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                            index={index}
                        />
                    ))}
                </div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{delay: 0.5}}
                    className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-blue-600">{config.stats.customerSatisfaction}/5
                            </div>
                            <div className="text-sm text-gray-600">{t('testimonials.overallRating')}</div>
                            <div className="flex justify-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                            i < Math.floor(config.stats.customerSatisfaction)
                                                ? 'text-yellow-400 fill-current'
                                                : 'text-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-green-600">{config.stats.happyCustomers}+</div>
                            <div className="text-sm text-gray-600">{t('testimonials.happyCustomers')}</div>
                        </div>

                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-purple-600">{config.stats.completedProjects}+</div>
                            <div className="text-sm text-gray-600">{t('testimonials.completedProjects')}</div>
                        </div>

                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-orange-600">{config.stats.experience}+</div>
                            <div className="text-sm text-gray-600">{t('testimonials.yearsExperience')}</div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            {t('testimonials.ctaTitle')}
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            {t('testimonials.ctaDescription')}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => window.open(config.contact.whatsappUrl(), '_blank')}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63z"/>
                                </svg>
                                {t('testimonials.contactWhatsapp')}
                            </button>
                            <button
                                onClick={() => window.open(config.contact.phoneUri(), '_self')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                </svg>
                                {t('testimonials.callNow')}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
