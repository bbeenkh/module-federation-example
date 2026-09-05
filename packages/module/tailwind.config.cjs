/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // 스크롤바 제거 플러그인
  // https://www.npmjs.com/package/tailwind-scrollbar-hide
  plugins: [
  ],
  darkMode: false,
  // 클릭효과 활성화
  // https://v2.tailwindcss.com/docs/hover-focus-and-other-states
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
};
