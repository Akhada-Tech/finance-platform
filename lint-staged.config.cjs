module.exports = {
  'apps/mobile/{App.tsx,index.js,src/**/*.{js,jsx,ts,tsx}}': [
    'eslint --fix --max-warnings=0',
    'prettier --write',
  ],
  '*.{json,md,yml,yaml}': ['prettier --write'],
};
