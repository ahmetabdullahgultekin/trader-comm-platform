# 🚀 Hostinger'a Deploy Rehberi

Site'inizi Hostinger'a yüklemek için adım adım rehber.

---

## 📋 Gereksinimler

- ✅ Build alındı (`dist/` klasörü hazır)
- ✅ Hostinger hesabı
- ✅ Domain bağlı (fahrieren.com)

---

## 🎯 YÖNTEM 1: File Manager ile Upload (Kolay) ⭐

### Adım 1: Hostinger'a Giriş Yapın

1. https://www.hostinger.com adresine gidin
2. Giriş yapın
3. **"Websites"** seçin
4. `fahrieren.com` sitenize tıklayın

### Adım 2: File Manager'ı Açın

1. Sol menüden **"File Manager"** seçin
2. Veya **"Files"** → **"File Manager"**

### Adım 3: public_html Klasörüne Gidin

1. **"public_html"** klasörüne tıklayın
2. İçindeki **ESKİ dosyaları silin** (index.html, vb.)
3. Klasör **BOŞ** olmalı

### Adım 4: Dist Klasörünü Yükleyin

1. **"Upload"** butonuna tıklayın
2. Bilgisayarınızdan şu klasöre gidin:
   ```
   C:\Users\ahabg\WebstormProjects\trader-comm-platform\dist
   ```
3. **Dist klasörünün İÇİNDEKİ TÜM dosyaları** seçin:
    - index.html
    - assets/ klasörü
    - manifest.json
    - sw.js
    - vb.

4. **"Upload"** yapın
5. Bekleyin (1-2 dakika)

### Adım 5: Kontrol Edin

1. Tarayıcıda **https://fahrieren.com** açın
2. Sitenizin yeni versiyonunu görmeli
3. Ctrl+F5 (hard refresh) yapın

---

## 🎯 YÖNTEM 2: FTP ile Upload (Daha Hızlı)

### Gerekli Bilgiler

Hostinger'dan FTP bilgilerinizi alın:

1. Hostinger → Websites → `fahrieren.com`
2. **"FTP Accounts"** seçin
3. Bilgileri kopyalayın:
    - **FTP Host:** ftp.fahrieren.com (veya IP)
    - **FTP Username:** kullanıcı adınız
    - **FTP Password:** şifreniz
    - **Port:** 21

### FileZilla ile Upload

1. **FileZilla İndirin:** https://filezilla-project.org
2. **Bağlan:**
    - Host: `ftp.fahrieren.com`
    - Username: FTP kullanıcı adınız
    - Password: FTP şifreniz
    - Port: 21
    - **"Quickconnect"** tıklayın

3. **Dosyaları Yükleyin:**
    - Sol taraf: Bilgisayarınız
    - Sağ taraf: Hostinger sunucusu

   **Sol tarafta:**
   ```
   C:\Users\ahabg\WebstormProjects\trader-comm-platform\dist
   ```

   **Sağ tarafta:**
   ```
   /public_html
   ```

4. **Dist içindeki tüm dosyaları** sağ tarafa sürükleyin
5. Upload bitene kadar bekleyin (2-3 dakika)

---

## 🎯 YÖNTEM 3: Git + Hostinger (İleri Seviye)

### Hostinger Git Kurulumu

1. Hostinger → **"Advanced"** → **"Git"**
2. **"Create repository"** tıklayın
3. GitHub repo URL'nizi girin
4. Branch: `main` veya `master`
5. Deploy path: `/public_html`
6. **Auto deploy** aktif edin

### Her Güncelleme:

```bash
git add .
git commit -m "Update"
git push origin main
```

Hostinger otomatik deploy edecek!

---

## ✅ Deploy Sonrası Kontroller

### 1. Site Çalışıyor mu?

```
https://fahrieren.com → Ana sayfa açılmalı
https://fahrieren.com/urunler → Ürünler sayfası
https://fahrieren.com/hakkimda → Hakkında sayfası
```

### 2. AdSense Kodu Var mı?

1. Sağ tık → **"Sayfa Kaynağını Görüntüle"**
2. Ctrl+F ile ara:
   ```html
   <meta name="google-adsense-account" content="ca-pub-2016267232144093">
   ```
3. Bulunduysa ✅ tamam!

### 3. Google'a Bildir

1. AdSense → O doğrulama ekranına dön
2. **"Verify"** veya **"Check"** butonuna tıkla
3. ✅ Onay gelecek!

---

## 🔧 Sorun Giderme

### "Site açılmıyor"

**Sebep:** DNS yayılımı
**Çözüm:**

- 5-10 dakika bekleyin
- Ctrl+F5 (hard refresh)
- Gizli pencerede deneyin

### "Eski site görünüyor"

**Sebep:** Cache
**Çözüm:**

```bash
# Tarayıcı cache'i temizle
Ctrl + Shift + Delete
```

### "Dosyalar yüklenmiyor"

**Sebep:** Yanlış klasör
**Çözüm:**

- `public_html` klasörüne yükleyin
- `public_html/dist` DEĞİL!
- `public_html/index.html` DOĞRU!

### "403 Forbidden"

**Sebep:** İzin sorunu
**Çözüm:**

1. File Manager'da dosyalara sağ tık
2. **"Permissions"** → **755** yapın

---

## 📊 Dosya Yapısı (Doğru)

```
public_html/
├── index.html          ✅
├── manifest.json       ✅
├── sw.js              ✅
├── favicon.ico        ✅
├── assets/            ✅
│   ├── index-xxx.js
│   ├── index-xxx.css
│   └── ...
└── images/            ✅
```

**YANLIŞ Yapı:**

```
public_html/
└── dist/              ❌ YANLIŞ!
    ├── index.html
    └── ...
```

---

## 🎯 Hızlı Deploy Checklist

- [ ] Hostinger'a giriş yaptım
- [ ] File Manager'ı açtım
- [ ] public_html klasörüne gittim
- [ ] Eski dosyaları sildim
- [ ] dist/ içindeki TÜMU dosyaları yükledim
- [ ] https://fahrieren.com açıldı
- [ ] Ctrl+F5 (hard refresh) yaptım
- [ ] Sayfa kaynağında AdSense kodu var
- [ ] Google'da "Verify" tıkladım

---

## 💡 Pro İpuçları

### Hızlı Upload İçin:

1. **Zip yapın:**
   ```bash
   # dist klasöründeki her şeyi zip'le
   # Hostinger'da upload et
   # Extract et
   ```

2. **Auto Deploy:**
    - Hostinger Git kullan
    - Her push'da otomatik deploy

3. **.htaccess Ekleyin:**
   ```apache
   # Performans için
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/html text/css text/javascript
   </IfModule>
   ```

---

## 📞 Yardım

### Hostinger Support:

- Live Chat: https://www.hostinger.com/support
- Türkçe destek mevcut

### AdSense Doğrulama:

- Deploy sonrası 5-10 dakika bekleyin
- Sonra Google'da Verify tıklayın

---

🎉 **Deploy başarılı olunca, Google 24 saat içinde sitenizi onaylayacak!**