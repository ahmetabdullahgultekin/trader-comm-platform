import type {Language} from '../types';

// Translation Service - Singleton Pattern
export class TranslationService {
    private static instance: TranslationService;
    private currentLanguage: Language = 'tr';

    private translations = {
        tr: {
            home: {
                seo: {
                    title: 'Fahri Eren - Güvenilir Ticaret Platformu',
                    description: 'Emlak, araç, tarım ürünleri ve inşaat malzemelerinde güvenilir hizmet.'
                },
                categories: {
                    title: 'Kategori Seçin',
                    subtitle: 'İhtiyacınıza uygun kategoriyi keşfedin'
                },
                features: {
                    title: 'Neden Fahri Eren?',
                    subtitle: 'Güvenilir ticaret ortağınız olmanın avantajları'
                },
                services: {
                    title: 'Hizmetlerimiz',
                    subtitle: 'Geniş hizmet yelpazemizle ihtiyaçlarınıza çözüm'
                },
                cta: {
                    title: 'Projeleriniz için Destek Alın',
                    description: 'Uzman ekibimiz size en uygun çözümü sunmak için hazır',
                    responseTime: 'Ortalama yanıt süresi: 2 saat'
                },
                featuredProducts: {
                    title: 'Öne Çıkan Ürünler',
                    subtitle: 'En popüler ve güncel ürünlerimizi keşfedin'
                },
                viewAllProducts: 'Tüm Ürünleri Görüntüle'
            },
            stats: {
                title: 'Rakamlarla Başarımız',
                subtitle: 'Yılların getirdiği deneyim ve güven',
                yearsExperience: 'Yıl Tecrübe',
                experienceDesc: 'Sektördeki deneyim süremiz',
                happyCustomers: 'Mutlu Müşteri',
                customersDesc: 'Memnun kaldığımız müşteri sayımız',
                completedProjects: 'Tamamlanan Proje',
                projectsDesc: 'Başarıyla sonuçlanan projelerimiz',
                customerRating: 'Müşteri Değerlendirmesi',
                ratingDesc: '5 üzerinden ortalama puanımız',
                responseTime: 'Ortalama Yanıt Süresi',
                responseDesc: 'Müşteri mesajlarına yanıt süremiz',
                totalDeals: 'Toplam İşlem Hacmi',
                dealsDesc: 'Gerçekleştirilen toplam ticaret hacmi',
                ctaTitle: 'Bize Ulaşın',
                ctaDescription: 'Projeleriniz için hemen iletişime geçin',
                callNow: 'Hemen Arayın'
            },
            features: {
                trusted: {
                    title: 'Güvenilir Hizmet',
                    description: '15+ yıllık deneyim ile güven tabanlı ticaret anlayışı'
                },
                experience: {
                    title: 'Uzman Ekip',
                    description: 'Alanında uzman kadromuz ile profesyonel destek'
                },
                customer: {
                    title: 'Müşteri Memnuniyeti',
                    description: '%100 müşteri memnuniyeti odaklı hizmet anlayışı'
                },
                quality: {
                    title: 'Kaliteli Ürünler',
                    description: 'Titizlikle seçilmiş, kaliteli ve uygun fiyatlı ürünler'
                }
            },
            testimonials: {
                title: 'Müşteri Yorumları',
                subtitle: 'Memnun müşterilerimizin deneyimleri',
                overallRating: 'Genel Değerlendirme',
                happyCustomers: 'Mutlu Müşteri',
                completedProjects: 'Tamamlanan Proje',
                yearsExperience: 'Yıl Deneyim',
                ctaTitle: 'Siz de memnun müşterilerimize katılın',
                ctaDescription: 'Güvenilir hizmetimizi deneyimlemek için hemen iletişime geçin',
                contactWhatsapp: 'WhatsApp ile İletişim',
                callNow: 'Hemen Ara'
            },
            nav: {
                home: 'Ana Sayfa',
                products: 'Ürünler',
                about: 'Hakkımda',
                contact: 'İletişim',
                partners: 'İş Ortaklarımız'
            },
            hero: {
                title: 'Güvenilir Ticaret, Kaliteli Hizmet',
                subtitle: 'Emlak,Tarla, Bahçe, Araç, İnşaat',
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
                realestateDesc: 'Ev, iş yeri, arsa ve yatırım amaçlı gayrimenkuller',
                vehicles: 'Araçlar',
                vehiclesDesc: 'Otomobil, motosiklet, ticari araçlar ve yedek parçalar',
                construction: 'İnşaat Malzemeleri',
                constructionDesc: 'Yapı malzemeleri, el aletleri ve inşaat ekipmanları',
                farm: 'Çiftlik Ürünleri',
                agriculture: 'Tarım',
                agricultureDesc: 'Tarım ürünleri, tohum, gübre ve çiftlik hayvanları'
            },
            products: {
                title: 'Öne Çıkan Ürünler',
                comingSoon: 'Yakında Geliyor',
                comingSoonDesc: 'Yeni ürünlerimiz çok yakında sizlerle',
                found: 'ürün bulundu',
                new: 'Yeni',
                sale: 'İndirimde',
                details: 'Detaylar',
                detailsView: 'Detayları Gör',
                contact: 'İletişime Geç',
                call: 'Ara',
                description: 'Açıklama',
                features: 'Özellikler',
                gallery: 'Galeri',
                seller: 'Satıcı',
                views: 'görüntülenme',
                viewCount: 'görüntüleme',
                similarProducts: 'Benzer Ürünler',
                backToList: 'Listeye Dön',
                showMore: 'Daha Fazla Göster',
                addToFavorites: 'Favorilere Ekle',
                share: 'Paylaş',
                askQuestion: 'Soru Sor',
                makeOffer: 'Teklif Ver',
                inStock: 'Stokta',
                outOfStock: 'Tükendi',
                view: 'Görüntüle',
                noProducts: 'Ürün bulunamadı',
                addFirst: 'İlk Ürünü Ekle',
                showing: 'gösteriliyor'
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
                call: 'Hemen Ara',
                phone: 'Telefon',
                whatsapp: 'WhatsApp',
                whatsapp_desc: 'Hızlı iletişim için WhatsApp',
                email: 'E-posta Gönder',
                working_hours: 'Çalışma Saatleri',
                description: 'Sorularınız için bize ulaşın',
                callNow: 'Hemen Ara',
                callAnytime: 'İstediğiniz zaman arayın',
                emailUs: 'Bize e-posta gönderin',
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
                product: 'Ürün',
                productsManagement: 'Ürün Yönetimi',
                viewManageProducts: 'Tüm ürünleri görüntüle ve yönet',
                search: 'Ürün ara...',
                category: 'Kategori',
                price: 'Fiyat',
                views: 'Görüntüleme',
                date: 'Tarih',
                actions: 'İşlemler',
                status: 'Durum',
                active: 'Aktif',
                inactive: 'Pasif',
                edit: 'Düzenle',
                delete: 'Sil',
                view: 'Görüntüle',
                noProducts: 'Henüz ürün eklenmemiş',
                noSearchResults: 'Arama kriterlerine uygun ürün bulunamadı',
                deleteConfirm: 'Bu ürünü silmek istediğinizden emin misiniz?',
                deleteError: 'Ürün silinirken hata oluştu',
                dashboard: 'Dashboard',
                welcome: 'Hoş geldiniz',
                homePage: 'Ana Sayfa',
                recentProducts: 'Son Eklenen Ürünler',
                viewAll: 'Tümünü Gör',
                totalFavorites: 'Favorilere Eklenme',
                contactRequests: 'İletişim Talebi',
                quickActions: {
                    newProduct: {
                        title: 'Yeni Ürün',
                        desc: 'Yeni bir ürün ekleyin'
                    },
                    products: {
                        title: 'Ürünler',
                        desc: 'Tüm ürünleri yönetin'
                    },
                    customers: {
                        title: 'Müşteriler',
                        desc: 'Müşteri listesini görüntüleyin'
                    },
                    reports: {
                        title: 'Raporlar',
                        desc: 'İstatistikleri inceleyin'
                    }
                },
                login: {
                    title: 'Admin Girişi',
                    subtitle: 'Yönetim paneline erişmek için giriş yapın',
                    email: 'E-posta',
                    password: 'Şifre',
                    submit: 'Giriş Yap',
                    backHome: 'Ana Sayfaya Dön',
                    securityNote: 'Güvenlik notu: Şifrenizi kimseyle paylaşmayın'
                },
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
                viewMore: 'Daha Fazla Göster',
                viewDetails: 'Detayları Görüntüle',
                goBack: 'Geri Dön',
                close: 'Kapat',
                save: 'Kaydet',
                cancel: 'İptal',
                delete: 'Sil',
                error: 'Bir hata oluştu',
                edit: 'Düzenle',
                add: 'Ekle',
                back: 'Geri',
                noLocation: 'Konum belirtilmemiş'
            },
            footer: {
                companyDescription: '25 yıllık tecrübe ile güvenilir ticaret ortağınız.',
                quickLinks: 'Hızlı Linkler',
                categories: 'Kategoriler',
                services: 'Hizmetlerimiz',
                copyright: '© 2024 Fahri Eren. Tüm hakları saklıdır.',
                allRightsReserved: 'Tüm hakları saklıdır',
                yearsExperience: 'Yıllık Deneyim',
                happyCustomers: 'Mutlu Müşteri',
                customers: 'Müşteri',
                customerRating: 'Müşteri Değerlendirmesi',
                cookiePolicy: 'Çerez Politikası',
                secureTransactions: 'Güvenli İşlemler',
                trustedBy: 'Güvenilen Platform',
                privacyPolicy: 'Gizlilik Politikası',
                termsOfService: 'Kullanım Şartları'
            },
            pwa: {
                installTitle: 'Uygulamayı Yükle',
                installDesc: 'Hızlı erişim için uygulamayı cihazınıza yükleyin',
                install: 'Yükle',
                later: 'Daha Sonra'
            }
        },
        en: {
            home: {
                seo: {
                    title: 'Fahri Eren - Reliable Trading Platform',
                    description: 'Reliable service in real estate, vehicles, agricultural products and construction materials.'
                },
                categories: {
                    title: 'Choose Category',
                    subtitle: 'Discover the category that suits your needs'
                },
                features: {
                    title: 'Why Fahri Eren?',
                    subtitle: 'The advantages of being your reliable trading partner'
                },
                services: {
                    title: 'Our Services',
                    subtitle: 'Solutions for your needs with our wide range of services'
                },
                cta: {
                    title: 'Get Support for Your Projects',
                    description: 'Our expert team is ready to offer you the most suitable solution',
                    responseTime: 'Average response time: 2 hours'
                },
                featuredProducts: {
                    title: 'Featured Products',
                    subtitle: 'Discover our most popular and current products'
                },
                viewAllProducts: 'View All Products'
            },
            stats: {
                title: 'Our Success in Numbers',
                subtitle: 'Experience and trust brought by years',
                yearsExperience: 'Years of Experience',
                experienceDesc: 'Our experience in the sector',
                happyCustomers: 'Happy Customers',
                customersDesc: 'Number of customers we are satisfied with',
                completedProjects: 'Completed Projects',
                projectsDesc: 'Our successfully completed projects',
                customerRating: 'Customer Rating',
                ratingDesc: 'Our average score out of 5',
                responseTime: 'Average Response Time',
                responseDesc: 'Response time to customer messages',
                totalDeals: 'Total Transaction Volume',
                dealsDesc: 'Total trading volume realized',
                ctaTitle: 'Contact Us',
                ctaDescription: 'Contact us immediately for your projects',
                callNow: 'Call Now'
            },
            features: {
                trusted: {
                    title: 'Reliable Service',
                    description: 'We provide reliable service with our years of experience and customer satisfaction focus'
                },
                experience: {
                    title: 'Expert Knowledge',
                    description: 'We offer solutions with our extensive knowledge and experience in every field'
                },
                customer: {
                    title: 'Customer Focus',
                    description: 'We prioritize customer satisfaction and build long-term relationships'
                },
                quality: {
                    title: 'Quality Products',
                    description: 'We offer high quality products at affordable prices'
                }
            },
            testimonials: {
                title: 'Customer Reviews',
                subtitle: 'What our customers say about us',
                overallRating: 'Overall Rating',
                happyCustomers: 'Happy Customers',
                completedProjects: 'Completed Projects',
                yearsExperience: 'Years of Experience',
                ctaTitle: 'Contact Us',
                ctaDescription: 'Get in touch for your projects',
                contactWhatsapp: 'Contact via WhatsApp',
                callNow: 'Call Now'
            },
            footer: {
                allRightsReserved: 'All Rights Reserved',
                yearsExperience: '15+ Years of Experience',
                happyCustomers: 'Happy Customers',
                services: 'Services',
                customers: 'Customers',
                customerRating: 'Customer Rating',
                cookiePolicy: 'Cookie Policy',
                secureTransactions: 'Secure Transactions',
                trustedBy: 'Trusted by'
            },
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
                realestateDesc: 'Houses, land, commercial properties and investment opportunities',
                vehicles: 'Vehicles',
                vehiclesDesc: 'Cars, commercial vehicles and automotive products',
                agriculture: 'Agricultural Products',
                agricultureDesc: 'Fresh products, agricultural tools and machinery',
                construction: 'Construction Materials',
                constructionDesc: 'Construction materials, tools and equipment',
                farm: 'Farm Products'
            },
            products: {
                title: 'Products',
                description: 'Quality products and reliable service',
                comingSoon: 'Coming Soon',
                comingSoonDesc: 'Our new products will be with you very soon',
                found: 'products found',
                new: 'New',
                sale: 'On Sale',
                details: 'Details',
                detailsView: 'View Details',
                contact: 'Contact',
                call: 'Call',
                description: 'Description',
                features: 'Features',
                gallery: 'Gallery',
                seller: 'Seller',
                views: 'views',
                viewCount: 'views',
                similarProducts: 'Similar Products',
                backToList: 'Back to List',
                showMore: 'Show More',
                addToFavorites: 'Add to Favorites',
                share: 'Share',
                askQuestion: 'Ask Question',
                makeOffer: 'Make Offer',
                inStock: 'In Stock',
                outOfStock: 'Out of Stock',
                view: 'View',
                noProducts: 'No products found',
                addFirst: 'Add First Product',
                showing: 'showing'
            },
            common: {
                loading: 'Loading...',
                tryAgain: 'Try Again',
                viewAll: 'View All',
                viewMore: 'View More',
                viewDetails: 'View Details',
                goBack: 'Go Back',
                close: 'Close',
                save: 'Save',
                cancel: 'Cancel',
                delete: 'Delete',
                error: 'An error occurred',
                edit: 'Edit',
                add: 'Add',
                back: 'Back',
                noLocation: 'No location specified'
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
                years: '15+ Years',
                customers: '500+ Customers',
                rating: '4.9/5 Rating',
                contactTitle: 'Contact Me',
                contactDesc: 'Contact me for your projects and business partnerships',
                services: 'My Services',
                contactMe: 'Contact Me',
                downloadCV: 'Download CV'
            },
            contact: {
                title: 'Contact',
                subtitle: 'How can I help you?',
                call: 'Call',
                callNow: 'Call Now',
                callAnytime: 'Call Anytime',
                email: 'Send Email',
                emailUs: 'Email Us',
                whatsapp: 'WhatsApp',
                whatsapp_desc: 'Contact us quickly via WhatsApp',
                phone: 'Phone',
                working_hours: 'Working Hours',
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
            },
            pwa: {
                installTitle: 'Install App',
                installDesc: 'Install the app to your device for quick access',
                install: 'Install',
                later: 'Later'
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
