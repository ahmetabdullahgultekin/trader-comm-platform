import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

// Google Analytics 4 Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual ID

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        dataLayer?: any[];
    }
}

export const initGA = () => {
    // Load GA script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
        window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: window.location.pathname,
    });
};

export const logPageView = (url: string) => {
    if (window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
            page_path: url,
        });
    }
};

export const logEvent = (action: string, category: string, label?: string, value?: number) => {
    if (window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

const GoogleAnalytics: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        initGA();
    }, []);

    useEffect(() => {
        logPageView(location.pathname + location.search);
    }, [location]);

    return null;
};

export default GoogleAnalytics;