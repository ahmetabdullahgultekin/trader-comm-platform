# 🌐 Google AdSense'e Website Ekleme Rehberi

Publisher ID'niz var ama site ekleyemiyorsanız, bu rehberi takip edin.

---

## 🔍 Durum Tespiti

Publisher ID'niz: **ca-pub-2016267232144093** ✅

Şimdi sitenizi eklememiz gerekiyor.

---

## 📍 Yöntem 1: Sites Sayfasından Ekleme (Yeni Arayüz)

### Adım 1: Sites Bölümüne Gidin

1. AdSense Dashboard'a gidin: https://adsense.google.com
2. Sol menüden **"Sites"** seçeneğini bulun
3. Sağ üstte **"Add site"** veya **"Site ekle"** butonu olmalı

**Buton görmüyorsanız →** Yöntem 2'ye geçin

### Adım 2: Site URL'inizi Girin

- URL girin: `fahrieren.com` (https:// olmadan)
- "Add" / "Ekle" butonuna tıklayın

### Adım 3: Site Doğrulama Kodu

Google size bir kod verecek. İki seçenek:

**A. Otomatik Doğrulama (Önerilen)**

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2016267232144093"
     crossorigin="anonymous"></script>
```

**B. Manuel Meta Tag**

```html
<meta name="google-adsense-account" content="ca-pub-2016267232144093">
```

---

## 📍 Yöntem 2: Doğrudan Code ile Başlama (Kolay)

Bazen Google direkt code verip site eklemeyi otomatik yapar. Bunu deneyelim:

### Option A: Auto Ads Aktif Et

1. Sol menüden **"Ads"** → **"Overview"**
2. **"Auto ads"** seçeneğini bulun
3. Toggle'ı açın (ON)
4. **"Get code"** butonuna tıklayın
5. Kodu kopyalayın

### Option B: Ad Unit Oluştur

1. **"Ads"** → **"By ad unit"**
2. **"Display ads"** seçin
3. Ad unit adı: `Test Banner`
4. **"Create"** tıklayın
5. Kodu kopyalayın

---

## 🚀 Hızlı Çözüm: Ben Direkt Entegre Edeyim!

Eğer karmaşık geliyorsa, **şimdi ben sitenize kodu ekleyeyim**. Google kodu görünce otomatik olarak sitenizi
ekleyecektir.

### Şu Anda Yapacağım:

1. ✅ Publisher ID'nizi kodlara ekleyeceğim
2. ✅ AdSense script'ini HTML'e ekleyeceğim
3. ✅ Test reklamlarını hazırlayacağım

**Sonra siz:**

- Deploy edin (sitenizi yayınlayın)
- Google 1-2 gün içinde otomatik algılayacak
- Site otomatik eklenecek

---

## 📋 Google'ın Görmesi Gereken

Siteniz yayında olmalı ve şunlara sahip olmalı:

✅ **Domain**: fahrieren.com gibi gerçek domain
✅ **İçerik**: En az 10-15 sayfa içerik
✅ **Traffic**: İdeal 100+ günlük ziyaretçi (zorunlu değil)
✅ **Politikalara Uygunluk**: Adult content, telif hakkı ihlali yok

---

## ⚠️ Sık Karşılaşılan Sorunlar

### 1. "Add Site" Butonu Yok

**Sebep:** Yeni hesaplar için bazen gizli olur

**Çözüm:**

- Auto ads ile başlayın
- Ya da kodu ekleyip Google'ın algılamasını bekleyin

### 2. "Site Already Added" Hatası

**Sebep:** Site zaten eklendi ama onay bekliyor

**Kontrol:**

- Sites listesinde "Pending" / "Getting ready" yazıyor mu?
- Varsa sadece bekleyin

### 3. "Invalid Site" Hatası

**Sebep:** Domain henüz aktif değil

**Çözüm:**

- Domain'in DNS ayarları tamamlanmalı
- Site erişilebilir olmalı

---

## 🎯 Sizin İçin En İyi Seçenek

Publisher ID'niz hazır olduğuna göre:

### 1️⃣ **Ben şimdi kodu ekleyeyim** (5 dakika)

- ID'nizi 3 dosyaya eklerim
- AdSense script'i aktif olur
- Siz deploy edin

### 2️⃣ **Google otomatik algılar** (1-2 gün)

- Kodu görünce sitenizi otomatik ekler
- Email ile bildirim gelir

### 3️⃣ **Reklamlar başlar** (7 gün içinde)

- Onay sonrası gerçek reklamlar
- Öncesinde test reklamları

---

## 🔔 Şu Anda Ne Yapmalıyız?

**BEN YAPAYIM:**

```
✅ Publisher ID: ca-pub-2016267232144093 kodlara eklenecek
✅ HTML'e script eklenecek
✅ Test reklamları aktif olacak
```

**SİZ YAPIN:**

```
→ Deploy edin (npm run build + hosting'e yükle)
→ 1-2 gün bekleyin
→ AdSense'den onay emaili gelecek
```

**Devam edelim mi?** 🚀