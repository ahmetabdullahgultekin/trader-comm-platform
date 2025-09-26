import type {Language} from '../types';

// Translation Service - Singleton Pattern
export class TranslationService {
    private static instance: TranslationService;
    private currentLanguage: Language = 'tr';

    private translations = {
        tr: {
            nav: {
                home: 'Ana Sayfa',
                products: 'Ürünler',
                about: 'Hakkımda',
                contact: 'İletişim',
                partners: 'İş Ortaklarımız'
            },
            hero: {
                title: 'Güvenilir Ticaret, Kaliteli Hizmet',
                subtitle: 'Emlak, Araç, İnşaat Malzemesi ve Tarım Ürünleri',
                cta: 'Hemen Keşfet',
                search: 'Ne aramıştınız?',
                searchButton: 'Ara'
            },
            filters: {
                title: 'Filtreler',
                category: 'Kategori',
                priceRange: 'Fiyat Aralığı',
                sortBy: 'Sıralama',
                location: 'Konum',
                clear: 'Temizle',
                apply: 'Uygula',
                min: 'Min',
                max: 'Max',
                newest: 'En Yeni',
                oldest: 'En Eski',
                priceLow: 'Fiyat (Düşük)',
                priceHigh: 'Fiyat (Yüksek)',
                popular: 'Popüler'
            },
            categories: {
                all: 'Tümü',
                realestate: 'Emlak',
                vehicles: 'Araçlar',
                construction: 'İnşaat Malzemeleri',
                farm: 'Çiftlik Ürünleri'
            },
            products: {
                title: 'Öne Çıkan Ürünler',
                new: 'Yeni',
                sale: 'İndirimde',
                details: 'Detaylar',
                contact: 'İletişime Geç',
                description: 'Açıklama',
                features: 'Özellikler',
                gallery: 'Galeri',
                seller: 'Satıcı',
                views: 'görüntülenme',
                similarProducts: 'Benzer Ürünler',
                backToList: 'Listeye Dön',
                showMore: 'Daha Fazla Göster',
                addToFavorites: 'Favorilere Ekle',
                share: 'Paylaş',
                askQuestion: 'Soru Sor',
                makeOffer: 'Teklif Ver'
            },
            about: {
                title: 'Fahri Eren Kimdir?',
                subtitle: '25 Yıllık Tecrübe ile Güvenilir İş Ortağınız',
                bio: 'Merhaba, ben Fahri Eren. 1998 yılından bu yana ticaret sektöründe faaliyet göstermekteyim. Müşteri memnuniyetini öncelik olarak belirleyerek, kaliteli ürün ve hizmet sunmayı ilke edindim.',
                experience: 'Tecrübelerim',
                experienceText: 'Emlak, araç alım-satımı, inşaat malzemeleri ticareti ve tarım ürünleri üretimi konularında 25 yıllık deneyime sahibim.',
                mission: 'Misyonum',
                missionText: 'Müşterilerime en kaliteli ürünleri en uygun fiyatlarla sunmak ve uzun vadeli güvene dayalı iş ilişkileri kurmak.',
                vision: 'Vizyonum',
                visionText: 'Türkiye\'nin en güvenilir ticaret platformunu oluşturmak ve sektörde öncü olmak.',
                achievements: 'Başarılarım',
                stats: {
                    years: 'Yıllık Tecrübe',
                    customers: 'Mutlu Müşteri',
                    products: 'Ürün Çeşidi',
                    rating: 'Müşteri Memnuniyeti'
                },
                services: 'Hizmetlerim',
                contactMe: 'Benimle İletişime Geçin',
                downloadCV: 'CV İndir'
            },
            contact: {
                title: 'İletişim',
                subtitle: 'Size nasıl yardımcı olabilirim?',
                form: {
                    name: 'Adınız Soyadınız',
                    email: 'E-posta Adresiniz',
                    phone: 'Telefon Numaranız',
                    subject: 'Konu',
                    message: 'Mesajınız',
                    send: 'Gönder',
                    sending: 'Gönderiliyor...',
                    success: 'Mesajınız başarıyla gönderildi!',
                    error: 'Bir hata oluştu. Lütfen tekrar deneyin.'
                },
                info: {
                    address: 'Adres',
                    phone: 'Telefon',
                    email: 'E-posta',
                    workHours: 'Çalışma Saatleri',
                    weekdays: 'Hafta içi: 08:00 - 19:00',
                    weekend: 'Hafta sonu: 09:00 - 17:00'
                },
                map: 'Harita',
                social: 'Sosyal Medya'
            },
            partners: {
                title: 'İş Ortaklarımız',
                subtitle: 'Güvenilir iş ortaklarımız ile birlikte çalışıyoruz',
                visitWebsite: 'Web Sitesini Ziyaret Et',
                learnMore: 'Daha Fazla Bilgi'
            },
            newsletter: {
                title: 'Haber Bülteni',
                description: 'Yeni ürünler ve fırsatlardan haberdar olmak için abone olun',
                placeholder: 'E-posta adresiniz',
                subscribe: 'Abone Ol',
                subscribing: 'Abone oluyor...',
                success: 'Başarıyla abone oldunuz!',
                error: 'Bir hata oluştu. Lütfen tekrar deneyin.'
            },
            admin: {
                title: 'Admin Paneli',
                subtitle: 'Ürünleri yönetin ve istatistikleri görüntüleyin',
                newProduct: 'Yeni Ürün',
                logout: 'Çıkış',
                totalProducts: 'Toplam Ürün',
                totalViews: 'Toplam Görüntüleme',
                totalValue: 'Toplam Değer',
                mostViewed: 'En Çok Görüntülenen',
                categoryDistribution: 'Kategori Dağılımı',
                products: 'Ürünler',
                search: 'Ürün ara...',
                category: 'Kategori',
                price: 'Fiyat',
                views: 'Görüntüleme',
                date: 'Tarih',
                actions: 'İşlemler',
                edit: 'Düzenle',
                delete: 'Sil',
                noProducts: 'Henüz ürün eklenmemiş',
                noSearchResults: 'Arama kriterlerine uygun ürün bulunamadı',
                deleteConfirm: 'Bu ürünü silmek istediğinizden emin misiniz?',
                deleteError: 'Ürün silinirken hata oluştu',
                addProduct: {
                    title: 'Yeni Ürün Ekle',
                    subtitle: 'Ürün bilgilerini eksiksiz doldurun',
                    basicInfo: 'Temel Bilgiler',
                    titleTr: 'Başlık (Türkçe) *',
                    titleEn: 'Başlık (İngilizce) *',
                    price: 'Fiyat *',
                    priceText: 'Fiyat Metni (Opsiyonel)',
                    category: 'Kategori *',
                    locationTr: 'Konum (Türkçe)',
                    descriptionTitle: 'Açıklama',
                    descriptionTr: 'Açıklama (Türkçe) *',
                    descriptionEn: 'Açıklama (İngilizce) *',
                    images: 'Ürün Görselleri *',
                    features: 'Özellikler',
                    featuresTr: 'Özellikler (Türkçe)',
                    featuresEn: 'Özellikler (İngilizce)',
                    specifications: 'Teknik Özellikler',
                    save: 'Ürünü Kaydet',
                    saving: 'Kaydediliyor...',
                    reset: 'Sıfırla',
                    success: '✅ Ürün başarıyla eklendi!',
                    addFeature: 'Özellik Ekle',
                    addSpec: 'Özellik Ekle',
                    dragImages: 'Görselleri buraya sürükleyin veya tıklayın',
                    imageFormats: 'JPEG, PNG, WebP formatlarında maksimum 10MB',
                    titleRequired: 'Ürün başlığı Türkçe ve İngilizce olarak gerekli',
                    descRequired: 'Ürün açıklaması Türkçe ve İngilizce olarak gerekli',
                    priceRequired: 'Geçerli bir fiyat giriniz',
                    imageRequired: 'En az bir ürün görseli eklemelisiniz',
                    noFeatures: 'Özellik bilgisi bulunmuyor'
                },
                seedData: 'Test Verisi',
                resetViews: 'Görüntülenme Sıfırla',
                refresh: 'Yenile'
            },
            common: {
                loading: 'Yükleniyor...',
                tryAgain: 'Tekrar Dene',
                viewAll: 'Tümünü Görüntüle',
                close: 'Kapat',
                save: 'Kaydet',
                cancel: 'İptal',
                delete: 'Sil',
                edit: 'Düzenle',
                add: 'Ekle',
                back: 'Geri',
                noLocation: 'Konum belirtilmemiş'
            },
            footer: {
                companyDescription: '25 yıllık tecrübe ile güvenilir ticaret ortağınız.',
                quickLinks: 'Hızlı Linkler',
                categories: 'Kategoriler',
                copyright: '© 2024 Fahri Eren. Tüm hakları saklıdır.',
                privacyPolicy: 'Gizlilik Politikası',
                termsOfService: 'Kullanım Şartları'
            }
        },
        en: {
            nav: {
                home: 'Home',
                products: 'Products',
                about: 'About Me',
                contact: 'Contact',
                partners: 'Our Partners'
            },
            hero: {
                title: 'Reliable Trade, Quality Service',
                subtitle: 'Real Estate, Vehicles, Construction Materials and Agricultural Products',
                cta: 'Explore Now',
                search: 'What are you looking for?',
                searchButton: 'Search'
            },
            filters: {
                title: 'Filters',
                category: 'Category',
                priceRange: 'Price Range',
                sortBy: 'Sort By',
                location: 'Location',
                clear: 'Clear',
                apply: 'Apply',
                min: 'Min',
                max: 'Max',
                newest: 'Newest',
                oldest: 'Oldest',
                priceLow: 'Price (Low)',
                priceHigh: 'Price (High)',
                popular: 'Popular'
            },
            categories: {
                all: 'All',
                realestate: 'Real Estate',
                vehicles: 'Vehicles',
                construction: 'Construction Materials',
                farm: 'Farm Products'
            },
            products: {
                title: 'Featured Products',
                new: 'New',
                sale: 'On Sale',
                details: 'Details',
                contact: 'Contact',
                description: 'Description',
                features: 'Features',
                gallery: 'Gallery',
                seller: 'Seller',
                views: 'views',
                similarProducts: 'Similar Products',
                backToList: 'Back to List',
                showMore: 'Show More',
                addToFavorites: 'Add to Favorites',
                share: 'Share',
                askQuestion: 'Ask Question',
                makeOffer: 'Make Offer'
            },
            about: {
                title: 'Who is Fahri Eren?',
                subtitle: 'Your Reliable Business Partner with 25 Years of Experience',
                bio: 'Hello, I am Fahri Eren. I have been operating in the trade sector since 1998. I have adopted the principle of providing quality products and services by prioritizing customer satisfaction.',
                experience: 'My Experience',
                experienceText: 'I have 25 years of experience in real estate, vehicle trading, construction materials trade and agricultural products production.',
                mission: 'My Mission',
                missionText: 'To provide my customers with the highest quality products at the best prices and establish long-term business relationships based on trust.',
                vision: 'My Vision',
                visionText: 'To create Turkey\'s most reliable trading platform and be a leader in the sector.',
                achievements: 'My Achievements',
                stats: {
                    years: 'Years of Experience',
                    customers: 'Happy Customers',
                    products: 'Product Varieties',
                    rating: 'Customer Satisfaction'
                },
                services: 'My Services',
                contactMe: 'Contact Me',
                downloadCV: 'Download CV'
            },
            contact: {
                title: 'Contact',
                subtitle: 'How can I help you?',
                form: {
                    name: 'Your Name',
                    email: 'Your Email',
                    phone: 'Your Phone',
                    subject: 'Subject',
                    message: 'Your Message',
                    send: 'Send',
                    sending: 'Sending...',
                    success: 'Your message has been sent successfully!',
                    error: 'An error occurred. Please try again.'
                },
                info: {
                    address: 'Address',
                    phone: 'Phone',
                    email: 'Email',
                    workHours: 'Working Hours',
                    weekdays: 'Weekdays: 08:00 - 19:00',
                    weekend: 'Weekend: 09:00 - 17:00'
                },
                map: 'Map',
                social: 'Social Media'
            },
            partners: {
                title: 'Our Partners',
                subtitle: 'We work with reliable business partners',
                visitWebsite: 'Visit Website',
                learnMore: 'Learn More'
            },
            newsletter: {
                title: 'Newsletter',
                description: 'Subscribe to stay updated with new products and opportunities',
                placeholder: 'Your email address',
                subscribe: 'Subscribe',
                subscribing: 'Subscribing...',
                success: 'Successfully subscribed!',
                error: 'An error occurred. Please try again.'
            },
            admin: {
                title: 'Admin Panel',
                subtitle: 'Manage products and view statistics',
                newProduct: 'New Product',
                logout: 'Logout',
                totalProducts: 'Total Products',
                totalViews: 'Total Views',
                totalValue: 'Total Value',
                mostViewed: 'Most Viewed',
                categoryDistribution: 'Category Distribution',
                products: 'Products',
                search: 'Search products...',
                category: 'Category',
                price: 'Price',
                views: 'Views',
                date: 'Date',
                actions: 'Actions',
                edit: 'Edit',
                delete: 'Delete',
                noProducts: 'No products added yet',
                noSearchResults: 'No products found matching search criteria',
                deleteConfirm: 'Are you sure you want to delete this product?',
                deleteError: 'Error occurred while deleting product',
                addProduct: {
                    title: 'Add New Product',
                    subtitle: 'Fill in product information completely',
                    basicInfo: 'Basic Information',
                    titleTr: 'Title (Turkish) *',
                    titleEn: 'Title (English) *',
                    price: 'Price *',
                    priceText: 'Price Text (Optional)',
                    category: 'Category *',
                    locationTr: 'Location (Turkish)',
                    descriptionTitle: 'Description',
                    descriptionTr: 'Description (Turkish) *',
                    descriptionEn: 'Description (English) *',
                    images: 'Product Images *',
                    features: 'Features',
                    featuresTr: 'Features (Turkish)',
                    featuresEn: 'Features (English)',
                    specifications: 'Technical Specifications',
                    save: 'Save Product',
                    saving: 'Saving...',
                    reset: 'Reset',
                    success: '✅ Product successfully added!',
                    addFeature: 'Add Feature',
                    addSpec: 'Add Specification',
                    dragImages: 'Drag images here or click',
                    imageFormats: 'JPEG, PNG, WebP formats, maximum 10MB',
                    titleRequired: 'Product title is required in both Turkish and English',
                    descRequired: 'Product description is required in both Turkish and English',
                    priceRequired: 'Please enter a valid price',
                    imageRequired: 'At least one product image must be added',
                    noFeatures: 'No features available'
                },
                seedData: 'Seed Data',
                resetViews: 'Reset Views',
                refresh: 'Refresh'
            },
            common: {
                loading: 'Loading...',
                tryAgain: 'Try Again',
                viewAll: 'View All',
                close: 'Close',
                save: 'Save',
                cancel: 'Cancel',
                delete: 'Delete',
                edit: 'Edit',
                add: 'Add',
                back: 'Back',
                noLocation: 'Location not specified'
            },
            footer: {
                companyDescription: 'Your reliable trading partner with 25 years of experience.',
                quickLinks: 'Quick Links',
                categories: 'Categories',
                copyright: '© 2024 Fahri Eren. All rights reserved.',
                privacyPolicy: 'Privacy Policy',
                termsOfService: 'Terms of Service'
            }
        }
    };

    private constructor() {
    }

    public static getInstance(): TranslationService {
        if (!TranslationService.instance) {
            TranslationService.instance = new TranslationService();
        }
        return TranslationService.instance;
    }

    public setLanguage(language: Language): void {
        this.currentLanguage = language;
    }

    public getLanguage(): Language {
        return this.currentLanguage;
    }

    public translate(key: string): string {
        const keys = key.split('.');
        let value: any = this.translations[this.currentLanguage];

        for (const k of keys) {
            value = value?.[k];
        }

        return value || key;
    }
}

export default TranslationService.getInstance();
