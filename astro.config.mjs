// @ts-check
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';
import rehypeKatex from 'rehype-katex';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  base: '/',
  markdown: {
    remarkPlugins: [remarkMath, [remarkToc, { heading: 'Contents'}]],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true
    }
  },
  site: 'https://antimatter543.github.io/',
  integrations: [sitemap()]
});
