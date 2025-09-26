import {productService} from '../services/firebaseService';
import type {Product} from '../types';

// Sample product data to seed Firebase
const sampleProducts: Omit<Product, 'id'>[] = [
    {
        title: {tr: 'Lüks Villa - Bodrum', en: 'Luxury Villa - Bodrum'},
        description: {
            tr: 'Deniz manzaralı, 4+1, havuzlu, 250m² lüks villa. Bodrum\'da muhteşem konumda.',
            en: 'Sea view, 4+1, with pool, 250m² luxury villa. Perfect location in Bodrum.'
        },
        price: 2500000,
        currency: 'TRY',
        category: 'realestate',
        images: [
            'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
        ],
        featured: true,
        inStock: true,
        rating: 4.9,
        reviews: 25,
        views: 1250,
        priceText: '2.500.000 TL',
        location: {tr: 'Bodrum, Muğla', en: 'Bodrum, Mugla'},
        date: new Date().toISOString(),
        seller: {
            name: 'Fahri Eren',
            phone: '+90 532 123 45 67',
            email: 'fahri.eren@gmail.com'
        },
        features: {
            tr: ['Deniz manzarası', 'Özel havuz', 'Bahçe', '4+1 oda', 'Otopark'],
            en: ['Sea view', 'Private pool', 'Garden', '4+1 rooms', 'Parking']
        },
        specifications: {
            area: '250m²',
            rooms: '4+1',
            age: '2 yıl',
            heating: 'Doğalgaz'
        }
    },
    {
        title: {tr: '2020 BMW 320i', en: '2020 BMW 320i'},
        description: {
            tr: 'Az kullanılmış, bakımlı, 50.000 km\'de 2020 model BMW 320i. Otomatik vites.',
            en: 'Low mileage, well-maintained 2020 BMW 320i with 50,000 km. Automatic transmission.'
        },
        price: 850000,
        currency: 'TRY',
        category: 'vehicles',
        images: [
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
            'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80'
        ],
        featured: true,
        inStock: true,
        rating: 4.7,
        reviews: 12,
        views: 850,
        priceText: '850.000 TL',
        location: {tr: 'Istanbul, Türkiye', en: 'Istanbul, Turkey'},
        date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        seller: {
            name: 'Fahri Eren',
            phone: '+90 532 123 45 67',
            email: 'fahri.eren@gmail.com'
        },
        features: {
            tr: ['Otomatik vites', 'Navigasyon', 'Deri koltuk', 'Sunroof', 'Xenon far'],
            en: ['Automatic transmission', 'Navigation', 'Leather seats', 'Sunroof', 'Xenon lights']
        },
        specifications: {
            year: '2020',
            km: '50.000 km',
            fuel: 'Benzin',
            engine: '2.0L'
        }
    },
    {
        title: {tr: 'İnşaat Demir Çubuk - 12mm', en: 'Construction Steel Rebar - 12mm'},
        description: {
            tr: 'Yüksek kaliteli, TSE standartlarında 12mm inşaat demiri. Toptan ve perakende satış.',
            en: 'High quality 12mm construction steel rebar, TSE standards. Wholesale and retail.'
        },
        price: 25,
        currency: 'TRY',
        category: 'construction',
        images: [
            'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
            'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&q=80'
        ],
        featured: false,
        inStock: true,
        rating: 4.5,
        reviews: 45,
        views: 320,
        priceText: '25 TL/metre',
        location: {tr: 'Ankara, Türkiye', en: 'Ankara, Turkey'},
        date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        seller: {
            name: 'Fahri Eren',
            phone: '+90 532 123 45 67',
            email: 'fahri.eren@gmail.com'
        },
        features: {
            tr: ['TSE standartları', 'Korozyona dayanıklı', 'Toptan fiyat', 'Hızlı teslimat'],
            en: ['TSE standards', 'Corrosion resistant', 'Wholesale price', 'Fast delivery']
        },
        specifications: {
            diameter: '12mm',
            length: '12m',
            weight: '8.88 kg/12m',
            standard: 'TSE 708'
        }
    },
    {
        title: {tr: 'Organik Domates - 1 kg', en: 'Organic Tomatoes - 1 kg'},
        description: {
            tr: 'Taze, organik, pestisitsiz domates. Kendi bahçemizden direkt.',
            en: 'Fresh, organic, pesticide-free tomatoes. Direct from our garden.'
        },
        price: 15,
        currency: 'TRY',
        category: 'farm',
        images: [
            'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80',
            'https://images.unsplash.com/photo-1546470427-e04b95b5453a?w=800&q=80'
        ],
        featured: false,
        inStock: true,
        rating: 4.8,
        reviews: 67,
        views: 234,
        priceText: '15 TL/kg',
        location: {tr: 'Antalya, Türkiye', en: 'Antalya, Turkey'},
        date: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        seller: {
            name: 'Fahri Eren',
            phone: '+90 532 123 45 67',
            email: 'fahri.eren@gmail.com'
        },
        features: {
            tr: ['100% organik', 'Pestisitsiz', 'Taze', 'Yerel üretim', 'Sertifikalı'],
            en: ['100% organic', 'Pesticide-free', 'Fresh', 'Local production', 'Certified']
        },
        specifications: {
            origin: 'Antalya',
            harvest: 'Bu hafta',
            organic: 'Sertifikalı',
            storage: 'Soğuk zincir'
        }
    }
];

export const seedDatabase = async (): Promise<void> => {
    console.log('Firebase veritabanına örnek ürünler ekleniyor...');

    try {
        for (const product of sampleProducts) {
            const productId = await productService.addProduct(product);
            console.log(`Ürün eklendi: ${product.title.tr} (ID: ${productId})`);
        }

        console.log('Tüm örnek ürünler başarıyla eklendi!');
    } catch (error) {
        console.error('Ürün eklerken hata:', error);
        throw error;
    }
};

export default seedDatabase;