import {collection, doc, getDocs, updateDoc} from 'firebase/firestore';
import {db} from '../config/firebase';

/**
 * Mevcut tüm ürünlere views, favoriteCount, contactCount alanlarını ekle
 * Console'dan çalıştırın: fixProductViews()
 */
export const fixProductViews = async () => {
    try {
        console.log('🔧 Ürünler güncelleniyor...');

        const productsSnapshot = await getDocs(collection(db, 'products'));
        let updatedCount = 0;

        for (const productDoc of productsSnapshot.docs) {
            const data = productDoc.data();

            // Eksik alanları kontrol et ve ekle
            const updates: any = {};

            if (typeof data.views !== 'number') {
                updates.views = 0;
            }

            if (typeof data.favoriteCount !== 'number') {
                updates.favoriteCount = 0;
            }

            if (typeof data.contactCount !== 'number') {
                updates.contactCount = 0;
            }

            // Güncelleme gerekiyorsa
            if (Object.keys(updates).length > 0) {
                await updateDoc(doc(db, 'products', productDoc.id), updates);
                updatedCount++;
                console.log(`✅ ${productDoc.id} güncellendi:`, updates);
            }
        }

        console.log(`✨ Tamamlandı! ${updatedCount} ürün güncellendi.`);
        console.log('📊 Şimdi bir ürüne tıklayın ve sayacın arttığını görün!');
    } catch (error) {
        console.error('❌ Hata:', error);
    }
};

// Development modunda global olarak ekle
if (import.meta.env.DEV) {
    (window as any).fixProductViews = fixProductViews;
    console.log('🔧 Ürün sayaçlarını düzeltmek için: fixProductViews()');
}
