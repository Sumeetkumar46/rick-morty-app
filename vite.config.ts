// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import ghPages from 'vite-plugin-gh-pages';

// export default defineConfig({
//   base: '/rick-morty-app/', // ✅ this should match your repo name
//   plugins: [react(), ghPages()],
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/rick-morty-app/', // ✅ use your repo name
  plugins: [react()],
});

