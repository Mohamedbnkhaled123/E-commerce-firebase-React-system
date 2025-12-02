/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                velora: {
                    DEFAULT: '#A67C52', // Primary (gold/brand)
                    dark: '#6B4E2A',    // Primary Dark (hover/active)
                    light: '#DCC5A1',   // Accent / Light gold
                    bg: '#F6EFEA',      // Background (soft beige)
                    text: '#2C2B2A',    // Text (dark)
                    muted: '#E7E1DD',   // Muted border / divider
                },
                // Keeping original colors for backward compatibility if needed, or we can remove them if we are sure.
                // For a full rebrand, it's safer to keep them for a moment or map them.
                // But the prompt implies a full rebrand. I will keep them but prioritize velora.
                primary: {
                    DEFAULT: '#A67C52', // Mapped to Velora Primary
                    50: '#F6EFEA',
                    100: '#F6EFEA',
                    200: '#DCC5A1',
                    300: '#DCC5A1',
                    400: '#A67C52',
                    500: '#A67C52',
                    600: '#6B4E2A',
                    700: '#6B4E2A',
                    800: '#2C2B2A',
                    900: '#2C2B2A',
                    950: '#2C2B2A',
                },
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'Georgia', 'serif'],
                sans: ['Inter', 'Montserrat', 'sans-serif'],
            },
            backgroundImage: {
                'velora-gradient': 'linear-gradient(to right, #B79563, #A67C52, #8C6239)',
            },
            animation: {
                'slide-in-right': 'slideInRight 0.3s ease-out',
                'slide-out-right': 'slideOutRight 0.3s ease-in',
                'fade-in': 'fadeIn 0.2s ease-out',
                'bounce-in': 'bounceIn 0.5s ease-out',
            },
            keyframes: {
                slideInRight: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                slideOutRight: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                bounceIn: {
                    '0%': { transform: 'scale(0.8)', opacity: '0' },
                    '50%': { transform: 'scale(1.05)' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
