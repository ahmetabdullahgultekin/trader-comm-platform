import React, {useEffect} from 'react';

interface GoogleAdSenseProps {
    adSlot: string;
    adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
    adStyle?: React.CSSProperties;
    className?: string;
    fullWidthResponsive?: boolean;
}

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

/**
 * Google AdSense Component
 *
 * Kullanım:
 * 1. Google AdSense hesabı oluşturun: https://www.google.com/adsense
 * 2. Site URL'inizi ekleyin ve onay bekleyin
 * 3. Reklam birimi oluşturun ve slot ID'sini alın
 * 4. Bu component'i istediğiniz yere ekleyin
 *
 * @example
 * <GoogleAdSense
 *   adSlot="1234567890"
 *   adFormat="auto"
 *   fullWidthResponsive={true}
 * />
 */
const GoogleAdSense: React.FC<GoogleAdSenseProps> = ({
                                                         adSlot,
                                                         adFormat = 'auto',
                                                         adStyle = {display: 'block'},
                                                         className = '',
                                                         fullWidthResponsive = true
                                                     }) => {
    useEffect(() => {
        try {
            // AdSense script'i yükle
            if (!window.adsbygoogle) {
                window.adsbygoogle = [];
            }

            // Reklamı push et
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.error('AdSense error:', error);
        }
    }, []);

    return (
        <div className={`adsense-container ${className}`}>
            <ins
                className="adsbygoogle"
                style={adStyle}
                data-ad-client="ca-pub-2016267232144093"
                data-ad-slot={adSlot}
                data-ad-format={adFormat}
                data-full-width-responsive={fullWidthResponsive.toString()}
            />
        </div>
    );
};

export default GoogleAdSense;