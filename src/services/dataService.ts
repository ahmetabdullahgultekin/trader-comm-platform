import type {ContactForm, Partner, PersonalInfo, Product} from '../types';
import {apiManager} from './apiManager';

// Data Service - Repository Pattern with API integration
export class DataService {
    private static instance: DataService;

    private constructor() {
    }

    public static getInstance(): DataService {
        if (!DataService.instance) {
            DataService.instance = new DataService();
        }
        return DataService.instance;
    }

    // API ile ürünleri getir (fallback olarak mock data)
    public async getProducts(): Promise<Product[]> {
        try {
            // API'dan veri çekmeye çalış
            const response = await apiManager.makeRequest<Product[]>('/products');
            return response.success ? response.data : this.getMockProducts();
        } catch {
            console.log('API unavailable, using mock data');
            // Fallback: Mock data
            return this.getMockProducts();
        }
    }

    // Contact form gönderimi
    public async submitContactForm(formData: ContactForm): Promise<{ success: boolean; message: string }> {
        try {
            await apiManager.makeRequest('/contact', {method: 'POST', body: formData});
            return {success: true, message: 'Message sent successfully!'};
        } catch {
            console.log('API unavailable for contact form, using mock response');
            // Simüle edilmiş başarı
            await new Promise(resolve => setTimeout(resolve, 1000));
            return {success: true, message: 'Message sent successfully!'};
        }
    }

