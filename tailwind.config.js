/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  // ✅ ใช้แบบใหม่ที่ถูกต้อง
  theme: {
    extend: {},
  },

  // ✅ เปิด dark mode แบบ opt-in
  // และให้ใช้ class="dark" ได้ตามปกติ
  darkMode: ["class"],

  plugins: [],
};