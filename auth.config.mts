import Google from '@auth/core/providers/google';
import { defineConfig } from 'auth-astro';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = import.meta.env;

export default defineConfig({
  providers: [Google({
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
  })],
  callbacks: {
    signIn: async ({profile}) => {
      if(!profile?.email_verified) return false;
      return true;
    }
  },
});