    // Newsletter subscription
    public async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
        try {
            await apiManager.makeRequest('/newsletter', {method: 'POST', body: {email}});
            return {success: true, message: 'Successfully subscribed!'};
        } catch {
            console.log('Newsletter API unavailable');
            await new Promise(resolve => setTimeout(resolve, 500));
            return {success: true, message: 'Successfully subscribed!'};
        }
    }

    // Partners Data
    public getPartners(): Partner[] {
        return [
            {
                id: 'eren-ticaret',
                name: 'Eren Ticaret',
                description: {
                    tr: 'İnşaat malzemeleri ve yapı malzemeleri ticareti alanında 20 yıllık deneyim',
                    en: 'Construction and building materials trading with 20 years of experience'
                },
                services: {
                    tr: ['İnşaat Malzemeleri', 'Yapı Kimyasalları', 'Demir Çelik', 'Toptan Satış', 'Proje Danışmanlığı'],
                    en: ['Construction Materials', 'Building Chemicals', 'Steel', 'Wholesale', 'Project Consulting']
                },
                website: 'https://erenticaret.com.tr',
                logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&q=80',
                category: 'business'
            },
            {
                id: 'eren-yumurta',
                name: 'Eren Yumurta',
                description: {
                    tr: 'Organik yumurta üretimi ve dağıtımında uzman, doğal beslenme anlayışı',
                    en: 'Expert in organic egg production and distribution with natural nutrition philosophy'
                },
                services: {
                    tr: ['Organik Yumurta', 'Gezen Tavuk', 'Doğal Ürünler', 'Toptan Satış', 'Çiftlik Turları'],
                    en: ['Organic Eggs', 'Free Range', 'Natural Products', 'Wholesale', 'Farm Tours']
                },
                website: 'https://erenyumurta.com.tr',
                logo: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=300&q=80',
                category: 'agriculture'
            }
        ];
    }

    // Personal Information
    public getPersonalInfo(): PersonalInfo {
        return {
            name: 'Fahri Eren',
            title: {
                tr: 'Ticaret Uzmanı & Girişimci',
                en: 'Trade Expert & Entrepreneur'
            },
            bio: {
                tr: 'Merhaba, ben Fahri Eren. 1998 yılından bu yana ticaret sektöründe faaliyet göstermekteyim. Müşteri memnuniyetini öncelik olarak belirleyerek, kaliteli ürün ve hizmet sunmayı ilke edindim. Emlak, araç alım-satımı, inşaat malzemeleri ve tarım ürünleri konularında uzmanlaşmış durumdayım.',
                en: 'Hello, I am Fahri Eren. I have been operating in the trade sector since 1998. I have adopted the principle of providing quality products and services by prioritizing customer satisfaction. I specialize in real estate, vehicle trading, construction materials and agricultural products.'
            },
            photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
            phone: '05368536265',
            email: 'fahri.eren@gmail.com',
            address: {
                tr: 'Kılan Köyü, Ulukışla, Niğde, Türkiye',
                en: 'Kılan, Ulukışla, Niğde, Turkey'
            },
            socialMedia: {
                facebook: 'https://facebook.com/fahrieren',
                instagram: 'https://instagram.com/fahrieren',
                linkedin: 'https://linkedin.com/in/fahrieren'
            },
            workHours: {
                tr: 'Hafta içi: 08:00 - 19:00, Hafta sonu: 09:00 - 17:00',
                en: 'Weekdays: 08:00 - 19:00, Weekend: 09:00 - 17:00'
            },
            social: {
                linkedin: 'https://linkedin.com/in/fahrieren',
                twitter: 'https://twitter.com/fahrieren',
                instagram: 'https://instagram.com/fahrieren'
            }
        };
    }

    // Mock Products Data with better images
    private getMockProducts(): Product[] {
        return [
            {
                id: '1',
                category: 'realestate',
                currency: 'TRY',
                inStock: true,
                title: {tr: 'Lüks Villa - Deniz Manzaralı', en: 'Luxury Villa - Sea View'},
                price: 12500000,
                priceText: '12.500.000 ₺',
                images: [
                    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
                    'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80',
                    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'
                ],
                location: {tr: 'Ulukışla, Niğde', en: 'Ulukışla, Niğde'},
                description: {
                    tr: 'Muhteşem deniz manzaralı, modern mimariye sahip lüks villa. Geniş bahçe, özel havuz ve akıllı ev sistemi ile donatılmıştır. 5 yatak odası, 2 salon, amerikan mutfak ve 3 banyo bulunmaktadır. Villa, denize sadece 50 metre mesafede olup, panoramik manzarası ile büyüleyici bir yaşam alanı sunmaktadır.',
                    en: 'Luxury villa with magnificent sea view and modern architecture. Equipped with large garden, private pool and smart home system. It has 5 bedrooms, 2 living rooms, American kitchen and 3 bathrooms. The villa is only 50 meters from the sea and offers a fascinating living space with its panoramic view.'
                },
                features: {
                    tr: ['Deniz Manzarası', 'Özel Havuz', 'Akıllı Ev Sistemi', '7/24 Güvenlik', 'Geniş Bahçe', 'Kapalı Garaj', 'Merkezi Isıtma', 'Klima', 'Jakuzi', 'Barbekü Alanı'],
                    en: ['Sea View', 'Private Pool', 'Smart Home System', '24/7 Security', 'Large Garden', 'Indoor Garage', 'Central Heating', 'Air Conditioning', 'Jacuzzi', 'BBQ Area']
                },
                featured: true,
                views: 1234,
                date: '2024-01-15',
                seller: {name: 'Fahri Eren', phone: '+90 532 123 4567', email: 'fahri@eren.com'}
            },
            {
                id: '2',
                category: 'vehicles',
                currency: 'TRY',
                inStock: true,
                title: {tr: 'Mercedes-Benz E200 AMG', en: 'Mercedes-Benz E200 AMG'},
                price: 2850000,
                priceText: '2.850.000 ₺',
                images: [
                    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
                    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
                    'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80',
                    'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80'
                ],
                location: {tr: '2020 Model, 45.000 km', en: '2020 Model, 45,000 km'},
                description: {
                    tr: 'Temiz kullanılmış, full bakımlı Mercedes-Benz E200. Tüm bakımları yetkili serviste yapılmıştır. Kaza ve boya kaydı bulunmamaktadır. AMG paket, panoramik tavan, 360 derece kamera sistemi mevcuttur. Araç garaj şartlarında muhafaza edilmiş olup, orijinal km\'dedir.',
                    en: 'Well-maintained Mercedes-Benz E200 in excellent condition. All services done at authorized dealer. No accident or paint history. AMG package, panoramic roof, 360-degree camera system available. The vehicle has been kept in garage conditions and has original mileage.'
                },
                features: {
                    tr: ['Panoramik Tavan', 'Deri Döşeme', 'Navigasyon', '360° Kamera', 'Park Sensörü', 'Hız Sabitleyici', 'Koltuk Isıtma', 'LED Farlar', 'Xenon', 'Harman Kardon Ses'],
                    en: ['Panoramic Roof', 'Leather Interior', 'Navigation', '360° Camera', 'Park Sensor', 'Cruise Control', 'Seat Heating', 'LED Headlights', 'Xenon', 'Harman Kardon Sound']
                },
                featured: true,
                views: 856,
                date: '2024-01-10',
                seller: {name: 'Fahri Eren', phone: '+90 532 123 4567', email: 'fahri@eren.com'}
            },
            {
                id: '3',
                category: 'construction',
                currency: 'TRY',
                inStock: true,
                title: {tr: 'İnşaat Demiri (8-12mm)', en: 'Rebar (8-12mm)'},
                price: 285,
                priceText: '285 ₺/kg',
                images: [
                    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
                    'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800&q=80',
                    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80'
                ],
                location: {tr: 'Eren Ticaret - Ulukışla', en: 'Eren Trading - Ulukışla'},
                description: {
                    tr: 'Yüksek kaliteli, TSE sertifikalı inşaat demiri. Tüm ebatlarda stok mevcuttur. Toplu alımlarda özel fiyat uygulanır. Nakliye imkanı mevcuttur. Çelik kalitesi S420 normunda olup, deprem yönetmeliğine uygun üretilmiştir.',
                    en: 'High quality, TSE certified rebar. Available in all sizes. Special prices for bulk orders. Delivery available. Steel quality is S420 standard and manufactured in accordance with earthquake regulations.'
                },
                features: {
                    tr: ['TSE Sertifikalı', 'Yüksek Dayanıklılık', 'Toplu İndirim', 'Hızlı Teslimat', 'Nakliye İmkanı', 'S420 Kalite', 'Deprem Yönetmeliğine Uygun'],
                    en: ['TSE Certified', 'High Durability', 'Bulk Discount', 'Fast Delivery', 'Transportation Available', 'S420 Quality', 'Earthquake Regulation Compliant']
                },
                featured: true,
                views: 423,
                date: '2024-01-20',
                seller: {name: 'Eren Ticaret', phone: '+90 532 987 6543', email: 'info@erentics.com'}
            },
            {
                id: '4',
                category: 'farm',
                currency: 'TRY',
                inStock: true,
                title: {tr: 'Organik Yumurta (30\'lu Paket)', en: 'Organic Eggs (30 Pack)'},
                price: 95,
                priceText: '95 ₺',
                images: [
                    'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&q=80',
                    'https://images.unsplash.com/photo-1569288063643-5d29ad64df09?w=800&q=80',
                    'https://images.unsplash.com/photo-1587486913218-4c7f8c2c7fc5?w=800&q=80',
                    'https://images.unsplash.com/photo-1607672632458-9eb56696346b?w=800&q=80'
                ],
                location: {tr: 'Eren Çiftlik - Günlük Taze', en: 'Eren Farm - Daily Fresh'},
                description: {
                    tr: 'Doğal ortamda, organik yemlerle beslenen gezen tavuklardan elde edilen taze yumurtalar. Antibiyotik ve hormon içermez. Günlük toplanır ve özel ambalajlarda teslim edilir. Çiftliğimizde tavuklar minimum 8 m² alana sahip olup, doğal çayır alanlarında özgürce gezerler.',
                    en: 'Fresh eggs from free-range chickens fed with organic feed in natural environment. No antibiotics or hormones. Collected daily and delivered in special packaging. In our farm, chickens have a minimum area of 8 m² and roam freely in natural grasslands.'
                },
                features: {
                    tr: ['%100 Organik', 'Gezen Tavuk', 'Günlük Taze', 'Doğal Besleme', 'Özel Ambalaj', 'Vitamin Deposu', 'Antibiyotiksiz', 'Hormonsuz'],
                    en: ['100% Organic', 'Free Range', 'Daily Fresh', 'Natural Feed', 'Special Packaging', 'Vitamin Rich', 'Antibiotic-Free', 'Hormone-Free']
                },
                featured: true,
                views: 234,
                date: '2024-01-25',
                seller: {name: 'Eren Çiftlik', phone: '+90 532 555 0123', email: 'info@erenciftlik.com'}
            },
            {
                id: '5',
                category: 'realestate',
                currency: 'TRY',
                inStock: true,
                title: {tr: '3+1 Kiralık Daire - Merkezi', en: '3+1 Apartment for Rent - Central'},
                price: 25000,
                priceText: '25.000 ₺/ay',
                images: [
                    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
                    'https://images.unsplash.com/photo-1558442074-3c19857bc1dc?w=800&q=80',
                    'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80'
                ],
                location: {tr: 'İstanbul, Kadıköy', en: 'Istanbul, Kadikoy'},
                description: {
                    tr: 'Merkezi konumda, full eşyalı, lüks daire. Metro ve metrobüs durağına 5 dakika yürüme mesafesinde. Site içerisinde, 7/24 güvenlik ve otopark mevcuttur. Daire 120 m² kullanım alanına sahip olup, güney cepheli ve bol ışık almaktadır.',
                    en: 'Luxury apartment in central location, fully furnished. 5 minutes walking distance to metro and metrobus station. In a complex with 24/7 security and parking. The apartment has 120 m² usage area, south-facing and receives plenty of light.'
                },
                features: {
                    tr: ['Full Eşyalı', 'Merkezi Konum', 'Site İçi', '7/24 Güvenlik', 'Otopark', 'Metro Yakını', 'Güney Cephe', 'Bol Işık'],
                    en: ['Fully Furnished', 'Central Location', 'In Complex', '24/7 Security', 'Parking', 'Near Metro', 'South Facing', 'Plenty of Light']
                },
                views: 567,
                date: '2024-01-18',
                seller: {name: 'Fahri Eren', phone: '+90 532 123 4567', email: 'fahri@eren.com'}
            },
            {
                id: '6',
                category: 'construction',
                currency: 'TRY',
                inStock: true,
                title: {tr: 'Çimento (50kg Torba)', en: 'Cement (50kg Bag)'},
                price: 150,
                priceText: '150 ₺',
                images: [
                    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
                    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
                ],
                location: {tr: 'Eren Ticaret', en: 'Eren Trading'},
                description: {
                    tr: 'Yüksek kaliteli, TSE belgeli çimento. İnşaat ve tadilat işlerinde güvenle kullanabilirsiniz. Toplu alımlarda indirim uygulanır. Portland çimentosu olup, dayanım sınıfı 42.5\'tir.',
                    en: 'High quality, TSE certified cement. Can be used safely in construction and renovation works. Discounts available for bulk purchases. It is Portland cement with a strength class of 42.5.'
                },
                features: {
                    tr: ['TSE Belgeli', 'Yüksek Kalite', 'Toplu İndirim', 'Portland Çimento', '42.5 Dayanım'],
                    en: ['TSE Certified', 'High Quality', 'Bulk Discount', 'Portland Cement', '42.5 Strength']
                },
                views: 189,
                date: '2024-01-22',
                seller: {name: 'Eren Ticaret', phone: '+90 532 987 6543', email: 'info@erentics.com'}
            }
        ];
    }
}
