import type {Language, Product, SEOData} from '../types';

// SEO Service - Singleton Pattern for Meta Management
export class SEOService {
    private static instance: SEOService;

    private constructor() {
    }

    public static getInstance(): SEOService {
        if (!SEOService.instance) {
            SEOService.instance = new SEOService();
        }
        return SEOService.instance;
    }

    // Update page meta tags
    public updatePageMeta(seoData: SEOData, language: Language) {
        // Update title
        document.title = seoData.title[language];

        // Update meta description
        this.updateMetaTag('description', seoData.description[language]);

        // Update keywords
        this.updateMetaTag('keywords', seoData.keywords[language]);

        // Update Open Graph tags
        this.updateMetaTag('og:title', seoData.title[language], 'property');
        this.updateMetaTag('og:description', seoData.description[language], 'property');
        this.updateMetaTag('og:locale', language === 'tr' ? 'tr_TR' : 'en_US', 'property');

        if (seoData.ogImage) {
            this.updateMetaTag('og:image', seoData.ogImage, 'property');
        }

        // Update Twitter tags
        this.updateMetaTag('twitter:title', seoData.title[language], 'name');
        this.updateMetaTag('twitter:description', seoData.description[language], 'name');

        // Update canonical URL
        if (seoData.canonical) {
            this.updateLinkTag('canonical', seoData.canonical);
        }

        // Update language alternates
        this.updateLanguageAlternates();
    }

    // Get SEO data for different pages
    public getPageSEOData(page: string): SEOData {
        const seoData: Record<string, SEOData> = {
            home: {
                title: {
                    tr: 'Fahri Eren - Güvenilir Ticaret Platformu | Emlak, Araç, İnşaat',
                    en: 'Fahri Eren - Reliable Trading Platform | Real Estate, Vehicles, Construction'
                },
                description: {
                    tr: '25 yıllık tecrübe ile emlak, araç alım-satımı, inşaat malzemeleri ve tarım ürünleri ticareti. Antalya merkezli güvenilir hizmet.',
                    en: '25 years of experience in real estate, vehicle trading, construction materials and agricultural products. Reliable service based in Antalya.'
                },
                keywords: {
                    tr: 'fahri eren, emlak antalya, araç alım satım, inşaat malzemesi, organik yumurta, ticaret',
                    en: 'fahri eren, real estate antalya, vehicle trading, construction materials, organic eggs, trading'
                },
                ogImage: '/og-home.jpg'
            },
            products: {
                title: {
                    tr: 'Ürünler - Fahri Eren Ticaret Platformu',
                    en: 'Products - Fahri Eren Trading Platform'
                },
                description: {
                    tr: 'Kaliteli emlak, araç, inşaat malzemeleri ve tarım ürünleri. Detaylı filtreleme ile aradığınızı bulun.',
                    en: 'Quality real estate, vehicles, construction materials and agricultural products. Find what you are looking for with detailed filtering.'
                },
                keywords: {
                    tr: 'ürünler, emlak satış, araç satış, inşaat malzemesi satış, organik ürünler',
                    en: 'products, real estate sales, vehicle sales, construction material sales, organic products'
                }
            },
            about: {
                title: {
                    tr: 'Hakkımda - Fahri Eren | 25 Yıllık Ticaret Deneyimi',
                    en: 'About Me - Fahri Eren | 25 Years Trading Experience'
                },
                description: {
                    tr: 'Fahri Eren kimdir? 25 yıllık ticaret deneyimi, müşteri memnuniyeti odaklı hizmet anlayışı ve güvenilir iş ortaklığı.',
                    en: 'Who is Fahri Eren? 25 years of trading experience, customer satisfaction focused service approach and reliable business partnership.'
                },
                keywords: {
                    tr: 'fahri eren hakkında, ticaret uzmanı, girişimci, antalya işadamı',
                    en: 'about fahri eren, trading expert, entrepreneur, antalya businessman'
                }
            },
            contact: {
                title: {
                    tr: 'İletişim - Fahri Eren | Antalya Ticaret',
                    en: 'Contact - Fahri Eren | Antalya Trading'
                },
                description: {
                    tr: 'Fahri Eren ile iletişime geçin. Telefon, email ve adres bilgileri. Antalya Muratpaşa merkezli hizmet.',
                    en: 'Contact Fahri Eren. Phone, email and address information. Service based in Antalya Muratpasha.'
                },
                keywords: {
                    tr: 'fahri eren iletişim, antalya ticaret, telefon, email, adres',
                    en: 'fahri eren contact, antalya trading, phone, email, address'
                }
            },
            partners: {
                title: {
                    tr: 'İş Ortaklarımız - Fahri Eren Ticaret Ağı',
                    en: 'Our Partners - Fahri Eren Trading Network'
                },
                description: {
                    tr: 'Güvenilir iş ortaklarımız: Eren Ticaret, Eren Emlak, Eren Yumurta, Eren Lojistik. Kaliteli hizmet ağı.',
                    en: 'Our reliable partners: Eren Trading, Eren Real Estate, Eren Eggs, Eren Logistics. Quality service network.'
                },
                keywords: {
                    tr: 'iş ortakları, eren ticaret, eren emlak, eren yumurta, eren lojistik',
                    en: 'business partners, eren trading, eren real estate, eren eggs, eren logistics'
                }
            }
        };

        return seoData[page] || seoData.home;
    }

