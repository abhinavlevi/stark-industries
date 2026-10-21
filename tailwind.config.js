/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stark: {
          bg: '#090E18',
          bgSecondary: '#0E1522',
          panel: '#121C2B',
          card: '#101925',
          cyan: '#00D9FF',
          arc: '#53B8FF',
          red: '#F04452',
          text: '#F3F7FC',
          muted: '#8E9BAF',
          success: '#42D392',
          border: 'rgba(148, 163, 184, 0.16)',
          borderGlow: 'rgba(0, 217, 255, 0.4)',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 15px rgba(0, 217, 255, 0.25)',
        'cyan-glow-lg': '0 0 25px rgba(0, 217, 255, 0.4)',
        'red-glow': '0 0 15px rgba(240, 68, 82, 0.35)',
        'card-depth': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(148, 163, 184, 0.12)',
      }
    },
  },
  plugins: [],
}
