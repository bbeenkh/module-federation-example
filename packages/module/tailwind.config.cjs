/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');
// FIXME: ods preset import 이슈로 임시 파일 생성, 해결되면 제거
const {
  scopedPreflightStyles,
  isolateInsideOfContainer,
} = require('tailwindcss-scoped-preflight');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // 스크롤바 제거 플러그인
  // https://www.npmjs.com/package/tailwind-scrollbar-hide
  plugins: [
    // ...
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer('.tw-style-root'),
    }),
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
