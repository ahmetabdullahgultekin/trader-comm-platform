import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    type User
} from 'firebase/auth';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where
} from 'firebase/firestore';
import {auth, db} from '../config/firebase';
import type {Product} from '../types';

// Authentication Service
export class AuthService {
    private static instance: AuthService;

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    // Sign in with email and password
    async signIn(email: string, password: string): Promise<User> {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    }

    // Sign out
    async signOut(): Promise<void> {
        await signOut(auth);
    }

    // Listen to auth state changes
    onAuthStateChanged(callback: (user: User | null) => void): () => void {
        return onAuthStateChanged(auth, callback);
    }

    // Get current user
    getCurrentUser(): User | null {
        return auth.currentUser;
    }

    // Check if user is admin
    async isAdmin(user: User): Promise<boolean> {
        try {
            const adminDoc = await getDoc(doc(db, 'admins', user.uid));
            return adminDoc.exists();
        } catch (error) {
            console.error('Error checking admin status:', error);
            return false;
        }
    }

    // Create admin user (only for initial setup)
    async createAdminUser(email: string, password: string): Promise<void> {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Add user to admins collection
        await addDoc(collection(db, 'admins'), {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            createdAt: serverTimestamp(),
            role: 'admin'
        });
    }
}

// Product Service
export class ProductService {
    private static instance: ProductService;

    public static getInstance(): ProductService {
        if (!ProductService.instance) {
            ProductService.instance = new ProductService();
        }
        return ProductService.instance;
    }

    // Add new product
    async addProduct(product: Omit<Product, 'id'>): Promise<string> {
        const docRef = await addDoc(collection(db, 'products'), {
            ...product,
            views: product.views || 0,           // Başlangıç değeri
            favoriteCount: 0,                     // Başlangıç değeri
            contactCount: 0,                      // Başlangıç değeri
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return docRef.id;
    }

    // Update product
    async updateProduct(productId: string, updates: Partial<Product>): Promise<void> {
        const productRef = doc(db, 'products', productId);
        await updateDoc(productRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
    }

    // Delete product
    async deleteProduct(productId: string): Promise<void> {
        await deleteDoc(doc(db, 'products', productId));
    }

    // Get all products
    async getProducts(): Promise<Product[]> {
        try {
            // Disable offline persistence to avoid Target ID conflicts
            const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Product[];
        } catch (error) {
            console.error('Error fetching products from Firebase:', error);

            // Return empty array instead of throwing to prevent app crash
            return [];
        }
    }

    // Get products by category
    async getProductsByCategory(category: string): Promise<Product[]> {
        const q = query(
            collection(db, 'products'),
            where('category', '==', category),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Product[];
    }

    // Get single product
    async getProduct(productId: string): Promise<Product | null> {
        const docSnap = await getDoc(doc(db, 'products', productId));

        if (docSnap.exists()) {
            return {id: docSnap.id, ...docSnap.data()} as Product;
        }
        return null;
    }

    // Listen to products changes
    onProductsChange(callback: (products: Product[]) => void): () => void {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));

        return onSnapshot(q,
            (querySnapshot) => {
                const products = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Product[];

                callback(products);
            },
            (error) => {
                console.error('Error listening to products changes:', error);
                // Fallback to empty array on error
                callback([]);
            }
        );
    }
}

// Storage Service for images
export class StorageService {
    private static instance: StorageService;
    // Hostinger base URL
    private readonly HOSTINGER_BASE_URL = 'https://fahrieren.com/uploads';
    private readonly UPLOAD_ENDPOINT = 'https://fahrieren.com/api/upload.php'; // Hostinger'da oluşturulacak PHP endpoint

    public static getInstance(): StorageService {
        if (!StorageService.instance) {
            StorageService.instance = new StorageService();
        }
        return StorageService.instance;
    }

    /**
     * Upload product image to Hostinger
     * NOT: Bu method çalışması için Hostinger'da upload.php dosyası oluşturulmalı
     */
    async uploadProductImage(file: File, productId: string): Promise<string> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('productId', productId);

        try {
            // GEÇICI: Manuel yükleme için URL döndür
            // Gerçek implementasyon için backend endpoint gerekli
            if (import.meta.env.DEV) {
                console.warn('⚠️ MANUEL YÜKLEME GEREKLİ: Fotoğrafı Hostinger File Manager\'a yükleyin');
                console.log('📁 Dosya adı:', file.name);
                console.log('📁 Ürün ID:', productId);
            }

            // Placeholder URL döndür - kullanıcı manuel olarak günceller
            return `${this.HOSTINGER_BASE_URL}/image/${file.name}`;

            /* BACKEND HAZIR OLUNCA KULLANILACAK KOD:
            const response = await fetch(this.UPLOAD_ENDPOINT, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (result.success) {
                return result.url;
            } else {
                throw new Error(result.message || 'Upload failed');
            }
            */
        } catch (error) {
            console.error('Image upload error:', error);
            throw error;
        }
    }

    // Delete image - Hostinger için manuel silme gerekli
    async deleteImage(imageUrl: string): Promise<void> {
        if (import.meta.env.DEV) {
            console.warn('⚠️ MANUEL SİLME GEREKLİ: Fotoğrafı Hostinger File Manager\'dan silin');
            console.log('🗑️ URL:', imageUrl);
        }
        // Manuel silme gerekli veya backend endpoint ile
    }

    // Upload multiple images
    async uploadMultipleImages(files: File[], productId: string): Promise<string[]> {
        const uploadPromises = files.map(file => this.uploadProductImage(file, productId));
        return await Promise.all(uploadPromises);
    }

    /**
     * Hostinger'a yüklenen görselin URL'ini oluştur
     */
    getHostingerImageUrl(fileName: string): string {
        return `${this.HOSTINGER_BASE_URL}/image/${fileName}`;
    }
}

// Export service instances
export const authService = AuthService.getInstance();
export const productService = ProductService.getInstance();
export const storageService = StorageService.getInstance();