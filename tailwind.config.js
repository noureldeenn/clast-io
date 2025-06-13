// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',     // App Router (TypeScript)
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',   // Only if you use pages directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
