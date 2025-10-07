# Admin Paneli Kurulumu

## Admin Kullanıcısı Oluşturma

Admin paneline erişmek için Firebase Console'dan bir kullanıcı oluşturmanız gerekir.

### Yöntem 1: Firebase Console Üzerinden (Önerilen)

1. **Firebase Console'a Gidin:**
    - https://console.firebase.google.com/
    - Projenizi seçin: `trader-e-commerce`

2. **Authentication'a Gidin:**
    - Sol menüden **Build** > **Authentication**
    - **Get Started** butonuna tıklayın (ilk kez kurulum yapıyorsanız)

3. **Sign-in Method Ayarlayın:**
    - **Sign-in method** sekmesine gidin
    - **Email/Password** seçeneğini bulun ve **Enable** yapın
    - Save butonuna tıklayın

4. **Admin Kullanıcısı Ekleyin:**
    - **Users** sekmesine gidin
    - **Add user** butonuna tıklayın
    - Email: `admin@fahrieren.com` (veya istediğiniz email)
    - Password: Güçlü bir şifre belirleyin (örn: `Admin123!@#`)
    - **Add user** butonuna tıklayın

5. **Admin Paneline Giriş:**
    - Tarayıcınızda: `http://localhost:5173/admin`
    - Oluşturduğunuz email ve şifre ile giriş yapın

### Yöntem 2: Kod İle Kullanıcı Oluşturma

Geliştirme ortamında hızlıca test kullanıcısı oluşturmak için:

```bash
# Development server'ı başlatın
npm run dev

# Tarayıcı Console'unu açın (F12)
# Aşağıdaki kodu yapıştırın:
```

```javascript
// Browser Console'a yapıştırın
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './src/config/firebase';

const email = 'admin@fahrieren.com';
const password = 'Admin123!@#';

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log('✅ Admin kullanıcısı oluşturuldu:', userCredential.user.email);
  })
  .catch((error) => {
    console.error('❌ Hata:', error.message);
  });
```

### Admin Panel Erişim Yolları

- **Giriş Sayfası:** `/admin`
- **Dashboard:** `/admin/dashboard` (giriş sonrası)
- **Ürün Yönetimi:** `/admin/urunler` (giriş sonrası)

### Güvenlik Notları

⚠️ **ÖNEMLİ:**

1. Üretim ortamında güçlü şifreler kullanın
2. Firebase Security Rules'u kontrol edin
3. Admin email adresini güvenli tutun
4. İki faktörlü doğrulama düşünün (Firebase'de mevcut)

### Sorun Giderme

**"Giriş başarısız" hatası alıyorsanız:**

1. Firebase Console'da Authentication > Sign-in method > Email/Password'ün aktif olduğundan emin olun
2. Kullanıcının doğru oluşturulduğunu kontrol edin (Authentication > Users)
3. Şifrenizin en az 6 karakter olduğundan emin olun
4. Firebase API Key'in doğru olduğunu kontrol edin (`src/config/firebase.ts`)

**"Network error" hatası alıyorsanız:**

1. İnternet bağlantınızı kontrol edin
2. Firebase projesinin aktif olduğundan emin olun
3. Firebase kurallarının (`firestore.rules`) doğru yapılandırıldığından emin olun

## Firestore Security Rules

Admin işlemleri için Firestore rules'unuzu güncelleyin:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Admin paneli için authenticate olmuş kullanıcılara izin ver
    match /products/{productId} {
      allow read: if true;  // Herkes okuyabilir
      allow write: if request.auth != null;  // Sadece giriş yapmış kullanıcılar yazabilir
    }

    match /analytics/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Test Admin Bilgileri (Development)

**Not:** Sadece geliştirme ortamı için test amaçlı

```
Email: admin@fahrieren.com
Password: Admin123!@#
```

**Production'da mutlaka değiştirin!**
