import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import AppRouter from './router/AppRouter.tsx'
import {LanguageProvider} from './contexts/LanguageContext'
import {HelmetProvider} from 'react-helmet-async'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HelmetProvider>
            <LanguageProvider>
                <AppRouter/>
            </LanguageProvider>
        </HelmetProvider>
    </StrictMode>,
)
