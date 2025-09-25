import apiManager from './apiManager';

interface SEOData {
    title: string;
    description: string;
    keywords: string;
    image?: string;
    url?: string;
    type?: string;
    siteName?: string;
}

class SEOService {
    private config = apiManager.getSEOConfig();

    updatePageSEO(data: Partial<SEOData>) {
        const seoData = {
            title: data.title || this.config.DEFAULT_TITLE,
            description: data.description || this.config.DEFAULT_DESCRIPTION,
            keywords: data.keywords || this.config.DEFAULT_KEYWORDS,
            image: data.image || this.config.DEFAULT_IMAGE,
            url: data.url || window.location.href,
            type: data.type || 'website',
            siteName: data.siteName || this.config.SITE_NAME,
        };

        // Update document title
        document.title = seoData.title;

        // Update meta tags
        this.updateMetaTag('description', seoData.description);
        this.updateMetaTag('keywords', seoData.keywords);

        // Update Open Graph tags
        this.updateMetaProperty('og:title', seoData.title);
        this.updateMetaProperty('og:description', seoData.description);
        this.updateMetaProperty('og:image', seoData.image);
        this.updateMetaProperty('og:url', seoData.url);
        this.updateMetaProperty('og:type', seoData.type);
        this.updateMetaProperty('og:site_name', seoData.siteName);

        // Update Twitter Card tags
        this.updateMetaProperty('twitter:card', 'summary_large_image');
        this.updateMetaProperty('twitter:title', seoData.title);
        this.updateMetaProperty('twitter:description', seoData.description);
        this.updateMetaProperty('twitter:image', seoData.image);

        // Update canonical URL
        this.updateCanonicalUrl(seoData.url);

        // Track SEO updates
        apiManager.trackAnalytics('seo_update', {
            page: seoData.url,
            title: seoData.title,
        });
    }

    // Sayfa bazlı SEO konfigürasyonları
    getPageSEO(page: string) {
        const baseConfig = {
            siteName: this.config.SITE_NAME,
            siteUrl: this.config.SITE_URL,
        };

        switch (page) {
            case 'home':
                return {
                    ...baseConfig,
                    title: this.config.DEFAULT_TITLE,
                    description: this.config.DEFAULT_DESCRIPTION,
                    keywords: this.config.DEFAULT_KEYWORDS,
                    image: this.config.DEFAULT_IMAGE,
                };

            case 'products':
                return {
                    ...baseConfig,
                    title: 'Ürünler | Fahri Eren - Kaliteli Ürün Seçenekleri',
                    description: 'Fahri Eren\'in geniş ürün yelpazesini keşfedin. En kaliteli ürünler, uygun fiyatlar ve güvenilir hizmet.',
                    keywords: 'ürünler, kaliteli ürünler, satış, e-ticaret, fahri eren ürünleri',
                    image: '/images/products-og.jpg',
                };

            case 'about':
                return {
                    ...baseConfig,
                    title: 'Hakkımızda | Fahri Eren - Güvenilir Ticaret Ortağınız',
                    description: 'Fahri Eren hakkında bilgi alın. Tecrübeli ve güvenilir ticaret anlayışımızı keşfedin.',
                    keywords: 'hakkımızda, fahri eren, güvenilir ticaret, tecrübe, kalite',
                    image: '/images/about-og.jpg',
                };

            case 'contact':
                return {
                    ...baseConfig,
                    title: 'İletişim | Fahri Eren - Bizimle İletişime Geçin',
                    description: 'Fahri Eren ile iletişime geçin. Sorularınız için bize ulaşın, size yardımcı olmaktan mutluluk duyarız.',
                    keywords: 'iletişim, telefon, email, adres, fahri eren iletişim',
                    image: '/images/contact-og.jpg',
                };

            case 'partners':
                return {
                    ...baseConfig,
                    title: 'Partnerlerimiz | Fahri Eren - Güvenilir İş Ortaklarımız',
                    description: 'Fahri Eren\'in güvenilir iş ortaklarını ve partnerlerini keşfedin. Kaliteli hizmet ağımızı görün.',
                    keywords: 'partnerler, iş ortakları, işbirliği, güvenilir partnerler',
                    image: '/images/partners-og.jpg',
                };

            default:
                return {
                    ...baseConfig,
                    title: this.config.DEFAULT_TITLE,
                    description: this.config.DEFAULT_DESCRIPTION,
                    keywords: this.config.DEFAULT_KEYWORDS,
                    image: this.config.DEFAULT_IMAGE,
                };
        }
    }

