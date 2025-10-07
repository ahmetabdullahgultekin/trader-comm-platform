/**
 * Admin User Creation Utility
 *
 * Bu dosyayı sadece development ortamında admin kullanıcısı oluşturmak için kullanın.
 *
 * Kullanım:
 * 1. Development server'ı başlatın: npm run dev
 * 2. Browser console'u açın (F12)
 * 3. Bu dosyadaki createAdminUser() fonksiyonunu çağırın
 *
 * NOT: Production'da Firebase Console'dan kullanıcı oluşturun!
 */

import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';

export const createAdminUser = async (email: string, password: string) => {
    try {
        if (import.meta.env.PROD) {
            console.error('❌ Bu fonksiyon sadece development ortamında kullanılabilir!');
            return;
        }

        if (password.length < 6) {
            console.error('❌ Şifre en az 6 karakter olmalıdır!');
            return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('✅ Admin kullanıcısı başarıyla oluşturuldu!');
        console.log('📧 Email:', userCredential.user.email);
        console.log('🆔 User ID:', userCredential.user.uid);
        console.log('\n🚀 Şimdi /admin sayfasından giriş yapabilirsiniz!');

        return userCredential.user;
    } catch (error: any) {
        console.error('❌ Admin kullanıcısı oluşturulurken hata:', error.message);

        if (error.code === 'auth/email-already-in-use') {
            console.log('ℹ️  Bu email adresi zaten kullanımda. Direkt giriş yapmayı deneyin.');
        } else if (error.code === 'auth/invalid-email') {
            console.log('ℹ️  Geçersiz email adresi formatı.');
        } else if (error.code === 'auth/weak-password') {
            console.log('ℹ️  Şifre çok zayıf. En az 6 karakter kullanın.');
        }

        throw error;
    }
};

// Quick setup function
export const quickAdminSetup = () => {
    console.log('🔧 Hızlı Admin Kurulumu Başlatılıyor...\n');

    const defaultEmail = 'admin@fahrieren.com';
    const defaultPassword = 'Admin123!@#';

    console.log('📋 Varsayılan Bilgiler:');
    console.log('Email:', defaultEmail);
    console.log('Password:', defaultPassword);
    console.log('\n⚠️  Production\'da mutlaka bu bilgileri değiştirin!\n');

    return createAdminUser(defaultEmail, defaultPassword);
};

// Global fonksiyon olarak ekle (sadece development - sessizce)
if (import.meta.env.DEV) {
    (window as any).createAdminUser = createAdminUser;
    (window as any).quickAdminSetup = quickAdminSetup;
    // Console log'lar kaldırıldı - ihtiyaç olursa doğrudan fonksiyonları çağırın
}
