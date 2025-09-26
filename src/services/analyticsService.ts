import {productService} from './firebaseService';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    increment,
    query,
    setDoc,
    updateDoc
} from 'firebase/firestore';
import {db} from '../config/firebase';

export interface AnalyticsData {
    totalViews: number;
    uniqueVisitors: number;
    pageViews: { [key: string]: number };
    productViews: { [key: string]: number };
    categoryViews: { [key: string]: number };
    dailyStats: { [key: string]: number };
    topProducts: Array<{ productId: string, views: number, title: string }>;
}

class AnalyticsService {
    private static instance: AnalyticsService;
    private sessionId: string;
    private userId: string;

    private constructor() {
        this.sessionId = this.generateSessionId();
        this.userId = this.getUserId();
    }

    public static getInstance(): AnalyticsService {
        if (!AnalyticsService.instance) {
            AnalyticsService.instance = new AnalyticsService();
        }
        return AnalyticsService.instance;
    }

    // Track page view
    async trackPageView(page: string): Promise<void> {
        try {
            const dateKey = this.getDateKey();
            const analyticsRef = doc(db, 'analytics', 'global');

            // Update global stats
            await setDoc(analyticsRef, {
                totalViews: increment(1),
                [`pageViews.${page}`]: increment(1),
                [`dailyStats.${dateKey}`]: increment(1),
                lastUpdated: new Date().toISOString()
            }, {merge: true});

            // Track session
            await this.trackSession(page);
        } catch (error: any) {
            // Silently fail for permissions issues in development
            if (error.code === 'permission-denied' || error.code === 'unauthenticated') {
                // Store locally as fallback
                this.storeLocalAnalytics(page);
            } else {
                console.warn('Analytics tracking failed:', error);
            }
        }
    }

    // Track product view
    async trackProductView(productId: string): Promise<void> {
        try {
            const dateKey = this.getDateKey();
            const analyticsRef = doc(db, 'analytics', 'global');

            // Get product details for better tracking
            const product = await productService.getProduct(productId);
            if (!product) return;

            // Update global analytics
            await setDoc(analyticsRef, {
                [`productViews.${productId}`]: increment(1),
                [`categoryViews.${product.category}`]: increment(1),
                lastUpdated: new Date().toISOString()
            }, {merge: true});

            // Update product's view count in products collection
            await productService.updateProduct(productId, {
                views: increment(1) as any
            });

            // Track detailed product analytics
            await setDoc(doc(db, 'analytics', `product_${productId}`), {
                productId,
                title: product.title,
                category: product.category,
                totalViews: increment(1),
                [`dailyViews.${dateKey}`]: increment(1),
                lastViewed: new Date().toISOString()
            }, {merge: true});

        } catch (error) {
            console.warn('Product view tracking failed:', error);
        }
    }

    // Get analytics data for admin dashboard
    async getAnalyticsData(): Promise<AnalyticsData> {
        try {
            const analyticsRef = doc(db, 'analytics', 'global');
            const analyticsDoc = await getDoc(analyticsRef);

            let data: AnalyticsData = {
                totalViews: 0,
                uniqueVisitors: 0,
                pageViews: {},
                productViews: {},
                categoryViews: {},
                dailyStats: {},
                topProducts: []
            };

            if (analyticsDoc.exists()) {
                const docData = analyticsDoc.data();
                data = {
                    totalViews: docData.totalViews || 0,
                    uniqueVisitors: await this.getUniqueVisitorsCount(),
                    pageViews: docData.pageViews || {},
                    productViews: docData.productViews || {},
                    categoryViews: docData.categoryViews || {},
                    dailyStats: docData.dailyStats || {},
                    topProducts: await this.getTopProducts()
                };
            }

            return data;
        } catch (error: any) {
            console.error('Failed to get analytics data:', error);

            // If Firebase permission error, fall back to local data
            if (error.code === 'permission-denied' || error.code === 'unauthenticated') {
                const localData = this.getLocalAnalytics();
                return {
                    totalViews: localData.totalViews || 0,
                    uniqueVisitors: localData.uniqueVisitors || 0,
                    pageViews: localData.pageViews || {},
                    productViews: localData.productViews || {},
                    categoryViews: localData.categoryViews || {},
                    dailyStats: localData.dailyStats || {},
                    topProducts: localData.topProducts || []
                };
            }

            return {
                totalViews: 0,
                uniqueVisitors: 0,
                pageViews: {},
                productViews: {},
                categoryViews: {},
                dailyStats: {},
                topProducts: []
            };
        }
    }

    // Track custom events
    async trackEvent(eventName: string, eventData: any = {}): Promise<void> {
        try {
            await addDoc(collection(db, 'events'), {
                eventName,
                eventData,
                sessionId: this.sessionId,
                userId: this.userId,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
            });
        } catch (error) {
            console.warn('Event tracking failed:', error);
        }
    }

