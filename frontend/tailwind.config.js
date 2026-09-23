/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // scoped via a `.dark` ancestor class (used only inside the admin console)
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // 3-color brand theme: blue (action), charcoal (text), off-white (surface)
                primary: "#2563EB", // Blue - primary actions/links
                brand: "#1F2937", // Charcoal - headings/body text
                accent: "#2563EB", // Blue - same as primary, single accent color
                success: "#059669", // Emerald - semantic status only, not part of brand palette
                "bg-main": "#F9FAFB", // Off-white - page background
            },
            boxShadow: {
                premium: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
                'scroll': 'scroll 30s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%': { transform: 'translateY(-10px) rotate(1deg)' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.05)' },
                },
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            }
        },
    },
    plugins: [],
}
