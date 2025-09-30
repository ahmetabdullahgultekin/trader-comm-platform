/**
 * Reklam Konfigürasyonu
 *
 * KULLANIM:
 * 1. Google AdSense hesabınızdan Publisher ID alın
 * 2. Her reklam birimi için Ad Slot ID oluşturun
 * 3. Bu dosyadaki ID'leri güncelleyin
 */

export const ADS_CONFIG = {
    // Google AdSense Publisher ID
    PUBLISHER_ID: 'ca-pub-2016267232144093',

    // Reklam Aktif/Pasif
    ENABLED: true, // false yaparsanız hiç reklam gösterilmez

    // Reklam Birimleri - Her pozisyon için farklı slot ID
    SLOTS: {
        // Ana sayfa reklamları
        HOME_TOP_BANNER: '1234567890',
        HOME_INLINE: '1122334455',
        HOME_SIDEBAR: '0987654321',

        // Ürünler sayfası
        PRODUCTS_TOP: '2233445566',
        PRODUCTS_SIDEBAR: '6655443322',
        PRODUCTS_INLINE: '7788990011',

        // Blog sayfası
        BLOG_TOP: '3344556677',
        BLOG_INLINE: '8899001122',
        BLOG_SIDEBAR: '9900112233',

        // Genel
        FOOTER_BANNER: '5544332211'
    },

    // Reklam Formatları
    FORMATS: {
        HORIZONTAL: 'horizontal',
        VERTICAL: 'vertical',
        RECTANGLE: 'rectangle',
        RESPONSIVE: 'auto'
    },

    // Minimum ekran genişliği (mobile'da bazı reklamları gizlemek için)
    MIN_WIDTH: {
        SIDEBAR: 768, // tablet ve üstü
        TOP_BANNER: 0  // her zaman göster
    }
};

// Test modu için mock reklam gösterimi
export const TEST_MODE = process.env.NODE_ENV === 'development';

// Reklam pozisyonları ve özellikleri
export const AD_POSITIONS = {
    TOP_BANNER: {
        height: 90,
        minWidth: 728,
        className: 'ad-top-banner',
        label: 'Üst Banner'
    },
    SIDEBAR: {
        width: 300,
        minHeight: 250,
        className: 'ad-sidebar',
        label: 'Yan Panel',
        sticky: true
    },
    INLINE: {
        className: 'ad-inline',
        label: 'İçerik Arası',
        responsive: true
    },
    FOOTER: {
        height: 90,
        minWidth: 728,
        className: 'ad-footer',
        label: 'Alt Banner'
    }
};