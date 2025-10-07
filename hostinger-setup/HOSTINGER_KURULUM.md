# 📁 Hostinger Fotoğraf Yükleme Kurulumu

## 🎯 Genel Bakış

Firebase Storage yerine Hostinger'ın dosya sistemini kullanıyoruz. Bu daha ekonomik ve hızlı.

---

## 📋 Kurulum Adımları

### 1️⃣ Hostinger File Manager'a Giriş

1. Hostinger Control Panel → **File Manager**
2. `public_html` klasörüne gidin

### 2️⃣ Klasör Yapısı Oluştur

```
public_html/
├── api/
│   └── upload.php       ← PHP upload script
├── uploads/
│   ├── .htaccess        ← Güvenlik kuralları
│   └── image/           ← Tüm fotoğraflar buraya
│       ├── car1.jpg
│       ├── car2.jpg
│       └── ...
```

### 3️⃣ Dosyaları Yükle

**a) upload.php dosyasını yükle:**

- `hostinger-setup/upload.php` → `public_html/api/upload.php`

**b) .htaccess dosyasını yükle:**

- `hostinger-setup/.htaccess` → `public_html/uploads/.htaccess`

**c) Klasör izinlerini ayarla:**

- `uploads/` klasörüne sağ tıkla → **Change Permissions** → `755` (rwxr-xr-x)

### 4️⃣ Domain URL Ayarlandı ✅

`src/services/firebaseService.ts` dosyasında domain URL ayarlandı:

```typescript
private readonly HOSTINGER_BASE_URL = 'https://fahrieren.com/uploads';
```

Tüm resimler şu formatta olacak:

- `https://fahrieren.com/uploads/image/car1.jpg`
- `https://fahrieren.com/uploads/image/car2.jpg`

---

## 🔧 Kullanım

### Otomatik Yükleme (Backend Hazır)

Admin panelden fotoğraf seçtiğinizde otomatik yüklenecek.

### Manuel Yükleme (Geçici Çözüm)

1. Admin panelden ürün ekle
2. Console'da gösterilen dosya adını not al
3. Hostinger File Manager → `uploads/image/` klasörüne fotoğrafı yükle
4. Ürünü düzenle → Image URL'ini güncelle:
   ```
   https://fahrieren.com/uploads/image/car1.jpg
   ```

---

## ✅ Test Et

1. Browser'da test et:
   ```
   https://fahrieren.com/api/upload.php
   ```
   → JSON response görmeli

2. Postman ile test:
   ```bash
   POST https://fahrieren.com/api/upload.php
   Body: form-data
   - file: [bir resim dosyası seç]
   - productId: "test123"
   ```

3. Manuel test için resim yükle:
    - Hostinger File Manager → `public_html/uploads/image/`
    - `car1.jpg` dosyasını yükle
    - Browser'da aç: `https://fahrieren.com/uploads/image/car1.jpg`

---

## 🔒 Güvenlik

✅ Sadece resim dosyaları yüklenebilir (JPG, PNG, GIF, WEBP)
✅ Maksimum dosya boyutu: 5MB
✅ PHP dosyaları uploads klasöründe çalışamaz
✅ Directory listing kapalı
✅ CORS yapılandırması mevcut

---

## 🐛 Sorun Giderme

### "Failed to save file" hatası

- `uploads/` klasörü izinlerini kontrol et (755)
- PHP upload limits kontrol et (php.ini)

### "CORS error"

- `.htaccess` dosyasının doğru yüklendiğinden emin ol
- Hostinger'da mod_headers açık mı kontrol et

### Fotoğraflar görünmüyor

- URL doğru mu kontrol et
- Browser Network tab'inde 404 hatası var mı bak
- Dosya gerçekten yüklendi mi File Manager'dan kontrol et

---

## 📞 İletişim

Sorun yaşarsanız:

1. Console loglarını kontrol edin
2. Hostinger error_log dosyasına bakın
3. Browser Network tab'inde istekleri inceleyin
