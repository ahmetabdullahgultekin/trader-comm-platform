import {API_CONFIG, getApiConfig} from '../config/apiConfig';

interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
    timestamp: number;
}

interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: any;
    timeout?: number;
    retries?: number;
}

class ApiManager {
    private config = getApiConfig();
    private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

    constructor() {
        this.initializeErrorHandling();
    }

    public async makeRequest<T>(
        endpoint: string,
        options: RequestOptions = {}
    ): Promise<ApiResponse<T>> {
        const config = this.config;
        const {
            method = 'GET',
            headers = {},
            body,
            timeout = config.TIMEOUT,
            retries = config.RETRY_COUNT
        } = options;

        // Cache kontrolü
        const cacheKey = `${method}-${endpoint}-${JSON.stringify(body)}`;
        if (method === 'GET' && config.FEATURES.CACHE_ENABLED) {
            const cached = this.getFromCache(cacheKey);
            if (cached) return cached;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const requestHeaders = {
            'Content-Type': 'application/json',
            'X-Master-Key': config.JSONBIN.MASTER_KEY,
            'X-Access-Key': config.JSONBIN.API_KEY,
            ...headers,
        };

        const url = this.buildUrl(endpoint);

        try {
            const response = await fetch(url, {
                method,
                headers: requestHeaders,
                body: body ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            const result: ApiResponse<T> = {
                success: true,
                data,
                timestamp: Date.now(),
            };

            // Cache'e kaydet
            if (method === 'GET' && config.FEATURES.CACHE_ENABLED) {
                this.setCache(cacheKey, result, 5 * 60 * 1000); // 5 dakika TTL
            }

            return result;
        } catch (error: any) {
            clearTimeout(timeoutId);

            if (retries > 0 && !controller.signal.aborted) {
                await this.delay(config.RETRY_DELAY);
                return this.makeRequest(endpoint, {...options, retries: retries - 1});
            }

            return {
                success: false,
                data: null as any,
                error: error.message,
                timestamp: Date.now(),
            };
        }
    }

    // Public API Methods
    async getProducts() {
        return this.makeRequest(this.config.ENDPOINTS.PRODUCTS);
    }

    async subscribeNewsletter(email: string) {
        return this.makeRequest(this.config.ENDPOINTS.NEWSLETTER, {
            method: 'POST',
            body: {email, timestamp: Date.now()},
        });
    }

    async sendContactMessage(data: any) {
        return this.makeRequest(this.config.ENDPOINTS.CONTACT, {
            method: 'POST',
            body: {...data, timestamp: Date.now()},
        });
    }

    async trackAnalytics(event: string, data: any) {
        if (!this.config.FEATURES.ANALYTICS_ENABLED) return;

        return this.makeRequest(this.config.ENDPOINTS.ANALYTICS, {
            method: 'POST',
            body: {event, data, timestamp: Date.now()},
        });
    }

    // Utility methods
    getContactInfo() {
        return this.config.CONTACT;
    }

    getSocialLinks() {
        return this.config.SOCIAL;
    }

    getSEOConfig() {
        return this.config.SEO;
    }

    // Cache management
    clearCache() {
        this.cache.clear();
    }

    getCacheStats() {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys()),
        };
    }

    // Health check
    async healthCheck() {
        try {
            const response = await this.makeRequest('/health', {timeout: 5000});
            return response.success;
        } catch {
            return false;
        }
    }

    // Configuration updates
    updateConfig(newConfig: Partial<typeof API_CONFIG>) {
        this.config = {...this.config, ...newConfig};
    }

    getConfig() {
        return {...this.config};
    }

    private initializeErrorHandling() {
        if (this.config.FEATURES.ERROR_REPORTING) {
            window.addEventListener('unhandledrejection', this.handleUnhandledError);
        }
    }

    private handleUnhandledError = (event: PromiseRejectionEvent) => {
        console.error('Unhandled API Error:', event.reason);
        // Burada error reporting servisine gönderilebilir
    };

    private buildUrl(endpoint: string): string {
        const baseUrl = this.config.BASE_URL;
        const binId = this.config.JSONBIN.BIN_ID;
        return `${baseUrl}${endpoint.replace('{binId}', binId)}`;
    }

    private getFromCache(key: string) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < cached.ttl) {
            return cached.data;
        }
        this.cache.delete(key);
        return null;
    }

    private setCache(key: string, data: any, ttl: number) {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            ttl,
        });
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Singleton instance
export const apiManager = new ApiManager();
export default apiManager;
