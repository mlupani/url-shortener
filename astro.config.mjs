// @ts-check
import { defineConfig } from 'astro/config';

import db from '@astrojs/db';

import auth from 'auth-astro';

import netlify from '@astrojs/netlify';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [db(), auth(), icon()],
  output: 'server',
  adapter: netlify(),
});