    // Generate structured data for products
    public generateProductStructuredData(product: Product, language: Language) {
        const structuredData = {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.title[language],
            "description": product.description[language],
            "image": product.images,
            "offers": {
                "@type": "Offer",
                "price": product.price,
                "priceCurrency": "TRY",
                "availability": "https://schema.org/InStock",
                "seller": {
                    "@type": "Person",
                    "name": "Fahri Eren"
                }
            }
        };

        this.injectStructuredData('product-schema', structuredData);
    }

    // Generate business structured data
    public generateBusinessStructuredData(language: Language) {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Fahri Eren Ticaret",
            "description": language === 'tr'
                ? "25 yıllık deneyimle emlak, araç, inşaat malzemeleri ve tarım ürünleri ticareti"
                : "25 years of experience in real estate, vehicles, construction materials and agricultural products trading",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Muratpaşa",
                "addressLocality": "Antalya",
                "addressCountry": "TR"
            },
            "telephone": "+90 532 123 45 67",
            "email": "fahri.eren@gmail.com",
            "url": "https://fahrieren.com",
            "image": "/logo512.png",
            "priceRange": "$$",
            "openingHours": "Mo-Fr 08:00-19:00, Sa-Su 09:00-17:00"
        };

        this.injectStructuredData('business-schema', structuredData);
    }

    private updateMetaTag(name: string, content: string, attribute: string = 'name') {
        let element = document.querySelector(`meta[${attribute}="${name}"]`);

        if (!element) {
            element = document.createElement('meta');
            element.setAttribute(attribute, name);
            document.head.appendChild(element);
        }

        element.setAttribute('content', content);
    }

    private updateLinkTag(rel: string, href: string) {
        let element = document.querySelector(`link[rel="${rel}"]`);

        if (!element) {
            element = document.createElement('link');
            element.setAttribute('rel', rel);
            document.head.appendChild(element);
        }

        element.setAttribute('href', href);
    }

    private updateLanguageAlternates() {
        const currentUrl = window.location.href;
        const baseUrl = currentUrl.split('?')[0];

        // Remove existing alternate links
        const existingAlternates = document.querySelectorAll('link[rel="alternate"][hreflang]');
        existingAlternates.forEach(link => link.remove());

        // Add new alternate links
        const languages = ['tr', 'en'];
        languages.forEach(lang => {
            const link = document.createElement('link');
            link.rel = 'alternate';
            link.hreflang = lang;
            link.href = `${baseUrl}?lang=${lang}`;
            document.head.appendChild(link);
        });
    }

    private injectStructuredData(id: string, data: Record<string, unknown>) {
        // Remove existing structured data
        const existing = document.getElementById(id);
        if (existing) {
            existing.remove();
        }

        // Add new structured data
        const script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
    }
}
