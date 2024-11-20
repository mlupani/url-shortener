// @ts-check
import { defineConfig } from 'astro/config';

import db from '@astrojs/db';

import auth from 'auth-astro';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [db(), auth()],
  output: 'server',
  adapter: netlify(),
});