# 🎯 Website'e Reklam Ekleme Rehberi

Bu rehber, websitenize **Google AdSense** reklamları eklemeniz için adım adım talimatlar içerir.

---

## 📋 İçindekiler

1. [Google AdSense Hesabı Oluşturma](#1-google-adsense-hesabı-oluşturma)
2. [Website'i AdSense'e Ekleme](#2-websitei-adsensee-ekleme)
3. [Reklam Birimlerini Oluşturma](#3-reklam-birimlerini-oluşturma)
4. [Code Entegrasyonu](#4-code-entegrasyonu)
5. [Alternatif Reklam Ağları](#5-alternatif-reklam-ağları)
6. [En İyi Pratikler](#6-en-iyi-pratikler)

---

## 1️⃣ Google AdSense Hesabı Oluşturma

### Adım 1: AdSense'e Kaydolun

1. https://www.google.com/adsense adresine gidin
2. Gmail hesabınızla giriş yapın
3. "Get Started" butonuna tıklayın
4. Website URL'inizi girin: `https://fahrieren.com`
5. Ödeme bilgilerinizi ve vergi bilgilerinizi doldurun

### Adım 2: Onay Bekleyin

- Google, sitenizi inceleyecek (1-7 gün sürer)
- Email ile onay gelecek
- Onay gelene kadar test reklamları gösterilir

---

## 2️⃣ Website'i AdSense'e Ekleme

### AdSense Code'u HTML'e Ekleme

**Dosya:** `public/index.html`

```html
<!DOCTYPE html>
<html lang="tr">
<head>
    <!-- Mevcut meta taglar -->
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <!-- Google AdSense Script - HEAD içine ekleyin -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
            crossorigin="anonymous"></script>

    <!-- Diğer scriptler -->
</head>
<body>
<!-- Site içeriği -->
</body>
</html>
```

**⚠️ ÖNEMLİ:** `ca-pub-XXXXXXXXXXXXXXXX` yerine kendi Publisher ID'nizi yazın!

---

## 3️⃣ Reklam Birimlerini Oluşturma

### AdSense Dashboard'da:

1. **Ads** → **By ad unit** → **Display ads**
2. Reklam tipi seçin:
    - **Square/Rectangle** - Sidebar için ideal
    - **Horizontal** - Header/Footer için
    - **Vertical** - Yan panel için
    - **Responsive** - Otomatik boyutlandırma

3. Her reklam için **Ad slot ID** alın
4. Bu ID'leri component'lerde kullanın

---

## 4️⃣ Code Entegrasyonu

### Otomatik Yerleştirme (Kolay Yöntem)

**Dosya:** `src/components/ads/GoogleAdSense.tsx` (Zaten hazır!)

```tsx
// Publisher ID'nizi güncelleyin:
data - ad - client = "ca-pub-XXXXXXXXXXXXXXXX" // BURAYA KENDİ ID'NİZİ YAZIN
```

### Reklam Eklemek İçin Örnekler:

#### Örnek 1: HomePage'e Reklam Eklemek

```tsx
import AdBanner from '../components/ads/AdBanner';

// HomePage içinde:
<div className="container mx-auto">
    {/* Üst banner */}
    <AdBanner position="top"/>

    {/* İçerik */}
    <HeroSection/>

    {/* İçerik arası reklam */}
    <AdBanner position="inline"/>

    <ProductsSection/>
</div>
```

#### Örnek 2: ProductsPage'e Sidebar Reklamı

```tsx
<div className="grid grid-cols-12 gap-6">
    {/* Sol taraf - Ürünler */}
    <div className="col-span-9">
        <ProductGrid/>
    </div>

    {/* Sağ taraf - Reklam */}
    <div className="col-span-3">
        <AdBanner position="sidebar"/>
    </div>
</div>
```

#### Örnek 3: Blog Posts Arasına Reklam

```tsx
{
    posts.map((post, index) => (
        <div key={post.id}>
            <BlogPost post={post}/>

            {/* Her 3 postta bir reklam */}
            {(index + 1) % 3 === 0 && (
                <AdBanner position="inline"/>
            )}
        </div>
    ))
}
```

---

## 5️⃣ Alternatif Reklam Ağları

### 1. **Google AdSense**

- ✅ En popüler
- ✅ Yüksek ödeme
- ⚠️ Onay süreci var
- 💰 CPC/CPM bazlı

### 2. **Media.net**

- ✅ Yahoo/Bing ağı
- ✅ AdSense'e alternatif
- 💰 Contextual ads

### 3. **PropellerAds**

- ✅ Onay kolay
- ✅ Türkiye destekli
- 💰 Push notifications, pop-unders

### 4. **Adsterra**

- ✅ Minimum traffic yok
- ✅ Hemen başla
- 💰 CPM bazlı

### 5. **Ezoic** (İleri Seviye)

- ✅ AI optimizasyonu
- ✅ Yüksek kazanç
- ⚠️ 10k+ visitor gerekli

---

## 6️⃣ En İyi Pratikler

### ✅ Yapılması Gerekenler:

1. **Stratejik Yerleşim**
    - Header/Footer'da banner reklamlar
    - Sidebar'da dikey reklamlar
    - İçerik aralarında inline reklamlar

2. **Kullanıcı Deneyimi**
    - Reklamlar içeriği bölmemeli
    - Mobilde responsive olmalı
    - Yavaşlatmamalı

3. **Optimizasyon**
    - A/B testing yapın
    - CTR'leri izleyin
    - Düşük performanslı reklamları kaldırın

### ❌ Yapılmaması Gerekenler:

1. ⛔ Çok fazla reklam (sayfa başına max 3-4)
2. ⛔ Önemli butonların yanına reklam
3. ⛔ Otomatik tıklama teşvik etme
4. ⛔ Başlık/menü üstüne reklam

---

## 📊 Reklam Yerleşim Önerileri

### Yüksek Kazanç İçin Reklam Pozisyonları:

```
┌─────────────────────────────────────────┐
│  HEADER (Site başlığı)                  │
├─────────────────────────────────────────┤
│  🎯 TOP BANNER (728x90)                  │ ← En yüksek CTR
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────┐  ┌──────────────────┐ │
│  │ SIDEBAR AD  │  │   CONTENT        │ │
│  │ (300x250)   │  │                  │ │
│  │             │  │  🎯 INLINE AD     │ │ ← İyi performans
│  │  Sticky     │  │  (Responsive)    │ │
│  │             │  │                  │ │
│  └─────────────┘  └──────────────────┘ │
│                                         │
├─────────────────────────────────────────┤
│  🎯 BOTTOM BANNER (728x90)               │ ← Orta performans
└─────────────────────────────────────────┘
```

---

## 🚀 Hızlı Başlangıç (5 Dakika)

1. **AdSense ID'nizi alın**
2. `src/components/ads/GoogleAdSense.tsx` dosyasını açın
3. `ca-pub-XXXXXXXXXXXXXXXX` yerine ID'nizi yazın
4. İstediğiniz sayfaya `<AdBanner position="top" />` ekleyin
5. Build alın: `npm run build`
6. Deploy edin!

---

## 💰 Gelir Tahmini

| Traffic (Aylık)  | Ortalama Gelir (TL) |
|------------------|---------------------|
| 1,000 ziyaret    | 50-150 TL           |
| 10,000 ziyaret   | 500-1,500 TL        |
| 50,000 ziyaret   | 2,500-7,500 TL      |
| 100,000+ ziyaret | 10,000+ TL          |

*Not: Niche, CPC oranı ve coğrafyaya göre değişir*

---

## 📞 Destek

Sorunlarla karşılaşırsanız:

1. [AdSense Help Center](https://support.google.com/adsense)
2. [AdSense Community](https://support.google.com/adsense/community)
3. Email: adsense-support@google.com

---

## ✅ Checklist

- [ ] AdSense hesabı oluşturuldu
- [ ] Site eklendi ve onaylandı
- [ ] Publisher ID alındı
- [ ] AdSense script HTML'e eklendi
- [ ] Reklam birimleri oluşturuldu
- [ ] Component'lere ID'ler yazıldı
- [ ] Test edildi
- [ ] Deploy edildi
- [ ] İlk reklamlar görünüyor

---

🎉 **Tebrikler! Artık sitenizden reklam geliri elde edebilirsiniz!**