    // Reset all analytics data (for testing purposes)
    async resetAnalyticsData(): Promise<void> {
        try {
            const analyticsRef = doc(db, 'analytics', 'global');
            await setDoc(analyticsRef, {
                totalViews: 0,
                pageViews: {},
                productViews: {},
                categoryViews: {},
                dailyStats: {},
                lastUpdated: new Date().toISOString()
            });

            // Delete all sessions
            const sessionsQuery = query(collection(db, 'sessions'));
            const sessionsSnapshot = await getDocs(sessionsQuery);
            const deletePromises = sessionsSnapshot.docs.map(doc => deleteDoc(doc.ref));
            await Promise.all(deletePromises);

            // Delete all events
            const eventsQuery = query(collection(db, 'events'));
            const eventsSnapshot = await getDocs(eventsQuery);
            const deleteEventPromises = eventsSnapshot.docs.map(doc => deleteDoc(doc.ref));
            await Promise.all(deleteEventPromises);

        } catch (error) {
            console.error('Failed to reset analytics data:', error);
            throw error;
        }
    }

    private generateSessionId(): string {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    private getUserId(): string {
        let userId = localStorage.getItem('analytics_user_id');
        if (!userId) {
            userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('analytics_user_id', userId);
        }
        return userId;
    }

    private getDateKey(): string {
        return new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    }

    // Local storage fallback for when Firebase permissions fail
    private storeLocalAnalytics(page: string): void {
        try {
            const dateKey = this.getDateKey();
            const localAnalytics = JSON.parse(localStorage.getItem('local_analytics') || '{}');

            // Initialize structure if it doesn't exist
            if (!localAnalytics.pageViews) localAnalytics.pageViews = {};
            if (!localAnalytics.dailyStats) localAnalytics.dailyStats = {};

            // Increment counters
            localAnalytics.totalViews = (localAnalytics.totalViews || 0) + 1;
            localAnalytics.pageViews[page] = (localAnalytics.pageViews[page] || 0) + 1;
            localAnalytics.dailyStats[dateKey] = (localAnalytics.dailyStats[dateKey] || 0) + 1;
            localAnalytics.lastUpdated = new Date().toISOString();

            localStorage.setItem('local_analytics', JSON.stringify(localAnalytics));
        } catch (error) {
            console.warn('Failed to store local analytics:', error);
        }
    }

    // Get local analytics data as fallback
    private getLocalAnalytics(): Partial<AnalyticsData> {
        try {
            const localAnalytics = JSON.parse(localStorage.getItem('local_analytics') || '{}');
            return {
                totalViews: localAnalytics.totalViews || 0,
                pageViews: localAnalytics.pageViews || {},
                dailyStats: localAnalytics.dailyStats || {},
                uniqueVisitors: 1, // Assume 1 unique visitor in local mode
                productViews: {},
                categoryViews: {},
                topProducts: []
            };
        } catch (error) {
            return {
                totalViews: 0,
                uniqueVisitors: 0,
                pageViews: {},
                productViews: {},
                categoryViews: {},
                dailyStats: {},
                topProducts: []
            };
        }
    }

    // Track user session
    private async trackSession(page: string): Promise<void> {
        try {
            const sessionRef = doc(db, 'sessions', this.sessionId);
            const sessionDoc = await getDoc(sessionRef);

            if (!sessionDoc.exists()) {
                // New session
                await setDoc(sessionRef, {
                    sessionId: this.sessionId,
                    userId: this.userId,
                    startTime: new Date().toISOString(),
                    pages: [page],
                    pageCount: 1,
                    userAgent: navigator.userAgent,
                    referrer: document.referrer,
                    language: navigator.language
                });
            } else {
                // Update existing session
                const data = sessionDoc.data();
                const pages = data.pages || [];
                if (!pages.includes(page)) {
                    pages.push(page);
                }

                await updateDoc(sessionRef, {
                    pages: pages,
                    pageCount: increment(1),
                    lastActivity: new Date().toISOString()
                });
            }
        } catch (error) {
            console.warn('Session tracking failed:', error);
        }
    }

    // Get unique visitors count
    private async getUniqueVisitorsCount(): Promise<number> {
        try {
            const sessionsQuery = query(collection(db, 'sessions'));
            const sessionsSnapshot = await getDocs(sessionsQuery);

            const uniqueUsers = new Set();
            sessionsSnapshot.forEach(doc => {
                const data = doc.data();
                if (data.userId) {
                    uniqueUsers.add(data.userId);
                }
            });

            return uniqueUsers.size;
        } catch (error) {
            console.warn('Failed to get unique visitors:', error);
            return 0;
        }
    }

    // Get top products by views
    private async getTopProducts(): Promise<Array<{ productId: string, views: number, title: string }>> {
        try {
            const products = await productService.getProducts();
            return products
                .filter(p => p.views && p.views > 0)
                .sort((a, b) => (b.views || 0) - (a.views || 0))
                .slice(0, 10)
                .map(p => ({
                    productId: p.id,
                    views: p.views || 0,
                    title: p.title.tr
                }));
        } catch (error) {
            console.warn('Failed to get top products:', error);
            return [];
        }
    }
}

export const analyticsService = AnalyticsService.getInstance();
export default analyticsService;