import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.greensquare.ai',
  integrations: [react(), mdx(), sitemap()],
  redirects: {
    '/evidence': '/benchmark',
    // Pricing hidden for launch (email-capture focus). Page parked at src/pages/_pricing.astro.
    '/pricing': '/',
  },
});
