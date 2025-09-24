/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
            },
            colors: {
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'slide-in': 'slideIn 0.6s ease-out',
                'bounce-slow': 'bounce 2s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': {opacity: '0', transform: 'translateY(20px)'},
                    '100%': {opacity: '1', transform: 'translateY(0)'},
                },
                slideIn: {
                    '0%': {opacity: '0', transform: 'translateX(-20px)'},
                    '100%': {opacity: '1', transform: 'translateX(0)'},
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            backdropBlur: {
                xs: '2px',
            },
            transitionTimingFunction: {
                'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
    ],
    safelist: [
        // Color variants for dynamic classes
        'bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-orange-100', 'bg-yellow-100',
        'text-blue-600', 'text-green-600', 'text-purple-600', 'text-orange-600', 'text-yellow-600',
        'bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-orange-600', 'bg-yellow-600',
        'hover:bg-blue-700', 'hover:bg-green-700', 'hover:bg-purple-700', 'hover:bg-orange-700',
        'from-blue-600', 'from-green-600', 'from-purple-600', 'from-orange-600',
        'to-blue-700', 'to-green-700', 'to-purple-700', 'to-orange-700',
        'bg-blue-50', 'bg-green-50', 'bg-purple-50', 'bg-orange-50', 'bg-pink-50',
        'hover:bg-blue-100', 'hover:bg-green-100', 'hover:bg-purple-100', 'hover:bg-orange-100',
    ]
}

