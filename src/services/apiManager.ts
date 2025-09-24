// API Configuration Manager - Centralized API management
export class ApiConfig {
    private static instance: ApiConfig;

    // API Endpoints - Tek noktadan yönetim
    private readonly endpoints = {
        // JSONBin.io endpoint (ücretsiz JSON database)
        jsonbin: {
            baseUrl: 'https://api.jsonbin.io/v3',
            binId: 'YOUR_BIN_ID', // Değiştirilebilir
            apiKey: 'YOUR_API_KEY', // Değiştirilebilir
        },

        // Firebase (alternatif)
        firebase: {
            projectId: 'trader-platform',
            databaseUrl: 'https://trader-platform-default-rtdb.firebaseio.com',
        },

        // Local Development
        local: {
            baseUrl: 'http://localhost:3001/api',
        },

        // Production
        production: {
            baseUrl: 'https://api.fahrieren.com',
        }
    };

    // Aktif ortam
    private currentEnvironment: 'local' | 'jsonbin' | 'firebase' | 'production' = 'local';

    private constructor() {
    }

    public static getInstance(): ApiConfig {
        if (!ApiConfig.instance) {
            ApiConfig.instance = new ApiConfig();
        }
        return ApiConfig.instance;
    }

    // Ortam değiştirme
    public setEnvironment(env: 'local' | 'jsonbin' | 'firebase' | 'production') {
        this.currentEnvironment = env;
    }

    public getEnvironment() {
        return this.currentEnvironment;
    }

    // API URL'lerini al
    public getBaseUrl(): string {
        return this.endpoints[this.currentEnvironment].baseUrl || this.endpoints.local.baseUrl;
    }

    public getEndpoint(path: string): string {
        const baseUrl = this.getBaseUrl();
        return `${baseUrl}${path.startsWith('/') ? path : '/' + path}`;
    }

    // Headers oluştur
    public getHeaders(): Record<string, string> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        // JSONBin için özel headers
        if (this.currentEnvironment === 'jsonbin') {
            headers['X-Master-Key'] = this.endpoints.jsonbin.apiKey;
            headers['X-Bin-Id'] = this.endpoints.jsonbin.binId;
        }

        return headers;
    }

    // Konfigürasyon güncelleme
    public updateConfig(env: string, config: any) {
        if (this.endpoints[env as keyof typeof this.endpoints]) {
            Object.assign(this.endpoints[env as keyof typeof this.endpoints], config);
        }
    }
}

// HTTP Client with retry and error handling
export class HttpClient {
    private static instance: HttpClient;
    private apiConfig: ApiConfig;

    private constructor() {
        this.apiConfig = ApiConfig.getInstance();
    }

    public static getInstance(): HttpClient {
        if (!HttpClient.instance) {
            HttpClient.instance = new HttpClient();
        }
        return HttpClient.instance;
    }

    // GET request with error handling
    public async get<T>(path: string, options?: RequestInit): Promise<T> {
        const url = this.apiConfig.getEndpoint(path);
        const headers = {...this.apiConfig.getHeaders(), ...options?.headers};

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers,
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API GET Error (${url}):`, error);
            throw error;
        }
    }

    // POST request with error handling
    public async post<T>(path: string, data?: any, options?: RequestInit): Promise<T> {
        const url = this.apiConfig.getEndpoint(path);
        const headers = {...this.apiConfig.getHeaders(), ...options?.headers};

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API POST Error (${url}):`, error);
            throw error;
        }
    }

    // PUT request
    public async put<T>(path: string, data?: any, options?: RequestInit): Promise<T> {
        const url = this.apiConfig.getEndpoint(path);
        const headers = {...this.apiConfig.getHeaders(), ...options?.headers};

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers,
                body: JSON.stringify(data),
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API PUT Error (${url}):`, error);
            throw error;
        }
    }

    // DELETE request
    public async delete<T>(path: string, options?: RequestInit): Promise<T> {
        const url = this.apiConfig.getEndpoint(path);
        const headers = {...this.apiConfig.getHeaders(), ...options?.headers};

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers,
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API DELETE Error (${url}):`, error);
            throw error;
        }
    }
}

