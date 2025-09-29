import React from 'react';
import {motion} from 'framer-motion';
import {useFahriErenConfig} from '../../hooks/useFahriErenConfig';
import {useTranslation} from '../../hooks';
import {Award, CheckCircle, Clock, Star, TrendingUp, Users} from 'lucide-react';

const StatsSection: React.FC = () => {
    const config = useFahriErenConfig();
    const {t} = useTranslation();

    const stats = [
        {
            icon: TrendingUp,
            value: config.stats.experience,
            suffix: '+',
            label: t('stats.yearsExperience'),
            description: t('stats.experienceDesc'),
            color: 'text-blue-600',
            bgColor: 'bg-blue-100'
        },
        {
            icon: Users,
            value: config.stats.happyCustomers,
            suffix: '+',
            label: t('stats.happyCustomers'),
            description: t('stats.customersDesc'),
            color: 'text-green-600',
            bgColor: 'bg-green-100'
        },
        {
            icon: CheckCircle,
            value: config.stats.completedProjects,
            suffix: '+',
            label: t('stats.completedProjects'),
            description: t('stats.projectsDesc'),
            color: 'text-purple-600',
            bgColor: 'bg-purple-100'
        },
        {
            icon: Star,
            value: config.stats.customerSatisfaction,
            suffix: '/5',
            label: t('stats.customerRating'),
            description: t('stats.ratingDesc'),
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100'
        },
        {
            icon: Clock,
            value: config.stats.averageResponseTime,
            suffix: 'h',
            label: t('stats.responseTime'),
            description: t('stats.responseDesc'),
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-100'
        },
        {
            icon: Award,
            value: Math.floor(config.stats.totalDeals / 1000),
            suffix: 'K+',
            label: t('stats.totalDeals'),
            description: t('stats.dealsDesc'),
            color: 'text-red-600',
            bgColor: 'bg-red-100'
        }
    ];

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        {t('stats.title')}
                    </motion.h2>
                    <motion.p
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{delay: 0.1}}
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        {t('stats.subtitle')}
                    </motion.p>
                </div>

                {/* Stats Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true}}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.05,
                                    transition: {duration: 0.2}
                                }}
                                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div
                                        className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                                        <IconComponent className={`w-6 h-6 ${stat.color}`}/>
                                    </div>
                                    <div className="text-right">
                                        <motion.div
                                            className="text-2xl md:text-3xl font-bold text-gray-900"
                                            initial={{scale: 0}}
                                            whileInView={{scale: 1}}
                                            viewport={{once: true}}
                                            transition={{
                                                delay: index * 0.1 + 0.3,
                                                type: "spring",
                                                stiffness: 100
                                            }}
                                        >
                                            {typeof stat.value === 'number' && stat.value % 1 !== 0
                                                ? stat.value.toFixed(1)
                                                : stat.value
                                            }
                                            <span className={`${stat.color} ml-1`}>{stat.suffix}</span>
                                        </motion.div>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {stat.label}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {stat.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{delay: 0.5}}
                    className="text-center mt-12"
                >
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            {t('stats.ctaTitle')}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {t('stats.ctaDescription')}
                        </p>
                        <div className="flex items-center justify-center space-x-4">
                            <button
                                onClick={() => window.open(config.contact.phoneUri(), '_self')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                </svg>
                                {t('stats.callNow')}
                            </button>
                            <button
                                onClick={() => window.open(config.contact.whatsappUrl(), '_blank')}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63z"/>
                                </svg>
                                WhatsApp
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default StatsSection;
