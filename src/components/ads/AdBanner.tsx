import React from 'react';
import GoogleAdSense from './GoogleAdSense';

interface AdBannerProps {
    position: 'top' | 'sidebar' | 'inline' | 'bottom';
    className?: string;
}

/**
 * Ad Banner Component - Farklı pozisyonlar için önceden yapılandırılmış reklam banner'ları
 */
const AdBanner: React.FC<AdBannerProps> = ({position, className = ''}) => {
    const adConfigs = {
        top: {
            adSlot: '1234567890', // Top banner slot
            adFormat: 'horizontal' as const,
            style: {display: 'block', minHeight: '90px'},
            className: 'mb-6'
        },
        sidebar: {
            adSlot: '0987654321', // Sidebar slot
            adFormat: 'vertical' as const,
            style: {display: 'block', minHeight: '250px'},
            className: 'sticky top-24'
        },
        inline: {
            adSlot: '1122334455', // Inline slot
            adFormat: 'fluid' as const,
            style: {display: 'block', minHeight: '150px'},
            className: 'my-8'
        },
        bottom: {
            adSlot: '5544332211', // Bottom slot
            adFormat: 'horizontal' as const,
            style: {display: 'block', minHeight: '90px'},
            className: 'mt-6'
        }
    };

    const config = adConfigs[position];

    return (
        <div className={`ad-banner ad-banner-${position} ${className}`}>
            {/* Reklam etiketi */}
            <div className="text-xs text-gray-400 text-center mb-1">
                Reklam
            </div>

            <GoogleAdSense
                adSlot={config.adSlot}
                adFormat={config.adFormat}
                adStyle={config.style}
                className={config.className}
            />
        </div>
    );
};

export default AdBanner;