import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import AppRouter from './router/AppRouter.tsx'
import {LanguageProvider} from './contexts/LanguageContext'
import {HelmetProvider} from 'react-helmet-async'

// Import utilities for development
if (import.meta.env.DEV) {
    import('./utils/createAdminUser');
    import('./utils/fixProductViews');
    import('./utils/fixFavorites');
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HelmetProvider>
            <LanguageProvider>
                <AppRouter/>
            </LanguageProvider>
        </HelmetProvider>
    </StrictMode>,
)

// Register service worker for PWA (only in production)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    });
}
