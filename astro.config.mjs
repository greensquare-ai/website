import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.greensquare.ai',
  integrations: [react(), mdx(), sitemap()],
  redirects: {
    '/evidence': '/benchmark',
    // /product is folded into the flagship /benchmark page. Page parked at src/pages/_product.astro.
    '/product': '/benchmark',
    // Pricing hidden for launch (email-capture focus). The parked page was removed
    // when the repository was reduced; the redirect stays because the URL is published.
    '/pricing': '/',
  },
});
