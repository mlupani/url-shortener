import { defineMiddleware } from 'astro:middleware';
import { getSession } from 'auth-astro/server';

export const onRequest = defineMiddleware(
  async ({ url, locals, redirect, request }, next) => {
    const user = await getSession(request);
    const isLoggedIn = !!user;

    if (!isLoggedIn && url.pathname.startsWith('/profile')) {
      return redirect('/');
    }

    return next();
  }
);