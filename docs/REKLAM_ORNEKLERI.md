# 📱 Reklam Ekleme Örnekleri

Bu dosya, websitenizin farklı sayfalarına reklam ekleme örneklerini içerir.

---

## 📄 Sayfa Bazlı Örnekler

### 1. HomePage - Ana Sayfa Reklamları

```tsx
// src/pages/HomePage.tsx
import AdBanner from '../components/ads/AdBanner';

const HomePage: React.FC = () => {
    return (
        <div className="container mx-auto px-4">
            {/* Üst banner - Yüksek görünürlük */}
            <AdBanner position="top" className="my-4"/>

            {/* Hero section */}
            <HeroSection/>

            {/* İlk içerik arası reklam */}
            <div className="my-8">
                <CategorySection/>
            </div>

            <AdBanner position="inline"/>

            {/* Ürünler */}
            <FeaturedProducts/>

            {/* İkinci içerik arası reklam */}
            <AdBanner position="inline" className="my-12"/>

            {/* Testimonials */}
            <TestimonialsSection/>

            {/* Alt banner */}
            <AdBanner position="bottom"/>
        </div>
    );
};
```

### 2. ProductsPage - Sidebar ile Reklam

```tsx
// src/pages/ProductsPage.tsx
import AdBanner from '../components/ads/AdBanner';

const ProductsPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Sol taraf - Ana içerik */}
                <div className="lg:col-span-9">
                    {/* Üst banner */}
                    <AdBanner position="top"/>

                    {/* Filtreler */}
                    <ProductFilters/>

                    {/* Ürün listesi */}
                    <ProductGrid products={products}/>
                </div>

                {/* Sağ taraf - Sidebar + Reklam */}
                <div className="lg:col-span-3">
                    <AdBanner position="sidebar"/>

                    {/* Diğer sidebar içerikleri */}
                    <PopularProducts/>
                </div>
            </div>
        </div>
    );
};
```

### 3. BlogPage - İçerik Arası Reklamlar

```tsx
// src/pages/BlogPage.tsx (varsayımsal)
import AdBanner from '../components/ads/AdBanner';

const BlogPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 max-w-4xl">
            <article className="prose lg:prose-xl">
                {/* Blog başlığı */}
                <h1>{post.title}</h1>

                {/* İlk paragraf */}
                <p>{post.intro}</p>

                {/* İlk reklam - 1. paragraftan sonra */}
                <AdBanner position="inline"/>

                {/* İçerik devam */}
                <div dangerouslySetInnerHTML={{__html: post.content}}/>

                {/* İkinci reklam - İçerik ortasında */}
                <AdBanner position="inline"/>

                {/* Kalan içerik */}
                <p>{post.conclusion}</p>

                {/* Son reklam */}
                <AdBanner position="bottom"/>
            </article>
        </div>
    );
};
```

---

## 🎯 Özel Kullanımlar

### Koşullu Reklam Gösterimi

```tsx
import {ADS_CONFIG} from '../config/adsConfig';

const MyComponent = () => {
    // Sadece desktop'ta sidebar reklamı göster
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            {/* Sadece 768px üstünde göster */}
            {windowWidth >= ADS_CONFIG.MIN_WIDTH.SIDEBAR && (
                <AdBanner position="sidebar"/>
            )}
        </div>
    );
};
```

### Her N Üründe Bir Reklam

```tsx
const ProductGrid = ({products}) => {
    return (
        <div>
            {products.map((product, index) => (
                <div key={product.id}>
                    <ProductCard product={product}/>

                    {/* Her 6 üründe bir reklam göster */}
                    {(index + 1) % 6 === 0 && (
                        <div className="col-span-full my-6">
                            <AdBanner position="inline"/>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
```

### Scroll'a Göre Reklam

```tsx
const ScrollAd = () => {
    const [showAd, setShowAd] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Sayfa %50 scroll edildiyse reklamı göster
            const scrolled = window.scrollY;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            if (scrolled > total * 0.5) {
                setShowAd(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return showAd ? <AdBanner position="inline"/> : null;
};
```

---

## 🎨 Stil Özelleştirmeleri

### Custom CSS ile Reklam Tasarımı

```css
/* src/styles/ads.css */

/* Reklam container */
.adsense-container {
    margin: 1.5rem auto;
    padding: 1rem;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
}

/* Reklam etiketi */
.ad-banner::before {
    content: 'Sponsorlu';
    display: block;
    font-size: 0.75rem;
    color: #9ca3af;
    text-align: center;
    margin-bottom: 0.5rem;
}

/* Sticky sidebar reklamı */
.ad-banner-sidebar {
    position: sticky;
    top: 6rem;
    max-height: calc(100vh - 8rem);
}

/* Mobile'da gizle */
@media (max-width: 768px) {
    .ad-banner-sidebar {
        display: none;
    }
}

/* Loading skeleton */
.ad-loading {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}
```

---

## ⚙️ Layout'a Global Reklam Ekleme

### Layout Component'ine Ekleme

```tsx
// src/components/layout/Layout.tsx
import AdBanner from '../ads/AdBanner';

const Layout: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header/>

            {/* Her sayfanın üstünde banner */}
            <div className="container mx-auto px-4 py-4">
                <AdBanner position="top"/>
            </div>

            <main className="flex-1">
                {children}
            </main>

            {/* Her sayfanın altında banner */}
            <div className="container mx-auto px-4 py-4">
                <AdBanner position="bottom"/>
            </div>

            <Footer/>
        </div>
    );
};
```

---

## 🔧 Test Modu

### Development'ta Test Reklamları

```tsx
// src/components/ads/AdBanner.tsx
import {TEST_MODE} from '../../config/adsConfig';

const AdBanner = ({position}) => {
    if (TEST_MODE) {
        // Test reklamı göster
        return (
            <div className="bg-yellow-100 border border-yellow-400 p-4 rounded text-center">
                <p className="text-sm font-semibold text-yellow-800">
                    TEST REKLAM ALANI ({position})
                </p>
                <p className="text-xs text-yellow-600 mt-1">
                    Production'da gerçek reklam gösterilecek
                </p>
            </div>
        );
    }

    // Gerçek reklam
    return <GoogleAdSense adSlot={config.adSlot}/>;
};
```

---

## 📊 Performans İzleme

### AdSense Performance Hook

```tsx
// src/hooks/useAdPerformance.ts
import {useEffect} from 'react';

export const useAdPerformance = () => {
    useEffect(() => {
        // AdSense performans tracking
        if (window.adsbygoogle) {
            window.adsbygoogle.push({
                google_ad_client: "ca-pub-XXXXXXXXXXXXXXXX",
                enable_page_level_ads: true,
                overlays: {bottom: true}
            });
        }
    }, []);

    const trackAdClick = (adPosition: string) => {
        // Analytics'e gönder
        if (window.gtag) {
            window.gtag('event', 'ad_click', {
                ad_position: adPosition,
                timestamp: new Date().toISOString()
            });
        }
    };

    return {trackAdClick};
};
```

---

## ✅ Checklist - Reklam Ekleme

Her sayfa için:

- [ ] `AdBanner` component import edildi
- [ ] Stratejik yerlere reklam eklendi (max 3-4 per page)
- [ ] Mobile responsive kontrol edildi
- [ ] AdSense Publisher ID güncellendi
- [ ] Test edildi (hem dev hem prod)
- [ ] Performans ölçüldü (sayfa hızı)
- [ ] User experience kontrol edildi

---

🎉 **Artık reklamlarınız hazır! İyi kazançlar!**