    // Ürün detay sayfası için özel SEO
    getProductSEO(product: any) {
        const title = `${product.title.tr} | Fahri Eren`;
        const description = `${product.description.tr.substring(0, 160)}...`;
        const keywords = `${product.title.tr}, ${product.category}, fahri eren, ${product.keywords || ''}`;

        return {
            title,
            description,
            keywords,
            image: product.images?.[0] || this.config.DEFAULT_IMAGE,
            type: 'product',
            siteName: this.config.SITE_NAME,
        };
    }

    // Structured data (JSON-LD) ekleme
    addStructuredData(type: string, data: any) {
        const existingScript = document.querySelector(`script[data-type="${type}"]`);
        if (existingScript) {
            existingScript.remove();
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-type', type);

        let structuredData;
        switch (type) {
            case 'organization':
                structuredData = {
                    '@context': 'https://schema.org',
                    '@type': 'Organization',
                    name: this.config.SITE_NAME,
                    url: this.config.SITE_URL,
                    logo: `${this.config.SITE_URL}/images/logo.png`,
                    contactPoint: {
                        '@type': 'ContactPoint',
                        telephone: apiManager.getContactInfo().PHONE,
                        contactType: 'customer service',
                        email: apiManager.getContactInfo().EMAIL,
                    },
                    sameAs: Object.values(apiManager.getSocialLinks()),
                };
                break;

            case 'product':
                structuredData = {
                    '@context': 'https://schema.org',
                    '@type': 'Product',
                    name: data.title,
                    description: data.description,
                    image: data.images,
                    brand: {
                        '@type': 'Brand',
                        name: 'Fahri Eren',
                    },
                    offers: {
                        '@type': 'Offer',
                        price: data.price,
                        priceCurrency: 'TRY',
                        availability: 'https://schema.org/InStock',
                    },
                };
                break;

            default:
                structuredData = data;
        }

        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    // SEO analizi
    analyzePage() {
        const title = document.title;
        const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
        const h1Elements = document.querySelectorAll('h1');
        const images = document.querySelectorAll('img');
        const links = document.querySelectorAll('a');

        const analysis = {
            title: {
                length: title.length,
                optimal: title.length >= 30 && title.length <= 60,
                content: title,
            },
            description: {
                length: description.length,
                optimal: description.length >= 120 && description.length <= 160,
                content: description,
            },
            h1Count: h1Elements.length,
            h1Optimal: h1Elements.length === 1,
            imagesWithoutAlt: Array.from(images).filter(img => !img.alt).length,
            internalLinks: Array.from(links).filter(link =>
                link.href.startsWith(window.location.origin)
            ).length,
            externalLinks: Array.from(links).filter(link =>
                !link.href.startsWith(window.location.origin) &&
                link.href.startsWith('http')
            ).length,
        };

        return analysis;
    }

    private updateMetaTag(name: string, content: string) {
        let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }
        meta.content = content;
    }

    private updateMetaProperty(property: string, content: string) {
        let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
        }
        meta.content = content;
    }

    private updateCanonicalUrl(url: string) {
        let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!link) {
            link = document.createElement('link');
            link.rel = 'canonical';
            document.head.appendChild(link);
        }
        link.href = url;
    }
}

export const seoService = new SEOService();
export default seoService;
