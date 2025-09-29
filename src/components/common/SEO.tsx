import React from 'react';
import {Helmet} from 'react-helmet-async';
import {useLocation} from 'react-router-dom';
import {useFahriErenConfig} from '../../hooks/useFahriErenConfig';
import {useTranslation} from '../../hooks';
import type {LanguageValue} from '../../types/enums';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'product' | 'profile';
    article?: {
        publishedTime?: string;
        modifiedTime?: string;
        author?: string;
        section?: string;
        tags?: string[];
    };
}

const SEO: React.FC<SEOProps> = ({
                                     title,
                                     description,
                                     keywords,
                                     image,
                                     url,
                                     type = 'website',
                                     article
                                 }) => {
    const config = useFahriErenConfig();
    const {language} = useTranslation();
    const location = useLocation();
    const currentLanguage = language as LanguageValue;

    // SEO verilerini al
    const seoData = config.seo.getData();
    const structuredData = config.seo.getStructuredData();

    // Değerleri birleştir (prop'lar öncelikli)
    const finalTitle = title || seoData.title;
    const finalDescription = description || seoData.description;
    const finalKeywords = keywords || seoData.keywords;
    const finalImage = image || seoData.image;
    const finalUrl = url || `${config.config.website.domain}${location.pathname}`;

    // Tam başlık oluştur
    const fullTitle = title ? `${title} | ${config.business.name()}` : finalTitle;

    return (
        <Helmet>
            {/* Temel Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={finalDescription}/>
            <meta name="keywords" content={finalKeywords.join(', ')}/>
            <meta name="author" content={config.personal.fullName}/>
            <meta name="robots" content="index, follow"/>
            <meta name="language" content={currentLanguage}/>

            {/* Viewport ve Mobile */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta name="mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="default"/>

            {/* Canonical URL */}
            <link rel="canonical" href={finalUrl}/>

            {/* Open Graph Tags */}
            <meta property="og:title" content={fullTitle}/>
            <meta property="og:description" content={finalDescription}/>
            <meta property="og:type" content={type}/>
            <meta property="og:url" content={finalUrl}/>
            <meta property="og:image" content={finalImage}/>
            <meta property="og:image:alt" content={`${config.personal.fullName} - ${config.business.title()}`}/>
            <meta property="og:site_name" content={config.business.name()}/>
            <meta property="og:locale" content={currentLanguage === 'tr' ? 'tr_TR' : 'en_US'}/>

            {/* Article specific OG tags */}
            {type === 'article' && article && (
                <>
                    {article.publishedTime && <meta property="article:published_time" content={article.publishedTime}/>}
                    {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime}/>}
                    {article.author && <meta property="article:author" content={article.author}/>}
                    {article.section && <meta property="article:section" content={article.section}/>}
                    {article.tags && article.tags.map(tag => (
                        <meta key={tag} property="article:tag" content={tag}/>
                    ))}
                </>
            )}

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content={fullTitle}/>
            <meta name="twitter:description" content={finalDescription}/>
            <meta name="twitter:image" content={finalImage}/>

            {/* Business/Contact Information */}
            <meta name="contact" content={config.contact.email('primary')}/>
            <meta name="phone" content={config.contact.phone('primary')}/>
            <meta name="address" content={config.contact.fullAddress()}/>

            {/* Schema.org Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>

            {/* Additional Business Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "LocalBusiness",
                    "name": config.business.name(),
                    "description": config.business.description(),
                    "url": config.config.website.domain,
                    "telephone": config.contact.phone('primary'),
                    "email": config.contact.email('primary'),
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": config.config.contact.location.city,
                        "addressCountry": config.config.contact.location.country
                    },
                    "openingHours": "Mo-Fr 08:00-18:00",
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": config.config.stats.customerSatisfaction.toString(),
                        "reviewCount": config.config.stats.happyCustomers.toString()
                    }
                })}
            </script>

            {/* Breadcrumb Schema (if applicable) */}
            {location.pathname !== '/' && (
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Ana Sayfa",
                                "item": config.website.domain
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": finalTitle,
                                "item": finalUrl
                            }
                        ]
                    })}
                </script>
            )}

            {/* Theme Color */}
            <meta name="theme-color" content={config.website.colors.primary}/>
        </Helmet>
    );
};

export default SEO;
