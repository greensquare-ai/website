import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://greensquare-brand-guideline.vercel.app',
  integrations: [react()],
  vite: {
    esbuild: {
      // Shared v3 components live above this app's Vercel root. Keep their
      // transform independent from the public site's root tsconfig.
      tsconfigRaw: {
        compilerOptions: {
          jsx: 'react-jsx',
          jsxImportSource: 'react',
        },
      },
    },
  },
});
