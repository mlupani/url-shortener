
import { defineAction } from "astro:actions";
import { db, eq, Url } from "astro:db";
import { getSession } from "auth-astro/server";
import { z } from 'zod'

export const crearShortenerURL = defineAction({
    accept: 'json',
    input: z.object({
        url: z.string(),
        slug: z.string()
    }),
    handler: async ({url, slug}, context) => {
            if(!url){
                throw new Error('URL is required');
            }

            const session = await getSession(context.request);
            const email = session?.user?.email ?? null;

            // Check if url already exists
            const [urlExists] = await db.select().from(Url).where(eq(Url.url, url)).limit(1);

            if(urlExists && !session){
                return urlExists;
            }

            if(urlExists && session && urlExists.userId === email){
                return urlExists;
            }

            let short_url = '';

            if(urlExists && session && urlExists.userId !== email){
                short_url = urlExists.short_url;
            }
            else {
                short_url = import.meta.env.SITE_URL + slug +"/"+Math.random().toString(36).substr(2, 5);
            }

            const [data] = await db.insert(Url).values({
                url: url,
                short_url,
                userId: email
            }).returning();
            return data;
    },
});