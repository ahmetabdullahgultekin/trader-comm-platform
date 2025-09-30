# 🚀 Reklam Sistemi - Hızlı Başlangıç Rehberi

5 dakikada reklam sistemini aktif edin!

---

## ⚡ Adım Adım Kurulum

### 1️⃣ Google AdSense Hesabı Oluşturun

1. https://www.google.com/adsense adresine gidin
2. Gmail hesabınızla giriş yapın
3. **"Get Started"** butonuna tıklayın
4. Gerekli bilgileri doldurun:
    - Website URL: `https://fahrieren.com`
    - Email adresi
    - Ödeme bilgileri
    - Vergi bilgileri

### 2️⃣ Site Doğrulaması

Google size bir kod verecek. İki yöntemden birini kullanın:

**Yöntem A: Otomatik (Önerilen)**

```
Google AdSense dashboard'da "Auto ads" seçeneğini açın
Kod otomatik olarak sitenize eklenir
```

**Yöntem B: Manuel**

```
Verilen kodu public/index.html dosyasının <head> bölümüne ekleyin
```

### 3️⃣ Publisher ID'nizi Alın

AdSense dashboard'dan:

- Sol menüden **"Account"** → **"Account information"**
- **Publisher ID** kopyalayın (ca-pub-1234567890123456 formatında)

### 4️⃣ Kodu Güncelleyin

#### Dosya 1: `public/index.html`

```html
<!-- AdSense script'in comment işaretlerini kaldırın -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
        crossorigin="anonymous"></script>
```

**⚠️ ÖNEMLİ:** `ca-pub-1234567890123456` yerine KENDİ ID'NİZİ yazın!

#### Dosya 2: `src/components/ads/GoogleAdSense.tsx`

Line 53'teki şu satırı bulun:

```tsx
data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
```

Kendi Publisher ID'nizle değiştirin:

```tsx
data-ad-client="ca-pub-1234567890123456"
```

#### Dosya 3: `src/config/adsConfig.ts`

Line 11'deki şu satırı bulun:

```tsx
PUBLISHER_ID: 'ca-pub-XXXXXXXXXXXXXXXX',
```

Kendi Publisher ID'nizle değiştirin:

```tsx
PUBLISHER_ID: 'ca-pub-1234567890123456',
```

### 5️⃣ Reklam Birimleri Oluşturun

AdSense dashboard'da:

1. Sol menüden **"Ads"** → **"By ad unit"**
2. **"Display ads"** seçin
3. 4 farklı reklam birimi oluşturun:

| Ad Unit Adı    | Type       | Size       | Kullanım Yeri |
|----------------|------------|------------|---------------|
| Top Banner     | Display    | Horizontal | Sayfa üstü    |
| Sidebar        | Display    | Vertical   | Yan panel     |
| Inline Content | In-article | Responsive | İçerik arası  |
| Bottom Banner  | Display    | Horizontal | Sayfa altı    |

4. Her birimin **Ad slot ID**'sini kopyalayın

### 6️⃣ Ad Slot ID'lerini Güncelleyin

`src/config/adsConfig.ts` dosyasını açın:

```tsx
SLOTS: {
    HOME_TOP_BANNER: '1234567890',      // ← Top Banner slot ID
    HOME_INLINE: '1122334455',          // ← Inline Content slot ID
    HOME_SIDEBAR: '0987654321',         // ← Sidebar slot ID
    // ... diğer slotlar
    FOOTER_BANNER: '5544332211'         // ← Bottom Banner slot ID
}
```

### 7️⃣ Reklamları Sayfaya Ekleyin

#### HomePage'e Reklam Eklemek:

`src/pages/HomePage.tsx` dosyasını açın ve import edin:

```tsx
import AdBanner from '../components/ads/AdBanner';
```

İstediğiniz yere ekleyin:

```tsx
const HomePage = () => {
    return (
        <div>
            {/* Sayfa üstünde banner */}
            <AdBanner position="top" />

            <HeroSection />

            {/* İçerik arası */}
            <AdBanner position="inline" />

            <ProductsSection />

            {/* Sayfa altında */}
            <AdBanner position="bottom" />
        </div>
    );
};
```

### 8️⃣ Test Edin

```bash
# Development modda çalıştırın
npm run dev

# Tarayıcıda açın: http://localhost:5173
```

**Not:** İlk 1-2 saat boş alan görebilirsiniz. Bu normaldir. Google reklamları onayladıktan sonra görünmeye başlar.

### 9️⃣ Deploy Edin

```bash
# Build alın
npm run build

# Deploy edin (hosting servisinize göre değişir)
# Örnek: Firebase
firebase deploy

# Örnek: Vercel
vercel --prod
```

### 🔟 AdSense'de Site Onayını Bekleyin

- Google sitenizi inceleyecek (1-7 gün)
- Email ile onay gelecek
- Onaylandıktan sonra gerçek reklamlar gösterilmeye başlar

