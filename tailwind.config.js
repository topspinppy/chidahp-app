/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  // ✅ ใช้แบบใหม่ที่ถูกต้อง
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out both',
        'pulse-slow': 'pulse 3s infinite'
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      }
    }
  },

  // ✅ เปิด dark mode แบบ opt-in
  // และให้ใช้ class="dark" ได้ตามปกติ
  darkMode: ["class"],

  plugins: [],
};