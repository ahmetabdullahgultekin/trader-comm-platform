import React, {useState} from 'react';
import {ArrowRight, Search, Shield, Star, TrendingUp, Users} from 'lucide-react';
import {useTranslation} from '../../hooks';

interface HeroSectionProps {
    onSearch: (query: string) => void;
    onNavigateToProducts: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({onSearch, onNavigateToProducts}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const {t} = useTranslation();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchQuery);
        onNavigateToProducts();
    };

    const stats: {icon: typeof TrendingUp; value: string; label: string}[] = [];

    return (
        <section
            className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-800 via-primary-600 to-secondary-700 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.07]">
                <div
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')] bg-cover bg-center"></div>
            </div>

            {/* Geometric Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                <div
                    className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-400/10 rounded-full blur-3xl"></div>
                <div
                    className="absolute top-1/3 right-1/4 w-64 h-64 bg-secondary-400/8 rounded-full blur-2xl"></div>
                {/* Subtle grid overlay */}
                <div className="absolute inset-0 opacity-[0.03]"
                     style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-100 text-sm font-medium mb-8 border border-white/10">
                        <span className="w-2 h-2 bg-accent-400 rounded-full mr-2 animate-pulse"></span>
                        Fahri Eren Ticaret
                    </div>

                    {/* Main Content */}
                    <div className="mb-8">
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                            {t('hero.title')}
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-100/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                            {t('hero.subtitle')}
                        </p>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('hero.search')}
                                className="w-full px-6 py-4 pr-24 text-lg rounded-2xl bg-white/90 backdrop-blur-sm border-0 shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/20 placeholder-gray-500"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 font-semibold flex items-center space-x-2 shadow-lg"
                            >
                                <Search className="w-5 h-5"/>
                                <span className="hidden sm:inline">{t('hero.searchButton')}</span>
                            </button>
                        </div>
                    </form>

                    {/* CTA Button */}
                    <button
                        onClick={onNavigateToProducts}
                        className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-primary-600 rounded-2xl text-lg font-semibold hover:bg-primary-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
                    >
                        <span>{t('hero.cta')}</span>
                        <ArrowRight className="w-5 h-5"/>
                    </button>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div
                                    className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 group-hover:bg-white/20 transition-colors border border-white/10">
                                    <stat.icon className="w-6 h-6 text-white"/>
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-primary-200 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