---

## 📍 Hızlı Reklam Pozisyonları

### Önerilen Yerleşim:

```tsx
// HomePage - Ana sayfa
<AdBanner position="top" />         // Üst banner
<AdBanner position="inline" />      // İçerik arası
<AdBanner position="bottom" />      // Alt banner

// ProductsPage - 2 sütunlu layout
<div className="grid grid-cols-12 gap-6">
    <div className="col-span-9">
        <AdBanner position="top" />
        <ProductGrid />
    </div>
    <div className="col-span-3">
        <AdBanner position="sidebar" />  // Yan panel
    </div>
</div>

// BlogPage - İçerik ağırlıklı
<article>
    <h1>{title}</h1>
    <AdBanner position="inline" />       // 1. paragraftan sonra
    <p>{content}</p>
    <AdBanner position="inline" />       // Ortada
    <p>{moreContent}</p>
</article>
```

---

## 🎯 Gelir Maksimizasyonu İpuçları

### ✅ Yapılması Gerekenler:

1. **Stratejik Yerleşim**
    - İlk ekranda (above the fold) en az 1 reklam
    - İçerik aralarında doğal yerleşim
    - Sidebar'da sticky (yapışkan) reklam

2. **Reklam Sayısı**
    - Ana sayfa: 3-4 reklam
    - İçerik sayfaları: 4-6 reklam
    - Blog yazıları: 5-8 reklam (uzun içerikte)

3. **Responsive Design**
    - Mobile'da daha az reklam
    - Tablet'te orta yoğunluk
    - Desktop'ta maksimum

### ❌ Yapılmaması Gerekenler:

1. ⛔ Sayfa başına 10+ reklam (ceza alırsınız)
2. ⛔ Butonların yanına reklam
3. ⛔ Kullanıcıyı yanıltıcı yerleşim
4. ⛔ Otomatik tıklama teşviki

---

## 🔍 Sorun Giderme

### Reklamlar Görünmüyor?

**1. Publisher ID'yi kontrol edin**

```bash
# Dosyalarda ara
grep -r "ca-pub-XXXXXXXXXXXXXXXX" src/
```

Eğer bulursanız, değiştirmeyi unutmuşsunuz demektir!

**2. AdSense script yüklendi mi?**

Tarayıcıda F12 → Console:

```javascript
console.log(window.adsbygoogle);
// [] veya [...] görmeli
// undefined ise script yüklenmemiş
```

**3. Ad blocker kapalı mı?**

Test ederken ad blocker'ı kapatın!

**4. Hesap onaylandı mı?**

AdSense dashboard'da "Payment" sekmesine bakın.
"Your account is ready" yazıyorsa onaylanmış.

---

## 💰 Gelir Beklentileri

### Trafik Bazlı Tahminler (Aylık):

| Günlük Ziyaretçi | Aylık Ziyaret | Tahmini Gelir (₺) |
|------------------|---------------|-------------------|
| 100              | 3,000         | 150-300           |
| 500              | 15,000        | 750-1,500         |
| 1,000            | 30,000        | 1,500-3,000       |
| 5,000            | 150,000       | 7,500-15,000      |
| 10,000           | 300,000       | 15,000-30,000     |

**Not:**

- CPC (tıklama başı maliyet): ₺0.50 - ₺2.00
- CTR (tıklama oranı): %0.5 - %2
- Niche'e göre değişir (emlak, finans yüksek ödülü)

---

## 📞 Yardım

### AdSense Desteği:

- Dashboard: https://adsense.google.com
- Help Center: https://support.google.com/adsense
- Community: https://support.google.com/adsense/community

### Bu Proje İçin:

- Reklam dosyaları: `src/components/ads/`
- Konfigürasyon: `src/config/adsConfig.ts`
- Dokümantasyon: `docs/REKLAM_*.md`

---

## ✅ Final Checklist

Başlamadan önce kontrol edin:

- [ ] Google AdSense hesabı oluşturuldu
- [ ] Site AdSense'e eklendi
- [ ] Publisher ID alındı
- [ ] `public/index.html` güncellendi
- [ ] `GoogleAdSense.tsx` Publisher ID güncellendi
- [ ] `adsConfig.ts` Publisher ID güncellendi
- [ ] En az 4 reklam birimi oluşturuldu
- [ ] Ad Slot ID'ler `adsConfig.ts`'e eklendi
- [ ] En az 1 sayfaya reklam eklendi
- [ ] Test edildi (npm run dev)
- [ ] Build alındı (npm run build)
- [ ] Deploy edildi
- [ ] AdSense onayı bekleniyor

---

🎉 **Tebrikler! Reklam sisteminiz hazır!**

İlk gelir 1-2 ay içinde gelmeye başlar. Trafik arttıkça gelir de artar.

**İyi kazançlar! 💰**