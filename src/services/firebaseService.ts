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
import {deleteObject, getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {auth, db, storage} from '../config/firebase';
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
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Product[];
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

        return onSnapshot(q, (querySnapshot) => {
            const products = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Product[];

            callback(products);
        });
    }
}

// Storage Service for images
export class StorageService {
    private static instance: StorageService;

    public static getInstance(): StorageService {
        if (!StorageService.instance) {
            StorageService.instance = new StorageService();
        }
        return StorageService.instance;
    }

    // Upload product image
    async uploadProductImage(file: File, productId: string): Promise<string> {
        const fileName = `${Date.now()}_${file.name}`;
        const storageRef = ref(storage, `products/${productId}/${fileName}`);

        const snapshot = await uploadBytes(storageRef, file);
        return await getDownloadURL(snapshot.ref);
    }

    // Delete image
    async deleteImage(imageUrl: string): Promise<void> {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
    }

    // Upload multiple images
    async uploadMultipleImages(files: File[], productId: string): Promise<string[]> {
        const uploadPromises = files.map(file => this.uploadProductImage(file, productId));
        return await Promise.all(uploadPromises);
    }
}

// Export service instances
export const authService = AuthService.getInstance();
export const productService = ProductService.getInstance();
export const storageService = StorageService.getInstance();